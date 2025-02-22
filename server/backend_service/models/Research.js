const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const ResearchSchema = new mongoose.Schema({
  research_id: { type: Number, unique: true },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: { type: String, required: true },
  desc: { type: String },
  img_name: [{ type: String }], // รองรับหลายรูป
  img_path: [{ type: String }], // รองรับหลายรูป
  content: { type: String, required: true },
  author: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

ResearchSchema.plugin(AutoIncrement, { inc_field: "research_id" });

module.exports = mongoose.model("Research", ResearchSchema);
