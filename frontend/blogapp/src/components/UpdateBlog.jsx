import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { updateBlog, fetchBlogs } from "../api";

function UpdateBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    const getBlog = async () => {
      try {
        const res = await fetchBlogs();
        const blog = res.data.find((b) => b._id === id);
        if (blog) {
          setTitle(blog.title);
          setContent(blog.content);
        }
      } catch (err) {
        console.error("Failed to fetch blog:", err);
      }
    };
    getBlog();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      await updateBlog(id, { title, content }, token);
      alert("Blog updated successfully");
      navigate("/");
    } catch (err) {
      console.error("Failed to update blog:", err);
      alert("Failed to update blog");
    }
  };

  return (
    <div className="container">
      <h2 className="text-center mb-4">Update Blog</h2>
      <form onSubmit={handleUpdate}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="content" className="form-label">
            Content
          </label>
          <textarea
            className="form-control"
            id="content"
            rows="5"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Update Blog
        </button>
      </form>
    </div>
  );
}

export default UpdateBlog;
