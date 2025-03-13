const mongoose = require("mongoose");

const ResearchSchema = new mongoose.Schema(
  {
    research_id: { type: Number, unique: true },
    user_id: {
      type: Number,
      required: true,
    },
    title: { type: String, required: true },
    desc: { type: String },
    thumbnail: { type: String, default: "/src/assets/default-image.png" },
    content: { type: String, required: true },
    author: { type: String },
    createdAt: { type: Date, default: Date.now },
  }
  // ,{ collection: "research_tbl" }
);

ResearchSchema.pre("save", async function (next) {
  if (!this.research_id) {
    const lastResearch = await this.constructor.findOne().sort("-research_id");
    this.research_id = lastResearch ? lastResearch.research_id + 1 : 1;
  }
  next();
});

module.exports = mongoose.model("Research", ResearchSchema);
