import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:8080' });

export const login = (credentials) => API.post('/auth/login', credentials);
export const register = (user) => API.post('/auth/register', user);
export const fetchBlogs = () => API.get('/blogs');
export const addBlog = (blog, token) =>
  API.post('/blogs/add', blog, { headers: { Authorization: token } });

// New APIs
export const deleteBlog = (id, token) =>
    API.delete(`/blogs/${id}`, { headers: { Authorization: token } });
  
  export const updateBlog = (id, blog, token) =>
    API.put(`/blogs/${id}`, blog, { headers: { Authorization: token } });
  