(ns co.code-sample)

(defn var-type
  "Determing the type (var, function, macro) of a var from the metadata and
return it as a string. (Borrowed from autodoc.)"
  [v]
  (cond (:macro (meta v)) "macro"
        (= (:tag (meta v)) clojure.lang.MultiFn) "multimethod"
        (:arglists (meta v)) "function"
        :else "var"))

(defmacro get-var-type
  "Work out the var type from its name."
  [vname]
  `(var-type ((ns-interns *ns*) '~vname)))

;sample functions

(def var-no-doc "Nothing")

(def ^{:doc "Definition contains a meta-map"} var-meta-map "Nothing")

(defn fn-no-doc []
  "Do nothing.")

(defn fn-string-doc
  "Definition contains a doc string."
  []
  "Do nothing.")
  
(defn fn-meta-map
  {:doc "Definition contains a meta-map"}
  []
  "Do nothing.")
  
(defn ^{:doc "Definition contains a meta map."} fn-meta-map-2 []
  "Do nothing.")
  
(defn fn-meta-map-and-doc-string
  "Definition contains a doc string and a meta map"
  {:added "1.0"}
  []
  "Do nothing.")

(defmacro macro-no-doc []
  "Do nothing.")
  
(defmacro macro-string-doc
  "Definition contains a doc string."
  []
  "Do nothing.")
  
(defmacro macro-meta-map
  {:doc "Definition contains a meta-map"}
  []
  "Do nothing.")
  
(defmacro macro-meta-map-and-doc-string
  "Definition contains a doc string and a meta map"
  {:added "1.0"}
  []
  "Do nothing.")
  
(definline inline-no-doc []
  "Do nothing.")
  
(definline inline-string-doc
  "Definition contains a doc string."
  []
  "Do nothing.")
  
(definline inline-meta-map
  {:doc "Definition contains a meta-map"}
  []
  "Do nothing.")
  
(definline inline-meta-map-and-doc-string
  "Definition contains a doc string and a meta map"
  {:added "1.0"}
  []
  "Do nothing.")
  
(defmulti multi-no-doc
  class)
(defmethod multi-no-doc String [s] (println s))

(defmulti multi-string-doc
  "Definition contains a doc string"
  class)
(defmethod multi-string-doc String [s] (println s))

(defmulti multi-meta-map
  {:doc "Definition contains a meta-map"}
  class)
(defmethod multi-meta-map String [s] (println s))

(defmulti multi-meta-map-and-doc-string
  "Definition contains a doc string and a meta-map"
  {:added "1.0"}
  class)
(defmethod multi-meta-map-and-doc-string String [s] (println s))

(defonce once-no-doc "Defined once.")

(defonce ^{:doc "Definition contains a meta-map"} once-string-doc "Defined once.")
