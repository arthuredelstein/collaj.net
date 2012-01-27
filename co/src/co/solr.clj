(ns co.solr
  (:require [clj-http.client :as client])
  (:use [clojure.data.json :only (json-str read-json)]))

(def address "http://localhost:8983/solr/")

(def json-update-address (str address "update/json"))

(def query-address (str address "select/"))

;; WRITING

(defn update
  "Post data to the local solr database."
  [data]
  (client/post json-update-address {:body (json-str data)}))

(defn add-doc
  "Add a single document to the solr database."
  [doc-data]
  (try
    (update {:add {:doc doc-data}})
    (catch Exception e
           (println "error adding doc with" doc-data))))

(defn add-docs 
  "Add multiple documents to the solr database."
  [docs]
  (doall (map add-doc docs)))

(defn delete-all
  "Remove all documents from solr database."
  []
  (update {:delete {:query "*:*"}}))

(defn commit
  "Commit changes to solr database."
  []
  (update {:commit {}}))

;; READING

(defn query
  "Read data from solr database."
  [params]
  (let [full-params (merge {:wt "json"} params)]
    (-> (client/get query-address
                {:query-params full-params})
        :body
        read-json)))

(defn get-docs
  "Get document data from solr database."
  [params]
  (-> params query :response :docs))
              
;; tests

(def test-data {:id "id2" :name "testname" :doc "test doc"})
