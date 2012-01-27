(ns co.core
  (:use [co.extract :only (clj-files-from-jars)]
        [co.parse :only (generate-infos)]
        [local-file :only (file*)])
  (:gen-class))

(def root (.getAbsolutePath (file* "../clojars-sync")))

(def root-clj (.getAbsolutePath (file* "../clojars-clj")))

(def info-clj (.getAbsolutePath (file* "../clojars-info")))


(defn process []
  (clj-files-from-jars root)
  (generate-infos root-clj info-clj))

(defn -main [& args]
  (process))

