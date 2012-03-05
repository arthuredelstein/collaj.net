(ns foo
  (:require [clojure.browser.repl :as repl]))

(repl/connect "http://localhost:9000/repl")

(comment
  
(require '[cljs.repl :as repl])
(require '[cljs.repl.browser :as browser])  ;; require the browser implementation of IJavaScriptEnv
(def env (browser/repl-env)) ;; create a new environment
(repl/repl env) ;; start the REPL

  )

(comment
  
  (require '[cljs.repl :as repl])
(require '[cljs.repl.rhino :as rhino]) ;; require the rhino implementation of IJavaScriptEnv
(def env (rhino/repl-env)) ;; create a new environment
(repl/repl env) ;; start the REPL
  
  )

(defn x []
  (println "test"))