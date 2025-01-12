const express = require("express");
const Blog = require("../models/Blog");
const { verifyToken, verifyAdmin } = require("../middleware/authMiddleware");
const router = express.Router();

// Add Blog (Admin Only)
router.post("/add", verifyToken, verifyAdmin, async (req, res) => {
  const { title, content, author } = req.body;
  try {
    const newBlog = await Blog.create({ title, content, author });
    res.status(201).json({ message: "Blog added", blog: newBlog });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get All Blogs (Public)
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete Blog (Admin Only)
router.delete("/:id", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    await Blog.findByIdAndDelete(id);
    res.json({ message: "Blog deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete the blog" });
  }
});

// Update Blog (Admin Only)
router.put("/:id", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { title, content },
      { new: true }
    );
    res.json({ message: "Blog updated successfully", blog: updatedBlog });
  } catch (err) {
    res.status(500).json({ error: "Failed to update the blog" });
  }
});

module.exports = router;
