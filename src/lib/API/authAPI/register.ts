import conf from "@/conf/conf";
import axios from "axios";

export const registerUser = async (userData: any) => {

    const res = await axios.post(`${conf.api_end_point}api/auth/signup`, userData);
    if (res.data?.success) {
        return res.data?.payload
    }
    return null
};

