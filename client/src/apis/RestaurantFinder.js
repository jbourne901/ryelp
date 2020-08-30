import axios from "axios";


export default axios.create({
    baseURL: "http://192.168.2.242:3005/api/v1/restaurants"
});