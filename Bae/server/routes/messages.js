const router = require("express").Router();
const mongoose = require("mongoose");
const Message = require("../models/Message");
const Conversation = require("../models/Conversation");
const protect = require("../middleware/protect");

router.post("/", protect, async (req, res) => {
  const { receiverId, text } = req.body;
  try {
    let conv = await Conversation.findOne({ members: { $all: [req.user._id.toString(), receiverId] } });
    if (!conv) conv = await Conversation.create({ members: [req.user._id.toString(), receiverId] });
    const msg = await Message.create({ conversationId: conv._id, sender: req.user._id, text });
    conv.lastMessage = text;
    conv.updatedAt = new Date();
    await conv.save();
    res.status(201).json(msg);
  } catch (e) { res.status(500).json({ message: e.message }); }
});

router.get("/conversations/all", protect, async (req, res) => {
  try {
    const myId = req.user._id.toString();
    const convs = await Conversation.find({ members: { $in: [myId] } }).sort({ updatedAt: -1 });
    // har conversation ka last message Message table se bhi check karo (purane chats ke liye)
    const withLast = await Promise.all(convs.map(async (c) => {
      if (!c.lastMessage) {
        const last = await Message.findOne({ conversationId: c._id }).sort({ createdAt: -1 });
        if (last) { c.lastMessage = last.text; await c.save(); }
      }
      return c;
    }));
    res.json(withLast);
  } catch (e) { res.status(500).json({ message: e.message }); }
});

router.get("/:id", protect, async (req, res) => {
  try {
    const myId = req.user._id.toString();
    const param = req.params.id;
    let conv = await Conversation.findOne({ members: { $all: [myId, param] } });
    if (!conv && mongoose.Types.ObjectId.isValid(param)) conv = await Conversation.findById(param);
    if (!conv) return res.json([]);
    const msgs = await Message.find({ conversationId: conv._id }).sort({ createdAt: 1 });
    res.json(msgs);
  } catch (e) { res.status(500).json({ message: e.message }); }
});

module.exports = router;