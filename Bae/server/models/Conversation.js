const mongoose = require("mongoose");

const ConversationSchema = new mongoose.Schema({
  members: {
    type: [String],
  },
  lastMessage: {
    type: String,
    default: ""
  }
}, { timestamps: true });

module.exports = mongoose.model("Conversation", ConversationSchema);