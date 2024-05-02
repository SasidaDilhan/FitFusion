import axios from "axios";

const BASE_URL = "http://localhost:8080/users/";

class LikeService {
  setLike(userId, postId) {
    axios.post(BASE_URL + userId + "/post/" + postId);
  }
}
export default new LikeService();
