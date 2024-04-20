import axios from "axios";

const BASE_URL = "http://localhost:8080/users";
// const BASE_URL_2 = "http://localhost:8080/users/register";

class UserService {
  getUser() {
    return axios.get(BASE_URL);
  }

  getUserById(userId) {
    return axios.get(BASE_URL + "/" + userId);
  }

  followUsers(userID, follow) {
    return axios.get(BASE_URL + "/" + userID + "/follow" + follow);
  }

  saveUser(user) {
    return axios.post(BASE_URL + "/register", user);
    console.log(user)
  }

  loginUser(user) {
    return axios.post(BASE_URL + "/login" ,user)
  }
}

export default new UserService();
