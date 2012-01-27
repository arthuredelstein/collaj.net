(ns co.solr
  (:require [clj-http.client :as client])
  (:use [clojure.data.json :only (json-str read-json)]))

(def solr-address "http://localhost:8983/solr/")

(def solr-json-update-address (str solr-address "update/json"))

(def solr-query-address (str solr-address "select/"))

(defn solr-update
  "Post data to the local solr server."
  [data]
  (client/post solr-json-update-address {:body (json-str data)}))

(defn solr-add-doc [doc-data]
  "Add a single document to a solr database."
  (solr-update {:add {:doc doc-data}}))

(defn solr-add-docs [docs]
  (doall (map solr-add-doc docs)))

(defn solr-delete-all []
  "Remove all documents from solr database."
  (solr-update {:delete {:query "*:*"}}))

(defn solr-commit []
  "Commit changes to solr database."
  (solr-update {:commit {}}))

(defn solr-query [params]
  (let [full-params (merge {:wt "json"} params)]
    (-> (client/get solr-query-address
                {:query-params full-params})
        :body
        read-json)))

(defn solr-get-docs [params]
  (-> params solr-query :response :docs))
              
;; tests

(def test-data {:id "id2" :name "testname" :doc "test doc"})
