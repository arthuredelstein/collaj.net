(defproject site "0.0.1"
  :description "FIXME: write description"
  :dependencies [[org.clojure/clojure "1.4.0"]
                 [compojure "1.1.3"]
                 [solrclient "0.0.2"]
                 [hiccup "1.0.0"]
                 ;[fetch "0.1.0-alpha2"]
                 ;[crate "0.2.0-alpha4"]
                 ;[moumar/domina "1.0.0-beta5"]
                 ;[org.clojure/clojurescript "0.0-1443"] ;1236, 1424, 1443
                 ]
            :dev-dependencies    
                     [[lein-git-deps "0.0.1-SNAPSHOT"]]
  :plugins [[lein-cljsbuild "0.2.7"]
            [lein-ring "0.7.5"]]
  :git-dependencies [["https://github.com/arthuredelstein/domina.git"]
                     ["https://github.com/arthuredelstein/crate.git"]
                     ]
  :extra-classpath-dirs [".lein-git-deps/domina/src/"
                         ".lein-git-deps/crate/src/"]
  :hooks [leiningen.cljsbuild]
  :ring {:handler site.core/app}
  :cljsbuild
    {:builds
     [{:source-path "src-cljs",
       :compiler
       {:output-to "resources/public/main.js",
        :optimizations :whitespace,
        :pretty-print true}}]})
