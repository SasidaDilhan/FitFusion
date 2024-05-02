import React, { useEffect, useState } from "react";
import Image from "../assets/gym2.jpg";
import { SideBar } from "./SideBar";
import { NavBar } from "../components/NavBar";
import UploadedPosts from "./UploadedPosts";

const Profile = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    bio: "",
    phoneNumber: "",
  });
  const [loggedIn, setloggedIn] = useState({});

  useEffect(() => {
    const userData = localStorage.getItem("user");
    setloggedIn(JSON.parse(userData));
  }, []);

  const [editUser, setEditUser] = useState({ ...user });
  console.log(loggedIn.id);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditUser({ ...editUser, [name]: value });
  };
  console.log(loggedIn);
  const handleSubmit = (e) => {
    e.preventDefault();

    setUser({ ...editUser });
  };

  return (
    <div className="bg-gray-200  min-h-screen flex">
      <NavBar />
      <div className="bg-white rounded-lg shadow-md mt-[70px] w-1/4">
        {/* <h2 className="text-2xl font-semibold mb-4">Profile</h2> */}
        <div className="flex items-center bg-slate-500 text-white  h-[300px] m-auto justify-center flex-col">
          <img
            src={loggedIn.profilePictureUrl}
            alt="Profile"
            className="w-24 h-24 rounded-full mr-4"
          />
          <div>
            <p className="text-3xl font-semibold">{`${loggedIn.firstName} ${loggedIn.lastName}`}</p>
            <p className="text-white text-2xl">{loggedIn.email}</p>
          </div>
        </div>
        <div className=" flex flex-row  justify-between  font-bold">
          <div className="w-1/2 p-4 m-auto flex  justify-center bg-blue-500 text-xl">
            Followers : {loggedIn.followersCount}
          </div>
          <div className="w-1/2 flex p-4 justify-center m-auto bg-green-400 text-xl">Following : {loggedIn.followingCount}</div>
        </div>
        <form onSubmit={handleSubmit} className=" p-8">
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-lg font-semibold mb-2"
            >
              User Name:
            </label>
            <input
              id="username"
              name="username"
              value={loggedIn.username}
              onChange={handleInputChange}
              className="w-full rounded border-gray-300"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-lg font-semibold mb-2">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={loggedIn.email}
              onChange={handleInputChange}
              className="w-full rounded border-gray-300"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="phoneNumber"
              className="block text-lg font-semibold mb-2"
            >
              Phone Number:
            </label>
            <input
              id="phoneNumber"
              name="phoneNumber"
              value={loggedIn.phoneNumber}
              onChange={handleInputChange}
              className="w-full rounded border-gray-300"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="bio" className="block text-lg font-semibold mb-2">
              Address:
            </label>
            <textarea
              id="bio"
              name="bio"
              value={loggedIn.bio}
              onChange={handleInputChange}
              className="w-full rounded border-gray-300"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            Save Changes
          </button>
        </form>
      </div>
      <div className=" flex m-auto">
        <UploadedPosts loggedIn={loggedIn} />
      </div>
    </div>
  );
};

export default Profile;
