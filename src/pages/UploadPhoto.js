import React, { useState } from "react";
import { SideBar } from "./SideBar";

const CreatePost = () => {
  const [photo, setphoto] = useState(null);
  const [caption, setCaption] = useState("");

  const handlephotoChange = (e) => {
    const file = e.target.files[0];
    setphoto(file);
  };

  const handleCaptionChange = (e) => {
    setCaption(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("photo", photo);
    formData.append("caption", caption);

    fetch("YOUR_BACKEND_API_ENDPOINT", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Post created:", data);
      })
      .catch((error) => {
        console.error("Error creating post:", error);
      });
  };

  return (
    <div>
      <div className=" flex ">
        <SideBar />
      <div className=" flex m-auto">
      <div className=" border shadow-xl p-8 rounded-lg w-[500px]">
          <h2 className="text-center text-2xl font-bold mb-4">Create a New Post</h2>
          <form onSubmit={handleSubmit} className=" space-y-9">
            <div className=" space-y-3">
              <label htmlFor="caption">Caption:</label>
              <textarea
                id="caption"
                value={caption}
                onChange={handleCaptionChange}
                className="w-full border-none p-2"
              />
            </div>
            <div className=" flex flex-col space-y-6">
              <label htmlFor="photo">Upload photo:</label>
              <input
                type="file"
                id="photo"
                accept="photo/*"
                onChange={handlephotoChange}
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded"
            >
              Create Post
            </button>
          </form>
        </div>
      </div>
      </div>
    </div>
  );
};

export default CreatePost;
