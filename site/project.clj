(defproject site "0.0.1"
  :description "FIXME: write description"
  :dependencies [[org.clojure/clojure "1.4.0"]
                 [compojure "1.1.0"]
                 [solrclient "0.0.2"]
                 [hiccup "1.0.0"]
                 ;[moumar/domina "1.0.0-beta5"]
                 [org.clojure/clojurescript "0.0-1236"]]
  :dev-dependencies [[lein-cljsbuild "0.2.1"]
                     [lein-ring "0.7.1"]
                     [lein-git-deps "0.0.1-SNAPSHOT"]]
  :git-dependencies [["https://github.com/arthuredelstein/domina.git"]]
  :extra-classpath-dirs [".lein-git-deps/domina/src/"]
  :ring {:handler site.core/app}
  :cljsbuild
    {:builds
     [{:source-path "src-cljs",
       :compiler
       {:output-to "resources/public/main.js",
        :optimizations :simple,
        :pretty-print true}}]})
