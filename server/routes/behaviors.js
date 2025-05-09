const router = require("express").Router();
const auth = require("../middleware/auth");
const Behavior = require("../models/Behaviour");
const Item = require("../models/Item");
const mongoose = require("mongoose");

router.get("/", auth, async (req, res) => {
  const items = await Item.find({ behavior: req.query.behaviorId });
  res.json(items);
});

router.get("/top5", auth, async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const behaviors = await Behavior.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(req.user.id) } },
      {
        $lookup: {
          from: "items",
          localField: "_id",
          foreignField: "behavior",
          as: "items",
        },
      },
      { $addFields: { count: { $size: "$items" } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
    ]);

    res.json(behaviors);
  } catch (err) {
    console.error("Error in /top5:", err.message);
    res.status(500).json({ message: "Failed to fetch top behaviors" });
  }
});

router.post("/", auth, async (req, res) => {
  const behavior = new Behavior({ title: req.body.title, user: req.user.id });
  await behavior.save();
  res.status(201).json(behavior);
});

router.delete("/:id", auth, async (req, res) => {
  await Item.deleteMany({ behavior: req.params.id });
  await Behavior.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

router.get("/:id", auth, async (req, res) => {
  try {
    const behavior = await Behavior.findOne({
      _id: req.params.id,
      user: req.user.id,
    });
    if (!behavior) {
      return res.status(404).json({ message: "Behavior not found" });
    }
    res.json(behavior);
  } catch (err) {
    console.error("Error fetching behavior:", err.message);
    res.status(500).json({ message: "Failed to fetch behavior" });
  }
});

module.exports = router;
