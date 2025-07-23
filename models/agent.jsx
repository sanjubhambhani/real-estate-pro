import mongoose from "mongoose"

const AgentsSchema = new mongoose.Schema({
  active: { type: Boolean, default: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  token: { type: String },
  otp: { type: String },
  lastLogin: { type: Date },
  created: { type: Date, default: Date.now },
})

const Agent = mongoose.models.Agent || mongoose.model("Agent", AgentsSchema)
export default Agent
