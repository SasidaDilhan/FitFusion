import React, { useState } from "react";
import { SideBar } from "./SideBar";

const CreatePost = () => {
  const [video, setvideo] = useState(null);
  const [caption, setCaption] = useState("");

  const handlevideoChange = (e) => {
    const file = e.target.files[0];
    setvideo(file);
  };

  const handleCaptionChange = (e) => {
    setCaption(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can implement the logic to upload the video and post data to your backend
    const formData = new FormData();
    formData.append("video", video);
    formData.append("caption", caption);

    // Example fetch request to your backend API
    fetch("YOUR_BACKEND_API_ENDPOINT", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle response from backend
        console.log("Post created:", data);
      })
      .catch((error) => {
        // Handle error
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
            <div className=" flex flex-col space-y-5">
              <label htmlFor="video">Upload video:</label>
              <input
                type="file"
                id="video"
                accept="video/*"
                onChange={handlevideoChange}
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
