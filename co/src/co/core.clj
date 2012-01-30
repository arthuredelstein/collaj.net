(ns co.core
  (:use [co.extract :only (jar-files clj-sources-from-jars)]
        [local-file :only (file*)]
        [co.parse :only (process-text)])
  (:require [co (solr :as solr)])
  (:import [java.util UUID])
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


(defn process []
  (let [jars (jar-files root)]
    (filter :name
            (apply concat
                   (for [source (clj-sources-from-jars jars)]
                     (let [path (:path source)]
                       (when (not (.endsWith path "project.clj"))
                         (try
                           ;(println path)
                           (->> (process-text (:text source))
                                (map #(assoc % :path path
                                             :id (str (UUID/randomUUID)))))
                           (catch Exception e (do (prn e source) (throw e)))))))))))

(defn submit [data]
  (solr/add-docs data)
  (solr/commit))
  
(defn submit-all []
  (doall (map #(time (submit %)) (partition-all 1000 (process)))))

(defn wipe []
  (solr/delete-all)
  (solr/commit))