import conf from "@/conf/conf";
import axios from "axios";

const getProfile = async () => {
    try {
        const response = await axios.post(`${conf.api_end_point}/api/auth/profile`);
        if (response.data.success) {
            return response.data.payload;
        }
        return null;
    } catch (error) {
        // console.log("error", error)
        return null
    }

}

export default getProfile;