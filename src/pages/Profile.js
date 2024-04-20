import React, { useState } from "react";
import Image from "../assets/gym2.jpg";
import { SideBar } from "./SideBar";

const Profile = () => {

  const [user, setUser] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    bio: "I am a software engineer",
    phoneNumber: "123-456-7890"
  });

  const [editUser, setEditUser] = useState({ ...user });


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditUser({ ...editUser, [name]: value });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can implement the logic to update the user data
    setUser({ ...editUser });
    // You can also send a request to the backend to update the user data
    // Example fetch request:
    // fetch('YOUR_BACKEND_API_ENDPOINT', {
    //   method: 'PUT',
    //   body: JSON.stringify(editUser),
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // })
    // .then(response => response.json())
    // .then(data => {
    //   // Handle response from backend
    //   console.log('User updated:', data);
    // })
    // .catch(error => {
    //   // Handle error
    //   console.error('Error updating user:', error);
    // });
  };

  return (
    <div className="bg-gray-200 min-h-screen flex">
        <SideBar />
      <div className="bg-white p-8 rounded-lg shadow-md w-[500px] m-auto">
        <h2 className="text-2xl font-semibold mb-4">Profile</h2>
        <div className="flex items-center mb-4">
          <img src={Image} alt="Profile" className="w-16 h-16 rounded-full mr-4" />
          <div>
            <p className="text-lg font-semibold">{`${user.firstName} ${user.lastName}`}</p>
            <p className="text-gray-600">{user.email}</p>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="bio" className="block text-lg font-semibold mb-2">Bio:</label>
            <textarea id="bio" name="bio" value={editUser.bio} onChange={handleInputChange} className="w-full rounded border-gray-300" />
          </div>
          <div className="mb-4">
            <label htmlFor="phoneNumber" className="block text-lg font-semibold mb-2">Phone Number:</label>
            <input type="text" id="phoneNumber" name="phoneNumber" value={editUser.phoneNumber} onChange={handleInputChange} className="w-full rounded border-gray-300" />
          </div>
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Save Changes</button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
