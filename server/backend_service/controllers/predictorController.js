const axios = require("axios");
const AnalysisHistory = require("../models/AnalysisHistory");
const natural = require("natural");
const stopwords = require("stopword");

// ฟังก์ชันสำหรับการ Preprocess ข้อความ
const preprocessText = (inputText) => {
  inputText = inputText.toLowerCase(); // ✅ แปลงเป็นตัวพิมพ์เล็กทั้งหมด
  inputText = inputText.replace(/[^\w\s]+/g, ""); // ✅ ลบเครื่องหมายวรรคตอน
  let words = inputText.split(/\s+/); // ✅ แยกคำออกจากกัน (Tokenization)
  words = stopwords.removeStopwords(words); // ✅ ลบคำหยุด (Stopwords)
  const stemmer = natural.PorterStemmer; // ✅ ใช้ Stemming เพื่อลดคำลงรากศัพท์
  words = words.map((word) => stemmer.stem(word)); // ✅ ทำการ Stemming คำทั้งหมด
  return words.join(" "); // ✅ รวมคำกลับเป็นข้อความเดียว
};

// ฟังก์ชันสำหรับวิเคราะห์ข้อความ
exports.analyzeText = async (req, res) => {
  try {
    const { input_text } = req.body;
    const user_id = req.user ? req.user.user_id : null; // หากผู้ใช้ล็อกอิน จะมี user_id

    if (!input_text) {
      return res.status(400).json({ error: "กรุณากรอกข้อความเพื่อวิเคราะห์" });
    }

    // ทำการ Preprocess ข้อความ
    const processedText = preprocessText(input_text);

    // ส่งข้อมูลไปยัง Flask API
    const flaskResponse = await axios.post("http://localhost:5000/predict", {
      input_text: processedText,
    });

    const predictionResult = flaskResponse.data;

    // บันทึกลง MongoDB เฉพาะผู้ใช้ที่เข้าสู่ระบบ
    if (user_id) {
      const newHistory = new AnalysisHistory({
        user_id,
        input_text,
        result: predictionResult,
      });

      await newHistory.save();
    }

    res.json({ message: "วิเคราะห์สำเร็จ!", data: predictionResult });
  } catch (error) {
    console.error("Prediction Error:", error);
    res.status(500).json({ error: "เกิดข้อผิดพลาดในการวิเคราะห์ข้อความ" });
  }
};
