goog.provide('foo');
goog.require('cljs.core');
goog.require('clojure.browser.repl');
clojure.browser.repl.connect.call(null,"http://localhost:9000/repl");
