; Copyright 2011 Arthur Edelstein

(ns co.parse
 (:import [clojure.lang LineNumberingPushbackReader]
          [java.io BufferedReader File StringReader]
          [java.lang StringBuilder])
 (:use [clojure.pprint :only (pprint)]))

(defn has?
  "If x is in collection, returns x, else nil."
  [coll x]
  (some #{x} coll))

(defn recording-source-reader [rdr]
  (let [text (StringBuilder.)]
    (proxy [clojure.lang.LineNumberingPushbackReader] [rdr]
      (read [] (let [i (proxy-super read)]
                 (.append text (char i))
                 i))
      (unread [c] (proxy-super unread c)
                  (.setLength text (dec (.length text))))
      (toString [] (let [s (.trim (str text))]
                     (.setLength text 0)
                     s)))))

(defn read-clojure-source
  "Takes the text of clojure source code and returns a sequence
   of maps, each containing an s-expression with metadata including
   the line number, the file name and the source text."
  [text]
  (let [code-reader (recording-source-reader (StringReader. (str \newline text)))]
    (take-while identity (repeatedly
                           (fn [] (let [sexpr (try (read code-reader) (catch Exception e nil))
                                        ;_ (println sexpr)
                                        nbot (.getLineNumber code-reader)
                                        code-lines (.toString code-reader)
                                        line (- nbot (count (.split code-lines "\n")))]
                                    (try
                                      (when sexpr (with-meta sexpr {:line line 
                                                                    :source code-lines}))
                                      (catch Exception e {}))))))))

;; namespace: { :full-name :short-name :doc :author :members :subspaces :see-also}
;; vars: {:name :doc :arglists :var-type :file :line :added :deprecated :dynamic}

(defn get-meta-deflike
  [sexpr]
  (meta (second sexpr)))

(defn get-arg-lists [sexpr]
  (let [tail (drop-while #(or (map? %) (string? %)) (drop 2 sexpr))
        exp1 (first tail)]
    (cond (vector? exp1) (list exp1)
          (list? exp1) (map first tail))))

(defn get-meta-defnlike
  [sexpr]
  (let [[_ t2 t3 t4] sexpr
        d (if (string? t3) t3)]
    (merge
      (meta t2)
      (if (map? t3) t3)
      (if (and d (map? t4)) t4)
      (if d {:doc d})
      {:arglists (str (get-arg-lists sexpr))})))

(defn get-meta-tail-doc
  [sexpr n]
  (merge
    (get-meta-deflike sexpr)
    (let [[_ _ t3 t4] sexpr]
      {:doc
        (str (condp = n
          3 t3
          4 t4))})))

;; TODO: 'ns (namespaces)
(defn analyze-sexpr
  "Analyze the s-expression for docs and metadata."
  [sexpr]
    (condp has? (first sexpr)
      '(ns)
        (get-meta-deflike sexpr)
      '(def defhinted defonce defstruct)
        (get-meta-deflike sexpr)
      '(defn definline defmacro defmulti defn-memo defnk)
        (get-meta-defnlike sexpr)
      '(defprotocol defunbound)
        (get-meta-tail-doc sexpr 3)
      '(defalias defvar)
        (get-meta-tail-doc sexpr 4)
      nil))

(defn get-var-type [sexpr]
  (or
    ({'defn      "function"
      'definline "function"
      'defmacro  "macro"
      'defmulti  "multimethod"
      'defnmemo  "function"
      'defnk     "function"}
     (first sexpr))
    "var"))

(defn build-expr-info [sexpr]
  (let [analysis (analyze-sexpr sexpr)]
    (with-meta
      (if (= (first sexpr) 'ns)
        (merge
          (select-keys analysis [:doc :author :subspaces :see-also])
          {:full-name (name (second sexpr))
           :short-name (name (second sexpr))})
        (merge
          (meta sexpr)
          (select-keys analysis [:arglists :doc :added :deprecated :dynamic])
          {:name (try (name (second sexpr)) (catch Exception e nil))
           :var-type (get-var-type sexpr)}))
      {:expr-type (first sexpr)})))

(defn create-var-entries [sexprs]
  (let [exprs-info (map build-expr-info sexprs)]
    (let [the-ns (first exprs-info)
          ns-info {:ns (:full-name the-ns)
                   :author (:author the-ns)
                   :ns-doc (:doc the-ns)}]
      (if (= 'ns (:expr-type (meta the-ns)))
        (map #(merge ns-info %) (rest exprs-info))
        (throw (Exception. "First element is not a namespace declaration."))))))

(defn process-text [t]
  (binding [*read-eval* false] ;; untrusted code!!!
    (create-var-entries (read-clojure-source t))))


;; tests

(def test-file
  "https://github.com/clojure/clojure/raw/b578c69d7480f621841ebcafdfa98e33fcb765f6/src/clj/clojure/core.clj")
  ;"src/var_finder/code_sample.clj")

(def f2 "/projects/clooj.org/clojars-clj/hiccups/hiccups/0.1.1/hiccups-0.1.1.jar!/hiccups")

(def f3 "/projects/clooj.org/clojars-clj/org/thnetos/cd-client/0.3.0/cd-client-0.3.0.jar!/cd_client/core.clj")

(defn test-read []
  (read-clojure-source test-file))

(defn test-collect []
  (process-text test-file))


