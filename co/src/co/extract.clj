(ns co.extract
  (:use [clojure.contrib.duck-streams :only (slurp*)]
        [co.utils :only (spew)])
  (:import (java.util.zip ZipFile)
           (java.io File)))

(defn jar-files [files]
  (filter #(.endsWith (.getAbsolutePath %) ".jar") files))

(defn get-entries-in-jar [file]
  (enumeration-seq (.entries (ZipFile. file))))

(defn clj-files [entries]
  (filter #(.endsWith (.getName %) ".clj") entries))

(defn clj-files-from-jar [jar-file]
  (let [entries (clj-files (get-entries-in-jar jar-file))]
    (for [entry entries]
      (let [path (str (.getAbsolutePath jar-file)
                      "! "File/separator
                      (.getName entry))]
        {:path path
         :text (slurp* (.getInputStream (ZipFile. jar-file) entry))}))))
    
(defn clj-files-from-jars [top-folder]
  (for [jar-file (jar-files (file-seq (File. top-folder)))]
    (try
      (clj-files-from-jar jar-file)
      (catch Exception e (println "Failed!")))))
  
(defn file-to-artifact [f]
  "Convert a clojars path to an artifact specifier."
  (let [pieces
        (-> f (.split (str "clojars-clj" File/separator)) second
            (.split ".jar!") first
            (.split (str File/separator)) butlast
            )]
    [(apply str (interpose "." (butlast (butlast pieces))))
     (last (butlast pieces))
     (last pieces)]))