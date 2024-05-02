import axios from "axios";

const BASE_URL = "http://localhost:8080/api/workoutPlans";

class WorkoutService {

    saveTemplate(workout,userId){
        return axios.post(BASE_URL + "/template/" +userId , workout)
    }

    getTemplate(userId){
        return axios.get(BASE_URL + "/template/" + userId)
    }

}

export default new WorkoutService();