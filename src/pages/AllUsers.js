import React, { useEffect, useState } from "react";
import { SideBar } from "./SideBar";
import { Input } from "@material-tailwind/react";
import UserServise from "../services/UserService";

const AllUsers = () => {
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await UserServise.getUser();
        setUsers(response.data);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const [user, setUser] = useState({});

  useEffect(() => {
    const userData = localStorage.getItem("user-google");
    setUser(JSON.parse(userData));
  }, []);

  const [followStatus, setFollowStatus] = useState({}); // State to track follow status for each user

  const handleFollowClick = async (user) => {
    try {
      const updatedStatus = !followStatus[user.userId]; // Toggle follow status
      setFollowStatus((prevStatus) => ({
        ...prevStatus,
        [user.userId]: updatedStatus,
      }));
      
      // Perform follow/unfollow action here
      if (updatedStatus) {
        // If following, perform follow action
      } else {
        // If unfollowing, perform unfollow action
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col ">
      <div className=" mt-[40px] w-[900px] ml-[400px] flex gap-5  z-50 bg-white border-b border-gray-200">
        <Input
          type="search"
          placeholder="Search"
          containerProps={{
            className: "min-w-[700px]",
          }}
          className="!border-t-blue-gray-300 rounded-lg pl-9 placeholder:text-blue-gray-300  focus:!border-blue-gray-300"
          labelProps={{
            className: "before:content-none after:content-none",
          }}
        />
        <button className=" rounded-lg w-36 bg-gray-500">sadads</button>
      </div>
      <div className="flex flex-1 fixed">
        <SideBar />
        <div className="flex-1 overflow-y-auto mt-40">
          <div className="grid grid-cols-4 gap-8 p-4 ml-9">
            {users?.map((user) => (
              <div
                className=" p-3 bg-black m-auto space-y-4 "
                key={user.user_id}
              >
                <div className="bg-gray-100 p-4 w-[200px] h-[200px]">
                  {user.firstName}
                </div>
                <button
                  onClick={() => handleFollowClick(user)}
                  className="bg-blue-600 rounded-lg w-full "
                >
                  {followStatus[user.userId] ? "Unfollow" : "Follow"}
                </button>
              </div>
            ))}
            <div
                className=" p-3 bg-black m-auto space-y-4 "
                key={user.user_id}
              >
                <div className="bg-gray-100 p-4 w-[200px] h-[200px]">
                  {user.firstName}
                </div>
                <button
                  onClick={() => handleFollowClick(user)}
                  className="bg-blue-600 rounded-lg w-full "
                >
                  {followStatus[user.userId] ? "Unfollow" : "Follow"}
                </button>
              </div>
              <div
                className=" p-3 bg-black m-auto space-y-4 "
                key={user.user_id}
              >
                <div className="bg-gray-100 p-4 w-[200px] h-[200px]">
                  {user.firstName}
                </div>
                <button
                  onClick={() => handleFollowClick(user)}
                  className="bg-blue-600 rounded-lg w-full "
                >
                  {followStatus[user.userId] ? "Unfollow" : "Follow"}
                </button>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
