;; muestra de clojure para revisar el resaltado de dark dev
(ns dark-dev.theme
  (:require [clojure.string :as str]
            [clojure.set :refer [union]]))

(def max-steps 16)

(defn alpha
  "devuelve el alfa"
  [{:keys [value]} percent]
  (when (<= 0 percent 100)
    (format "#%06X %d" value (int (* (/ percent 100.0) 255)))))

(defmacro unless [test & body] `(if (not ~test) (do ~@body)))

(let [slots [{:name "ink" :value 0xEEEEEE}]]
  (doseq [s slots :when (some? s)]
    (println (str/upper-case (:name s)) (alpha s 50) true nil)))
