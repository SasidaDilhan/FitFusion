import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import RegisterImage from "../assets/gym-register.jpg";
import UserService from "../services/UserService";
import { app, imageDb } from "../config/Config";
import { v4 } from "uuid";
import { ref, uploadBytes, getDownloadURL, getStorage } from "firebase/storage";

const storage = getStorage(app);

const Register = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    phoneNumber: "",
    profilePictureUrl: "",
    bio: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.value;
    setUser({ ...user, [e.target.name]: value });
  };

  //upload image

  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedUrls, setUploadedUrls] = useState([]);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [errors, setErrors] = useState({});

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    // Clear errors when user selects a file
    setErrors({ ...errors, profilePictureUrl: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = {};

    // Basic validation for profile picture
    if (!selectedFile) {
      formErrors.profilePictureUrl = "Profile Picture is required";
    }

    // Basic validation for other fields
    if (!user.firstName.trim()) {
      formErrors.firstName = "First Name is required";
    }
    if (!user.lastName.trim()) {
      formErrors.lastName = "Last Name is required";
    }
    if (!user.email.trim()) {
      formErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(user.email)) {
      formErrors.email = "Email address is invalid";
    }
    // Add more validations as needed

    setErrors(formErrors);

    // If no errors, submit form
    if (Object.keys(formErrors).length === 0) {
      let imageUrl = null;

      if (selectedFile) {
        const imageRef = ref(storage, `/images/${selectedFile.name}`);
        await uploadBytes(imageRef, selectedFile);
        imageUrl = await getDownloadURL(imageRef);
      }

      const data = {
        ...user,
        profilePictureUrl: imageUrl,
      };

      UserService.saveUser(data)
        .then((response) => {
          console.log(response);
          navigate("/");
        })
        .catch((error) => {
          console.log("error");
        });
    }
  };

  return (
    <div>
      <div className="flex flex-row ">
        <div className="w-2/5">
          <div className="bg-black  bg-opacity-40 absolute inset-0 "></div>
          <div className="">
            <div className="bg-white  h-screen shadow-md rounded-md p-8 w-100 relative z-10 ">
              <h2 className="text-xl font-semibold mb-4">Register</h2>
              <form className=" space-y-10" onSubmit={handleSubmit}>
                <div>
                  <label>Profile Picture</label>
                  <input type="file" onChange={handleFileChange} />
                  {previewUrl && (
                    <img
                      src={previewUrl}
                      alt="Selected"
                      style={{ maxWidth: "200px", maxHeight: "200px" }}
                    />
                  )}
                </div>
                <div className="flex flex-row gap-3">
                  <label htmlFor="firstname" className="block text-gray-700">
                    First Name
                    <input
                      type="text"
                      name="firstName"
                      // value={user.firstName}
                      onChange={(e) => handleChange(e)}
                      placeholder="First Name"
                      className="w-full px-3 mt-2 py-2 rounded-md border border-gray-300 mb-3 focus:outline-none focus:border-blue-500 bg-white bg-opacity-10"
                    />
                  </label>
                  <label
                    htmlFor="lastName"
                    className="block text-gray-700 ml-auto"
                  >
                    Last Name
                    <input
                      type="text"
                      name="lastName"
                      // value={user.lastName}
                      onChange={(e) => handleChange(e)}
                      placeholder="Last Name"
                      className="w-full px-3 mt-2 py-2 rounded-md border border-gray-300 mb-3 focus:outline-none focus:border-blue-500 bg-white bg-opacity-10"
                    />
                  </label>
                </div>
                <div className="">
                  <label htmlFor="email" className="block text-gray-700">
                    Email
                    <input
                      type="text"
                      name="email"
                      // value={user.email}
                      onChange={(e) => handleChange(e)}
                      placeholder="Email"
                      className="w-full mt-2 px-3 py-2 rounded-md border border-gray-300 mb-3 focus:outline-none focus:border-blue-500 bg-white bg-opacity-10"
                    />
                  </label>
                </div>
                <div className="">
                  <label htmlFor="phoneNumber" className="block text-gray-700">
                    Phone Number
                    <input
                      type="text"
                      name="phoneNumber"
                      // value={user.phoneNumber}
                      onChange={(e) => handleChange(e)}
                      placeholder="Phone Number"
                      className="w-full px-3 mt-2 py-2 rounded-md border border-gray-300 mb-3 focus:outline-none focus:border-blue-500 bg-white bg-opacity-10"
                    />
                  </label>
                </div>
                <div className="flex flex-row gap-3">
                  <label htmlFor="username" className="block text-gray-700">
                    User Name
                    <input
                      type="text"
                      name="username"
                      // value={user.username}
                      onChange={(e) => handleChange(e)}
                      placeholder="User Name"
                      className="w-full px-3 mt-2 py-2 rounded-md border border-gray-300 mb-3 focus:outline-none focus:border-blue-500 bg-white bg-opacity-10"
                    />
                  </label>
                  <label
                    htmlFor="password"
                    className="block text-gray-700 ml-auto"
                  >
                    Password
                    <input
                      type="password"
                      name="password"
                      // value={user.username}
                      onChange={(e) => handleChange(e)}
                      placeholder="Password"
                      className="w-full px-3 mt-2 py-2 rounded-md border border-gray-300 mb-3 focus:outline-none focus:border-blue-500 bg-white bg-opacity-10"
                    />
                  </label>
                </div>
                <div>
                  <label htmlFor="address" className="block text-gray-700">
                    Address
                    <textarea
                      name="bio"
                      // value={user.address}
                      onChange={(e) => handleChange(e)}
                      placeholder="Address"
                      className="w-full mt-2 px-3 py-2 rounded-md border border-gray-300 mb-3 focus:outline-none focus:border-blue-500 bg-white bg-opacity-10"
                    ></textarea>
                  </label>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
                >
                  Register
                </button>
              </form>
              <div className="flex flex-row mt-5">
                <p className="mr-1">Already have an account?</p>
                <Link to="/login">
                  <p className="ml-1 text-blue-600 underline cursor-pointer">
                    Login
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <img className=" h-screen " src={RegisterImage} alt="Login Image" />
        </div>
      </div>
    </div>
  );
};

export default Register;
