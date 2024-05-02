import React, { useEffect, useState } from "react";
import { SideBar } from "./SideBar";
import { Input } from "@material-tailwind/react";
import UserService from "../services/UserService";

const Followers = () => {
  const [user, setUser] = useState({});
  const [follower, setFollower] = useState([]);

  useEffect(() => {
    const user = localStorage.getItem("user");
    setUser(JSON.parse(user));
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await UserService.getfollowers(JSON.parse(user.id));
        setFollower(
          response.data
            ? Array.isArray(response.data)
              ? response.data
              : []
            : []
        );
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [user]);
  console.log(follower);
  return (
    <div>
      <div className="flex flex-col ">
        <div className="flex flex-1 fixed ">
          <SideBar />
          <div className="flex-1 overflow-y-auto mt-40 ml-[500px]">
            <div className="grid grid-cols-4 gap-8 p-4 ml-9">
              {follower.length > 0 ? (
                follower.map((u, index) => (
                  <div className="p-3 bg-black m-auto space-y-4" key={index}>
                    <div className="bg-gray-100 p-4 w-[200px] h-[200px]">
                      <div>
                        {u.firstName} {u.lastName}
                      </div>
                      <div>{u.username}</div>
                      {/* Add more details as needed */}
                    </div>
                  </div>
                ))
              ) : (
                <div>Loading...</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Followers;
