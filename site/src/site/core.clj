(ns site.core
  (:require [solrclient.core :as solr])
  (:use [compojure.core]
        [ring.adapter.jetty]
        [hiccup.core]
        [hiccup.def :only (defhtml)]
        [hiccup.util :only (escape-html)]
        [hiccup.page :only (include-css include-js)]
        [hiccup.element :only (javascript-tag)]
        [clojure.data.json :only (json-str pprint-json)])
  (:require [compojure.route :as route]
            [compojure.handler :as handler]
            ))

(defn sanitize [s]
  (when s
    (.replaceAll s "[!@#$%\\^&\\*()_\\+={}\\|\\\\\\[\\]:;\\\"\"\\'\\<\\>\\.\\,\\?\\/\\`\\~]" " "))) 

(defn search [language text]
  (when-not (empty? (.trim (str text)))
    (when-let [sanitized-text (.trim (sanitize text))]
      (solr/query
        {:q sanitized-text
         :rows 30
         :fl "score,name,doc,arglists,ns,source,var-type,artifact,language"
         :group true
         :group.field "doc"
         :defType "dismax"
         :qf "name^5.0 doc^1.0 ns^3.0"
         :fq (str "language:" language)
         }))))
  
(defn var-data [search-result]
  (->> search-result :grouped :doc :groups
       (map #(-> % :doclist :docs first))))

(defn sanitize-map [m]
  (into {}
        (for [[k v] m]
          [k (escape-html v)])))

(defn display-data [data]
  (when data
    (list
      [:h5 "Matches: "  (count data)]
      [:p
      (for [datum data]
        (let [{:keys [name arglists ns doc var-type source artifact]}
              datum]
          (list
            [:hr]
            [:h5
            [:strong name]
            "         ("
            ns
            ") -- "
            artifact]
            [:pre.vartype var-type]
            ;[:br]
            [:pre.arglists arglists]
            [:br]
            [:pre.doc doc]
            [:pre {:class (str "brush: clojure; gutter: false; toolbar: false")}
             (if doc (.replace source doc "...") source)]
            )))])))

(defn menu-item [item-val selected-val]
  (merge {:value item-val}
         (when (= item-val selected-val)
           {:selected "selected"})))     

(defhtml search-page [last-query language data]
  [:html
   [:header
    [:title "collaj.net: clojure code search"]
    (include-css
      "skeleton/layout.css"
      "skeleton/base.css"
      "skeleton/skeleton.css"
      "shCore.css"
      "shThemeDefault.css"
      "shClojureExtra.css"
      "collaj.css")
    (include-js
      "shCore.js" "shBrushClojure.js")
    (javascript-tag "SyntaxHighlighter.all();")]
   [:body
    [:div.container
     [:div
      [:h2 "collaj: code search for clojure"]
       [:form {:action "/"}
       [:input {:type "text" :autofocus "autofocus"
                :name "q" :value last-query}]
              [:select {:name "language"}
        [:option (menu-item "clj" language) "Clojure"]
        [:option (menu-item "cljs" language) "ClojureScript"]]]
       " "
              ;[:input {:type "submit" :value "Search"}]
       " "
      (when-not (empty? last-query)
        (display-data data))]]]])
 
(defroutes main-routes
           (route/resources "/")
           (GET "/" [q format language]
                (let [data (var-data (search (or language "clj") q))]
                  (condp = format
                    "raw" (pr-str data)
                    "clj" (pr-str data)
                    "json" (json-str data :escape-unicode false)
                    (search-page q language data))))
           (GET "/varcount" [] (str (solr/count-docs {:q "*:*"})))
           (route/not-found "<h1>Page not found!</h1>"))

(handler/api routes)

(def app (handler/site main-routes))

;; tests

(defn test-sanitize []
  (sanitize "as\\df%$#:;..~?/<>'@[]\"!^&(*+{}|g"))
