import axios from "axios";

const BASE_URL = "http://localhost:8080/api/comments";

class CommentService {

    saveComment(userId,postId){
        return axios.post(BASE_URL + userId +"/post/" + postId)
    }

    getComments(postId){
        return axios.get(BASE_URL +"/" + postId)
    }
}

export default new CommentService();