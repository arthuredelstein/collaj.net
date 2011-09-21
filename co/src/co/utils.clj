(ns co.utils
  (:import (java.io File)))

(defn spew [f content & options]
  (let [f (if (isa? (type f) File) f (File. f))]
    (.. f getParentFile mkdirs)
    (apply spit f content options)))