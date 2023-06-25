import React, { useEffect, useState } from "react";
import { Grid, Paper, Typography, TextField, Button } from "@material-ui/core";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";

const initialBlogData = {
  id: "",
  title: "",
  video_link: "",
  description: "",
  image: null,
};
const Api = "http://server.cashbackforever.net:5500/api/";
const AddBlogForm = () => {
  const [blogData, setBlogData] = useState(initialBlogData);
  const [blogs, setBlogs] = useState([]);
  const token = localStorage.getItem("accessToken");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const ReadMore = ({ children }) => {
    const text = children;
    const [isReadMore, setIsReadMore] = useState(true);
    const toggleReadMore = () => {
      setIsReadMore(!isReadMore);
    };
    return (
      <p className="text">
        {isReadMore ? text.slice(0, 350) : text}
        <span onClick={toggleReadMore} className="read-or-hide">
          {isReadMore ? (
            <span className="font-bold text-pink-750 ">&ensp;...read more</span>
          ) : (
            <span className="font-bold text-pink-750 ">&ensp;show less</span>
          )}
        </span>
      </p>
    );
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`${Api}admin/blogs`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Process the response data
      const data = response.data;
      setBlogs(data);
    } catch (error) {
      // Handle any errors
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBlogData({ ...blogData, [name]: value });
  };
  const handleInputChangedescription = (e) => {
    setBlogData({ ...blogData, description: e });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setBlogData({ ...blogData, image: file });
  };

  const handleEditBlog = (blog) => {
    setBlogData(blog);
  };

  const handleDeleteBlog = async (blogId) => {
    const response = await axios.delete(`${Api}admin/blogs/${blogId}`, config);
    // const updatedBlogs = blogs.filter((blog) => blog.id !== blogId);
    // setBlogs(updatedBlogs);
    if (response.data.success) {
      console.log("this is message", response.data.message);
      fetchData();
    }
  };

  const endpoint = `${Api}admin/blogs`;
  const handleAddBlog = async (e) => {
    e.preventDefault();

    if (blogData.id) {
      const response = await axios.put(
        `${Api}admin/blogs/${blogData.id}`,
        blogData,
        config
      );
      // const updatedBlogs = blogs.filter((blog) => blog.id !== blogId);
      // setBlogs(updatedBlogs);
      if (response.data.success) {
        console.log("this is message", response.data.message);
        Addimage(blogData.id);

        // setBlogData(initialBlogData);
      }
    } else {
      const response = await axios.post(endpoint, blogData, config);
      if (response.data.success) {
        console.log(response.data.message);
        Addimage(response.data.data.id);
      }
    }
  };

  const Addimage = (id) => {
    const formData = new FormData();
    formData.append("image", blogData.image);
    axios
      .put(`${Api}admin/blogs/image/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.accessToken}`,
        },
      })
      .then((resp) => {
        console.log("this is res after image uploading", resp);
        fetchData();
        // return true
      });
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={8}>
        <Paper elevation={3} style={{ padding: "2rem" }}>
          <Typography variant="h4" align="center" gutterBottom>
            Add New Blog
          </Typography>
          <form onSubmit={handleAddBlog}>
            <TextField
              name="title"
              label="Blog Title"
              variant="outlined"
              fullWidth
              value={blogData.title}
              onChange={handleInputChange}
              style={{ marginBottom: "1rem" }}
            />
            <TextField
              name="video_link"
              label="Blog Video URL"
              variant="outlined"
              fullWidth
              value={blogData.video_link}
              onChange={handleInputChange}
              style={{ marginBottom: "1rem" }}
            />
            <ReactQuill
              name="description"
              label="Blog Description"
              value={blogData.description}
              onChange={handleInputChangedescription}
              style={{ marginBottom: "1rem" }}
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ marginBottom: "1rem" }}
            />
            <Button type="submit" variant="contained" color="primary">
              {blogData.id ? "Update Blog" : "Add Blog"}
            </Button>
          </form>
        </Paper>
      </Grid>

      <Grid item xs={12} style={{ marginTop: "2rem" }}>
        <Typography variant="h4" align="center" gutterBottom>
          All Blogs
        </Typography>
        <Grid container spacing={2}>
          {blogs.map((blog) => (
            <Grid item key={blog.id} xs={12} md={6} lg={3}>
              <Paper elevation={3} style={{ padding: "1rem" }}>
                <img
                  src={blog.image}
                  width={250}
                  height={350}
                  alt={""}
                  unoptimized={true}
                />
                <Typography variant="h5">{blog.title}</Typography>
                <Typography variant="body1">
                  <ReadMore>{blog.description}</ReadMore>
                </Typography>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => handleEditBlog(blog)}
                  style={{ marginTop: "1rem" }}
                >
                  Edit
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => handleDeleteBlog(blog.id)}
                  style={{ marginTop: "1rem", marginLeft: "0.5rem" }}
                >
                  Delete
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AddBlogForm;
