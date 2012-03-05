(ns co.client
  (:require [co (solr :as solr)])
  (:use compojure.core, ring.adapter.jetty)
  (:require [compojure.route :as route]))

(defn search [text]
  (solr/query
    {:q text
     :rows 10
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
        (when arglists (println arglists))
        (println doc "\n")
        (println (if doc (.replace source doc "...") source) "\n")))))


(defroutes main-routes
  (GET "/data/:term" [term] (pr-str (search term)))
  (GET "/:term" [term] (str "<html><body><pre>"
                            (with-out-str (display (search term)))
                            "</pre></body></html>"))
  (route/not-found "<h1>Page not found</h1>"))

(def jetty-thread (Thread. #(run-jetty main-routes {:port 8080})))

(defn run-server []
  (.start jetty-thread)) 