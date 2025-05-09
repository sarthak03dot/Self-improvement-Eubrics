const router = require("express").Router();
const auth = require("../middleware/auth");
const Item = require("../models/Item");

router.get("/by-behavior/:behaviorId",  async (req, res) => {
  try {
    const items = await Item.find({
      behavior: req.params.behaviorId,
    });
    res.json(items);
  } catch (err) {
    console.error("Error fetching items:", err.message);
    res.status(500).json({ message: "Failed to fetch items" });
  }
});

router.post("/", auth, async (req, res) => {
  const item = new Item({ text: req.body.text, behavior: req.body.behaviorId });
  await item.save();
  res.status(201).json(item);
});

router.put("/:id", auth, async (req, res) => {
  const item = await Item.findByIdAndUpdate(
    req.params.id,
    { text: req.body.text },
    { new: true }
  );
  res.json(item);
});

router.delete("/:id", auth, async (req, res) => {
  await Item.findByIdAndDelete(req.params.id);
  res.json({ message: "Item deleted" });
});

module.exports = router;
