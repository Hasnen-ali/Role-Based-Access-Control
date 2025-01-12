import React, { useState, useEffect } from "react";
import { fetchBlogs, deleteBlog } from "../api";

function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const role = getRoleFromToken();
  const navigate = useNavigate();

  const handleUpdate = (id) => {
    navigate(`/update-blog/${id}`);
  };
  useEffect(() => {
    const getBlogs = async () => {
      try {
        const res = await fetchBlogs();
        setBlogs(res.data);
      } catch (err) {
        console.error("Error fetching blogs:", err);
      } finally {
        setLoading(false);
      }
    };
    getBlogs();
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await deleteBlog(id, token);
      setBlogs(blogs.filter((blog) => blog._id !== id));
      alert("Blog deleted successfully");
    } catch (err) {
      console.error("Failed to delete blog:", err);
      alert("Failed to delete blog");
    }
  };

  return (
    <div>
      <h2 className="text-center mb-4">Blogs</h2>
      {loading ? (
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : blogs.length === 0 ? (
        <p className="text-center">No blogs found!</p>
      ) : (
        <div className="row">
          {blogs.map((blog) => (
            <div className="col-md-4 mb-4" key={blog._id}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{blog.title}</h5>
                  <p className="card-text">{blog.content}</p>
                  <p className="text-muted">Author: {blog.author}</p>
                  {role === "admin" && (

                  <div className="mt-2">
                      <button
                        className="btn btn-primary me-2"
                        onClick={() => handleUpdate(blog._id)}
                      >
                        Update
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(blog._id)}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BlogList;

import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
export const getRoleFromToken = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;
  try {
    const decoded = jwtDecode(token); // Decode the token using jwtDecode
    return decoded.role;
  } catch (err) {
    console.error("Invalid token:", err);
    return null;
  }
};