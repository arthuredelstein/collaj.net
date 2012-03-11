(ns collaj.index
  (:use [clj-inspector.vars :only (analyze-clojure-source)]
        [clj-inspector.jars :only (clj-sources-from-jar jar-files)])
  (:require [solrclient (core :as solr)])
  (:import [java.io File]
           [java.util UUID])
  (:gen-class))

(def root (.getAbsolutePath (File. "../clojars-sync")))

(defn normal-releases-only [jar-files]
  (->> jar-files
       (filter #(re-find #"\A\d+\.\d+\.\d+\z" (.. % getParentFile getName)))))

(defn release-version-comparable [jar-file]
  (let [version-str (.. jar-file getParentFile getName)]
    (vec (map #(Long/parseLong %) (.split version-str "\\.")))))
  
(defn take-latest-release [jar-files]
  (->> jar-files
       normal-releases-only
       sort
       (partition-by #(.. % getParentFile getParentFile))
       (map #(sort-by release-version-comparable %))
       (map last)))

(defn file-to-artifact [f]
  "Convert a clojars path to an artifact specifier."
  (let [/ (str File/separator)
        pieces
        (-> f (.split (str "clojars-sync" /)) second
            (.split ".jar!") first
            (.split /) butlast)
        group (apply str (interpose "." (drop-last 2 pieces)))
        name (-> pieces butlast last)
        version (last pieces)
        group-name (if (= group name) group (str group "/" name))]
      (str "[" group-name " \"" version "\"]")))


(defn process-jar [jar]
  ;(println jar)
  (apply concat
         (for [source (clj-sources-from-jar jar)]
           (when source
             (when-let [path (first source)]
               (when-not (.endsWith path "project.clj")
                 (try
                   ;(println path)
                   (let [processed (analyze-clojure-source (second source))]
                     ;(println processed)
                     (map #(assoc %
                                  :path path
                                  :id (str "[" path " " (% :ns) "/" (% :name) "]")
                                  :artifact (file-to-artifact path))
                          processed))
                   (catch Exception e
                          #_(do (prn e source) (throw e))))))))))

(defn process []
  (let [jars (jar-files root)]
    (filter :name (mapcat process-jar jars))))

(defn submit [data]
  ;(println (first data))
  (solr/add-docs data)
  (solr/commit))
  
(defn submit-all []
  (dorun (map #(time (submit %)) (partition-all 1000 (process)))))

(defn wipe []
  (solr/delete-all)
  (solr/commit))

(defn -main [& args]
  (submit-all))
