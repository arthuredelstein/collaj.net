(ns co.extract
 (:use [clojure.contrib.duck-streams :only (slurp*)]
   [local-file :only (file*)])
 (:import (java.util.zip ZipFile)
   (java.io File))
 (:require (clojure [zip :as zip])))

(def *root* (.getAbsolutePath (file* "../clojars-sync")))

(def *root-clj* (.getAbsolutePath (file* "../clojars-clj")))

(defn spew [f content & options]
  (let [f (if (isa? (type f) File) f (File. f))]
    (.. f getParentFile mkdirs)
    (apply spit f content options)))

(defn jar-files [files]
  (filter #(.endsWith (.getAbsolutePath %) ".jar") files))

(defn get-entries-in-jar [file]
  (enumeration-seq (.entries (ZipFile. file))))

(defn clj-files [entries]
  (filter #(.endsWith (.getName %) ".clj") entries))

(defn clj-from-jar [jar-file src dest]
  (let [entries (clj-files (get-entries-in-jar jar-file))]
    (doseq [entry entries]
      (let [path (str (.replace (.getAbsolutePath jar-file) src dest)
                      "!" File/separator
                      (.getName entry))]
        (spew path (slurp* (.getInputStream (ZipFile. jar-file) entry)))))))
    
(defn clj-from-jars [src dest]
  (doseq [jar-file (jar-files (file-seq (File. src)))]
    (println (.getAbsolutePath jar-file))
    (try
      (clj-from-jar jar-file src dest)
      (catch Exception e (println "Failed!")))))
  
