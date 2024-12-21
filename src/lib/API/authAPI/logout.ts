import conf from "@/conf/conf";
import axios from "axios";

const logoutAPI = async () => {
    try {
        const response = await axios.get(`${conf.api_end_point}/api/auth/logout`);
        if (response.data.success) {
            return response.data.payload;
        }
        return null;
    } catch (error) {
        return null
    }

}

export default logoutAPI;