const mongoose = require("mongoose");

const analysisHistorySchema = new mongoose.Schema(
  {
    history_id: { type: Number, unique: true },
    user_id: { type: Number, required: false }, // อนุญาตให้เป็น null ได้
    input_text: { type: String, required: true },
    result: {
      depression: { type: Number, required: true },
      non_depression: { type: Number, required: true },
    },
    analysis_date: { type: Date, default: Date.now },
  }
  // ,{ collection: "analysis_history_tbl" }
);

// ให้ history_id เพิ่มขึ้นอัตโนมัติ
analysisHistorySchema.pre("save", async function (next) {
  if (!this.history_id) {
    const lastRecord = await this.constructor.findOne().sort("-history_id");
    this.history_id = lastRecord ? lastRecord.history_id + 1 : 1;
  }
  next();
});

module.exports = mongoose.model("Analysis_History", analysisHistorySchema);
