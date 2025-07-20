import mongoose from "mongoose"

const AgentsSchema = new mongoose.Schema({
  active: { type: Boolean, default: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  token: { type: String },
  opt: { type: Number },
  optExpire: { type: Date },
  lastLogin: { type: Date },
  created: { type: Date, default: Date.now },
})

export default mongoose.models.Agent || mongoose.model("Agent", AgentsSchema)
