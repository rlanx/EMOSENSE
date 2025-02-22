const mongoose = require("mongoose");

const NewsSchema = new mongoose.Schema({
  news_id: { type: Number, unique: true },
  user_id: {
    type: Number,
    required: true,
  },
  title: { type: String, required: true },
  desc: { type: String },
  thumbnail: { type: String, default: "/src/assets/default-image.png" }, // HTML จาก ReactQuill
  content: { type: String, required: true },
  author: { type: String },
  createdAt: { type: Date, default: Date.now },
});

NewsSchema.pre("save", async function (next) {
  if (!this.news_id) {
    const lastNews = await this.constructor.findOne().sort("-news_id");
    this.news_id = lastNews ? lastNews.news_id + 1 : 1;
  }
  next();
});

module.exports = mongoose.model("News", NewsSchema);
