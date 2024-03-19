import React, { useContext, useEffect } from "react";
import axios from "axios";
import classes from "./styles.module.css";
import { GlobalContext } from "../../context";
import { useNavigate, useLocation } from "react-router-dom";

function AddBlog() {
  const { formData, setFormData, isEdit, setIsEdit } =
    useContext(GlobalContext);
  const navigation = useNavigate();
  const location = useLocation();

  const handleSaveBlog = async () => {
    let response;
    if (isEdit) {
      response = await axios.put(
        `http://localhost:5000/api/blogs/update/${location.state.currentBlogItem._id}`
      );
    } else {
      response = await axios.post("http://localhost:5000/api/blogs/add", {
        title: formData.title,
        description: formData.description,
      });
    }

    const result = response.data;

    if (result) {
      setFormData({
        title: "",
        description: "",
      });
      navigation("/");
    }
  };

  useEffect(() => {
    console.log(location);
    if (location.state) {
      const { currentBlogItem } = location.state;
      setIsEdit(true);
      setFormData({
        title: currentBlogItem.title,
        description: currentBlogItem.description,
      });
    }
  }, [location]);

  return (
    <div className={classes.wrapper}>
      <h1>{isEdit ? "Edit " : "Add"} a blog</h1>
      <div className={classes.formWrapper}>
        <input
          name="title"
          placeholder="Enter Blog Title"
          id="title"
          type="text"
          value={formData.title}
          onChange={(e) =>
            setFormData({
              ...formData,
              title: e.target.value,
            })
          }
        />
        <textarea
          name="description"
          placeholder="Enter a blog description"
          id="description"
          value={formData.description}
          onChange={(e) =>
            setFormData({
              ...formData,
              description: e.target.value,
            })
          }
        />
        <button onClick={handleSaveBlog}>
          {isEdit ? "Edit blog" : "Add new blog"}
        </button>
      </div>
    </div>
  );
}

export default AddBlog;
