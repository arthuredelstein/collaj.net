(ns site.core
  (:require [solrclient (core :as solr)])
  (:use compojure.core
        ring.adapter.jetty
        hiccup.core)
  (:require [compojure.route :as route]
            [compojure.handler :as handler]
            ))

(defn sanitize [s]
  (when s
    (.replaceAll s "[!@#$%\\^&\\*()_\\+={}\\|\\\\\\[\\]:;\\\"\\'\\<\\>\\.\\,\\?\\/\\`\\~]" " ")))

(defn search [text]
  (when-let [sanitized-text (sanitize text)]
    (solr/query
      {:q sanitized-text
       :rows 20
       :fl "score,name,doc,arglists,ns,source,var-type,artifact"
       :group true
       :group.field "doc"
       :defType "dismax"
       :qf "name^2.0 doc^1.0"
       })))
  
(defn display [results]
  (when results
  (let [groups (-> results :grouped :doc :groups)]
    (println "Matches:" (count groups))
    (doseq [group groups]
      (println "<hr>")
      (let [{:keys [name arglists ns doc var-type source artifact]}
            (-> group :doclist :docs first)]
        (println (html [:b name] " (" ns ") -- " artifact))
        (when arglists (println arglists))
        (println "\n" doc "\n")
        (println "\nSource:\n\n" (if doc (.replace source doc "...") source) "\n"))))))

(defhtml search-page [last-query results]
 [:html
         [:header
          [:title "collaj: clojure function search"]]
         [:body
          [:form {:action "/"}
           [:input {:type "text" :name "q" :value last-query}]
           [:input {:type "submit" :value "Search"}]
         ]
          [:pre results]]])

(defroutes main-routes
  (GET "/" [q] (search-page q (with-out-str (display (search q)))))
  (GET "/data/:term" [term] (pr-str (escape-html (search term))))
  (GET "/:term" [term] (str "<html><body><pre>"
                            (with-out-str (display (search term)))
                            "</pre></body></html>"))
  (route/not-found "<h1>Page not found</h1>"))

(handler/api routes)

(def app (handler/site main-routes))

;; tests

(defn test-sanitize []
  (sanitize "as\\df%$#:;..~?/<>'@[]\"!^&(*+{}|g"))