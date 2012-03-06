(defproject site "0.0.1"
  :description "FIXME: write description"
  :dependencies [[org.clojure/clojure "1.3.0"]
                 [compojure "1.0.1"]
                 [solrclient "0.0.2"]]
  :dev-dependencies [[lein-cljsbuild "0.0.11"]]
  :cljsbuild {
    ; The path to the top-level ClojureScript source directory:
    :source-path "src-cljs"
    ; The standard ClojureScript compiler options:
    ; (See the ClojureScript compiler documentation for details.)
    :compiler {
      :output-to "site/main.js"  ; default: main.js in current directory
      :optimizations :whitespace
      :pretty-print true}})
