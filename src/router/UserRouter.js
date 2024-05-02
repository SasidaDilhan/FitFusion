import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Follow from "../components/Follow";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import Post from "../pages/Post";
import AllUsers from "../pages/AllUsers";
import CreatePost from "../pages/UploadVedio";
import Comments from "../pages/Comments";
import UploadVedio from "../pages/UploadVedio";
import UploadPhoto from "../pages/UploadPhoto";
import Profile from "../pages/Profile";
import Followers from "../pages/Followers";
import FriendProfile from "../pages/FriendProfile";
import CreateStatus from "../pages/CreateStatus";

const UserRouter = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/follow" element={<Follow />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/post" element={<Post />} />
          <Route path="/createPost" element={<CreatePost />} />
          <Route path="/coments" element={<Comments />} />
          <Route path="/uploadVedio" element={<UploadVedio />} />
          <Route path="/uploadPhoto" element={<UploadPhoto />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/followers" element={<Followers />} />
          <Route path="/status" element={<CreateStatus />} />
          <Route path="/allUsers" element={<AllUsers />} />
          <Route path="/friend/:id" element={<FriendProfile />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default UserRouter;
