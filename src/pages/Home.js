import React, { useEffect, useState } from "react";
import { NavBar } from "../components/NavBar";
import Follow from "../components/Follow";
import Post from "./Post";
import UserServise from "../services/UserService";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [users, setUsers] = useState(null);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  useEffect(() => {
    const userData = localStorage.getItem("user-google");
    if (!userData) {
      fetchUser();
    }
    setUser(JSON.parse(userData));
  }, []);

  const fetchUser = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/user", {
        withCredentials: true,
      });
      localStorage.setItem("user-google", JSON.stringify(res.data));
    } catch (error) {
      if (error.response.status === 401) {
        navigate("/");
      }
    }
  };

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
  return (
    <div className=" mt-[80px] bg-gray-400">
      <NavBar user={user} />
      <Follow users={users} />
      <Post />
    </div>
  );
};

export default Home;
