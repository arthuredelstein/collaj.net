(ns co.extract
  (:import (java.util.zip ZipFile)
           (java.io BufferedReader File))
  (:use [clojure.java.io :only (reader)]))

(def failed-jars (atom []))

(defn #^String slurp*
  "Like clojure.core/slurp but opens f with reader."
  [f]
  (with-open [^BufferedReader r (reader f)]
             (let [sb (StringBuilder.)]
               (loop [c (.read r)]
                 (if (neg? c)
                   (str sb)
                   (do (.append sb (char c))
                       (recur (.read r))))))))

(defn jar-files
  "List all jar files located in hierarchy under top-folder."
  [top-folder]
  (->> top-folder
       File.
       file-seq
       (filter #(.endsWith (.getAbsolutePath %) ".jar"))))

(defn get-entries-in-jar
  "Get a list of entries in a jar."
  [file]
  (enumeration-seq (.entries (ZipFile. file))))

(defn select-clj-jar-entries
  "Select *.clj files from a list of jar entries."
  [entries]
  (filter #(.endsWith (.getName %) ".clj") entries))

(defn clj-sources-from-jar
  "Read the text of clj source files from a jar file
   and return in a list of maps containing path and source text."
  [jar-file]
  (let [entries (select-clj-jar-entries (get-entries-in-jar jar-file))]
    (for [entry entries]
      (let [path (str (.getAbsolutePath jar-file)
                      "!" File/separator
                      (.getName entry))]
        {:path path
         :text (slurp* (.getInputStream (ZipFile. jar-file) entry))
         }))))
    
(defn clj-sources-from-jars [jar-files]
  "Read the text of clj source files from a list of jars
   in the hierarchy located under top-folder. Return a list
   of maps each containing a path and source text."
  (reset! failed-jars [])
  (filter identity
          (apply concat
                 (for [jar-file jar-files]
                   (try
                     (clj-sources-from-jar jar-file)
                     (catch Exception e 
                            (swap! failed-jars conj [jar-file e])))))))

(def root "/projects/clooj.org/clojars-sync/")