import joblib
import numpy as np

# โหลดโมเดล TF-IDF และ Naive Bayes
tfidf_vectorizer = joblib.load("models/tfidf.pkl")
naive_bayes_model = joblib.load("models/naivebayes_model.pkl")

def predict_depression(text):
    """
    ทำการทำนายแนวโน้มการเป็นโรคซึมเศร้าจากข้อความ
    """
    if not text:
        return {"error": "กรุณาใส่ข้อความ"}

    # แปลงข้อความด้วย TF-IDF
    text_tfidf = tfidf_vectorizer.transform([text])

    # ทำการพยากรณ์
    prediction_prob = naive_bayes_model.predict_proba(text_tfidf)[0]

    # ค่าความเป็นไปได้ของ depression และ non-depression
    depression_prob = round(prediction_prob[1] * 100, 2)  # เปลี่ยนเป็นเปอร์เซ็นต์
    non_depression_prob = round(prediction_prob[0] * 100, 2)

    return {
        "depression_probability": depression_prob,
        "non_depression_probability": non_depression_prob
    }
