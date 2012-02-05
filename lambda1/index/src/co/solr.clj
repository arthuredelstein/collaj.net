(ns co.solr
  (:require [clj-http.client :as client])
  (:use [clojure.data.json :only (json-str read-json)]))

(def address "http://localhost:8983/solr/")

(def json-update-address (str address "update/json"))

(def query-address (str address "select/"))

(def failed-adds (atom []))

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
           (swap! failed-adds conj [doc-data e]))))

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

(defn count-docs
  "Get number of documents matching a query"
  [params]
  (-> params (assoc :rows 0) query :response :numFound))

(defn get-docs
  "Get document data from solr database."
  [params]
  (-> params query :response :docs))
        
;; MORE

(defn re-index
  "Re-index the solr database"
  []
  (let [step 1000]
    (doseq [i (range 0 (count-docs {:q "*:*"}) step)]
      (println i)
      (add-docs (get-docs {:q "*:*" :start i :rows step}))
      (commit))))
      
;; tests

(def test-data {:id "id2" :name "testname" :doc "test doc"})
