(ns co.core
  (:use [co.extract :only (clj-files-from-jars)]
        [co.parse :only (generate-infos)]
        [local-file :only (file*)])
  (:gen-class))

(def root (.getAbsolutePath (file* "../clojars-sync")))

(def root-clj (.getAbsolutePath (file* "../clojars-clj")))

(def info-clj (.getAbsolutePath (file* "../clojars-info")))



;(defn file-to-artifact [f]
;  "Convert a clojars path to an artifact specifier."
;  (let [pieces
;        (-> f (.split (str "clojars-clj" File/separator)) second
;            (.split ".jar!") first
;            (.split (str File/separator)) butlast
;            )]
;    [(apply str (interpose "." (butlast (butlast pieces))))
;     (last (butlast pieces))
;     (last pieces)]))

;
;(defn process []
;  (clj-files-from-jars root)
;  (generate-infos root-clj info-clj))
;
;(defn -main [& args]
;  (process))
;
