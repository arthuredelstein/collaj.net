(ns co.core
  (:use [co.extract :only (clj-sources-from-jars)]
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
  (filter :name
          (apply concat
                 (for [source (clj-sources-from-jars root)]
                   (try ;(println (:path source))
                     (->> (process-text (:text source))
                          (map #(assoc % :path (:path source)
                                         :id (str (UUID/randomUUID)))))
                     (catch Exception e nil))))))

(defn submit [data]
  (solr/add-docs data)
  (solr/commit))
  
(defn submit-all []
  (doall (map #(time (submit %)) (partition-all 1000 (process)))))