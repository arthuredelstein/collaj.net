(defproject site "0.0.1"
  :description "FIXME: write description"
  :dependencies [[org.clojure/clojure "1.3.0"]
                 [compojure "1.0.1"]
                 [ring "1.0.1"]
                 [solrclient "0.0.2"]]
  :dev-dependencies [[lein-cljsbuild "0.1.2"]
                     [lein-ring "0.5.4"]]
  :ring {:handler site.core/app}
  :cljsbuild
    {:builds
     [{:source-path "src-cljs",
       :compiler
       {:output-to "resources/public/main.js",
        :optimizations :whitespace,
        :pretty-print true}}]})
