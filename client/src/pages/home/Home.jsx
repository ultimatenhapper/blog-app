import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../../context";
import axios from "axios";
import classes from "./styles.module.css";
import { FaTrash, FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Home() {
  const { blogList, setBlogList, pending, setPending } =
    useContext(GlobalContext);
  const navigate = useNavigate();

  const deleteBlog = async (currentId) => {
    const response = await axios.delete(
      `http://localhost:5000/api/blogs/delete/${currentId}`
    );
    const result = response.data;

    if (result?.message) {
      fetchListOfBlogs();
    }
  };
  const fetchListOfBlogs = async () => {
    const response = await axios.get("http://localhost:5000/api/blogs/");
    const result = response.data;

    if (result && result.blogList && result.blogList.length) {
      setBlogList(result.blogList);
      setPending(false);
    } else {
      setPending(false);
      setBlogList([]);
    }
  };

  const handleEdit = (currentBlogItem) => {
    navigate("/add-blog/", { state: { currentBlogItem } });
  };
  useEffect(() => {
    fetchListOfBlogs();
  }, []);

  return (
    <div className={classes.wrapper}>
      <h1>Blog List</h1>
      {pending ? (
        <h1>Loading posts...</h1>
      ) : (
        <div className={classes.blogList}>
          {blogList && blogList.length ? (
            blogList.map((blogItem) => {
              return (
                <div key={blogItem._id}>
                  <p>{blogItem.title}</p>
                  <p>{blogItem.description}</p>
                  <FaEdit onClick={() => handleEdit(blogItem)} size={30} />
                  <FaTrash onClick={() => deleteBlog(blogItem._id)} size={30} />
                </div>
              );
            })
          ) : (
            <h3>No Blogs added</h3>
          )}
        </div>
      )}
    </div>
  );
}

export default Home;
