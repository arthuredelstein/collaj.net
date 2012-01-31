(ns co.core
  (:use [co.extract :only (jar-files clj-sources-from-jar)]
        [local-file :only (file*)]
        [co.parse :only (process-text)])
  (:require [co (solr :as solr)])
  (:import [java.io File]
           [java.util UUID])
  ;(:gen-class)
  )

(def root (.getAbsolutePath (file* "../clojars-sync")))


;(defn file-to-artifact [f]
;  "Convert a clojars path to an artifact specifier."
;  (let [pieces
;        (-> f (.split (str "clojars-clj" File/separator)) second
;            (.split ".jar!") first
;            (.split (str File/separator)) butlast
;            )]
;    [(apply str (interpose "." (butlast (butlast pieces))))
;     (last (butlast pieces))
;     (last pieces)]))


(defn process-jar [jar]
  ;(println jar)
  (apply concat
         (for [source (clj-sources-from-jar jar)]
           (when source
             (let [path (:path source)]
               (when-not (.endsWith path "project.clj")
                 (try
                   ;(println path)
                   (let [processed (process-text (:text source))]
                     ;(println processed)
                     (map #(assoc % :path path
                                  :id (str (UUID/randomUUID))) processed))
                   (catch Exception e (do (prn e source) (throw e))))))))))

(defn process []
  (let [jars (jar-files root)]
    (filter :name (mapcat process-jar jars))))

(defn submit [data]
  ;(println data)
  (solr/add-docs data)
  (solr/commit))
  
(defn submit-all []
  (dorun (map #(time (submit %)) (partition-all 1000 (process)))))

(defn wipe []
  (solr/delete-all)
  (solr/commit))