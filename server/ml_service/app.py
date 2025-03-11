from flask import Flask, request, jsonify
import pickle
import numpy as np

app = Flask(__name__)

# โหลดโมเดลที่เทรนไว้
tfidf_vectorizer = pickle.load(open("models/tfidf.pkl", "rb"))
model = pickle.load(open("models/naivebayes_model.pkl", "rb"))

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()
        input_text = data.get("input_text", "")

        if not input_text:
            return jsonify({"error": "No input text provided"}), 400

        # แปลงข้อความเป็นเวกเตอร์ TF-IDF
        input_vector = tfidf_vectorizer.transform([input_text]).toarray()

        # ทำการพยากรณ์
        prediction_prob = model.predict_proba(input_vector)[0] * 100
        
        result = {
            "depression": round(prediction_prob[0], 2),
            "non_depression": round(prediction_prob[1], 2),
        }

        return jsonify(result)
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0",port=5000, debug=True)
