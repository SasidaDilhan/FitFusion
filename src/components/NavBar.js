import React, { useEffect, useState } from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
  Card,
} from "@material-tailwind/react";

import Image1 from "../assets/gym2.jpg";
import { Link } from "react-router-dom";

export function NavBar({ user }) {
  const [openNav, setOpenNav] = React.useState(false);
  const [loggedIn, setloggedIn] = useState({});

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      // fetchUser();
    }
    setloggedIn(JSON.parse(userData));
  }, []);

  const handleLogOut = async () => {
    window.location.href = "http://localhost:8080/logout";
    localStorage.removeItem("user");
  };

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6 text-black">
      <Typography
        as="li"
        variant="small"
        color="black"
        className="p-1 font-normal"
      >
        <Link to={"/allUsers"} className="flex items-center">
          Profile
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="#" className="flex items-center">
          Peoples
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <Link to="/followers" className="flex items-center">
          Followers
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <button className="flex items-center" onClick={handleLogOut}>LogOut</button>
      </Typography>
    </ul>
  );

  return (
    <div className=" top-0 z-50 fixed max-h-full w-full">
      <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4">
        <div className="flex items-center justify-between text-black">
          <Link to="/home">
            <Typography className="mr-4 cursor-pointer py-1.5 font-medium text-xl">
              Fit Fusion
            </Typography>
          </Link>
          <div className="flex items-center gap-4 text-black">
            <div className="mr-4 hidden lg:block">{navList}</div>
            <div className="flex items-center gap-x-1 ">
              Hello! {loggedIn.username}
              <img
                className=" w-[40px] h-[40px] rounded-full "
                src={loggedIn.profilePictureUrl}
              />
            </div>
          </div>
        </div>
      </Navbar>
    </div>
  );
}
