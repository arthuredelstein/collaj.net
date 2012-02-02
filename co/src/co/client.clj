(ns co.client
  (:require [co (solr :as solr)]))

(defn search [text]
  (solr/query
    {:q text
     :rows 100
     :fl "score,name,doc,arglists,ns,source,var-type"
     :group true
     :group.field "doc"
     :defType "dismax"
     :qf "name^2.0 doc^1.0"
     }))

(defn display [results]
  (let [groups (-> results :grouped :doc :groups)]
    (println "Matches:" (count groups))
    (doseq [group groups]
      (let [{:keys [name arglists ns doc var-type source]} (-> group :doclist :docs first)]
        (println (str name " [" ns "]"))
        (println arglists)
        (println doc "\n")
        (println (if doc (.replace source doc "...") source) "\n")))))