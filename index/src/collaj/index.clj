(ns collaj.index
  (:use [clj-inspector.vars :only (analyze-clojure-source)]
        [clj-inspector.jars :only (clj-sources-from-jar
                                   suffix
                                   jar-files
                                   jar-pom-info)])
  (:require [solrclient (core :as solr)])
  (:import [java.io File]
           [java.util UUID])
  (:gen-class))

(def clojars-root (.getAbsolutePath (File. "../clojars-sync")))
(def maven-root (.getAbsolutePath (File. "../maven-sync")))


(defn normal-releases-only [jar-files]
  (->> jar-files
       (filter #(re-find #"\A\d+\.\d+\.\d+\z" (.. % getParentFile getName)))))

(defn release-version-comparable [jar-file]
  (let [version-str (.. jar-file getParentFile getName)]
    (vec (map #(Long/parseLong %) (.split version-str "\\.")))))
  
(defn take-latest-releases [jar-files]
  (->> jar-files
       normal-releases-only
       sort
       (partition-by #(.. % getParentFile getParentFile))
       (map #(sort-by release-version-comparable %))
       (map last)))

(defn file-to-artifact [root jar]
  "Convert a clojars path to an artifact specifier."
  (let [root-name (.getName (File. root))
        / (str File/separator)
        pieces
        (-> jar (.split (str root-name /)) second
            (.split ".jar!") first
            (.split /) butlast)
        group (apply str (interpose "." (drop-last 2 pieces)))
        name (-> pieces butlast last)
        version (last pieces)
        group-name (if (= group name) group (str group "/" name))]
      (str "[" group-name " \"" version "\"]")))
  
  
(defn process-jar [jar]
  (println jar)
  (apply concat
         (for [source (clj-sources-from-jar jar)]
           (when source
             (when-let [path (first source)]
               (println path)
               (when-not (.endsWith path "project.clj")
                 (try
                   (->> source
                        second
                        (analyze-clojure-source (suffix path))
                        (map
                          #(assoc %
                                  :path path)))
                   (catch Exception e
                          #(do (prn e source) (throw e))))))))))

(defn process [root]
  (apply concat
         (for [jar (take-latest-releases (jar-files root))]
           (when-let [artifact (file-to-artifact root (.getAbsolutePath jar))]
             (filter :name (map #(assoc % :artifact artifact
                                          :id (str "[" artifact " " (% :ns) "/" (% :name) "]"))
                                (process-jar jar)))))))

(defn submit [data]
  '(println (first data))
  (solr/add-docs data)
  (solr/commit))
  
(defn submit-all [root]
  (let [var-data (partition-all 10 (process root))]
    (println "Sending vars to solr...")
    (dorun (map #(time (submit %)) var-data))))

(defn wipe []
  (println "Wiping solr database")
  (solr/delete-all)
  (solr/commit))

(defn -main [& args]
  (when (= "wipe" (first args))
    (wipe))
  (submit-all maven-root)
  (submit-all clojars-root)
  )
