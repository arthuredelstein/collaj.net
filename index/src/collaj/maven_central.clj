(ns collaj.maven-central
  (:import (java.io File)
           (java.net URL))
  (:use [clojure.data.json :only [read-json]]))

(def maven-central-search "http://search.maven.org/solrsearch/select?")

(def maven-file-path "http://search.maven.org/remotecontent?filepath=")

(def maven-copy "../maven-sync/")

(defn get-clojure-artifacts
  []
  (->> (slurp (str maven-central-search
                   "wt=json&q=clojure&rows=9999"))
       read-json
       :response
       :docs
       (map #(select-keys % [:g :a]))))

(defn jar-path [{:keys [g a v]}]
  (str (.replace g "." "/") "/"
       a "/"
       v "/"
       a "-" v ".jar"))
       
(defn maven-artifact-data
  [{:keys [g a]}]
  (->> (slurp (str maven-central-search
                   "q=g:%22" g "%22+AND+"
                   "a:%22" a "%22"
                   "&core=gav&wt=json&rows=9999&fl=\"filepath\""))
       read-json
       :response
       :docs
       (filter #(= (:p %) "jar"))
       (map #(select-keys % [:g :a :v]))
       ))
 
(defn mirror
  [artifact-data]
  (let [path (jar-path artifact-data)
        src (str maven-file-path path)
        dest (File. maven-copy path)]
    (println "mirroring" src)
    (when-not (.exists dest)
      (.mkdirs (.getParentFile dest)))
    (clojure.java.io/copy
      (.openStream (URL. (str maven-file-path path)))
      (File. maven-copy path))))

(defn mirror-all
  []
  (dorun
    (map mirror (mapcat maven-artifact-data (get-clojure-artifacts)))))
    