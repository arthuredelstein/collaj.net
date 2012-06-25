(ns site.core
  (:require [solrclient.core :as solr])
  (:use [compojure.core]
        [ring.adapter.jetty]
        [hiccup.core]
        [hiccup.def :only (defhtml)]
        [hiccup.util :only (escape-html)]
        [clojure.data.json :only (json-str pprint-json)])
  (:require [compojure.route :as route]
            [compojure.handler :as handler]
            ))

(defn sanitize [s]
  (when s
    (.replaceAll s "[!@#$%\\^&\\*()_\\+={}\\|\\\\\\[\\]:;\\\"\"\\'\\<\\>\\.\\,\\?\\/\\`\\~]" " "))) 

(defn search [language text]
  (when-let [sanitized-text (sanitize text)]
    (solr/query
      {:q sanitized-text
       :rows 30
       :fl "score,name,doc,arglists,ns,source,var-type,artifact,language"
       :group true
       :group.field "doc"
       :defType "dismax"
       :qf "name^5.0 doc^1.0 ns^3.0"
       :fq (str "language:" language)
       })))
  
(defn var-data [search-result]
  (->> search-result :grouped :doc :groups
       (map #(-> % :doclist :docs first))))

(defn sanitize-map [m]
  (into {}
        (for [[k v] m]
          [k (escape-html v)])))

(defn display [data]
  (when data
    (println "Matches:" (count data))
    (doseq [datum data]
      (println "<hr>")
      (let [{:keys [name arglists ns doc var-type source artifact]}
            datum]
        (println (html [:b name] "         (" ns ") -- " artifact))
        (when var-type (println (html [:i var-type])))
        (when arglists (println arglists))
        (when doc (println "\n" doc "\n"))
        (println "\nSource:\n\n" (if doc (.replace source doc "...") source) "\n")))))

(defn menu-item [item-val selected-val]
  (merge {:value item-val}
         (when (= item-val selected-val)
           {:selected "selected"})))

(defhtml search-page [last-query language results]
         [:html
          [:header
           [:title "collaj.net: clojure code search"]]
          [:body
           [:h3 "collaj: search for functions, macros, and vars in clojure and clojurescript"]
           [:form {:action "/"}
            [:input {:type "text" :autofocus "autofocus"
                     :name "q" :value last-query}]
            " "
            [:input {:type "submit" :value "Search"}]
            " "
            [:select {:name "language"}
             [:option (menu-item "clj" language) "Clojure"]
             [:option (menu-item "cljs" language) "ClojureScript"]]]
           [:pre results]]])

(defroutes main-routes
           (route/resources "/")
           (GET "/" [q format language]
                (let [data (var-data (search (or language "clj") q))]
                  (condp = format
                    "raw" (pr-str data)
                    "clj" (pr-str data)
                    "json" (json-str data :escape-unicode false)
                    (search-page q language (with-out-str (display data))))))
           (GET "/varcount" [] (str (solr/count-docs {:q "*:*"})))
           (route/not-found "<h1>Page not found!</h1>"))

(handler/api routes)

(def app (handler/site main-routes))

;; tests

(defn test-sanitize []
  (sanitize "as\\df%$#:;..~?/<>'@[]\"!^&(*+{}|g"))
