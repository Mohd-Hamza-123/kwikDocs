import conf from "@/conf/conf";
import axios from "axios";

export const verifyEmail = async (token: string) => {

    const res = await axios.post(`${conf.api_end_point}api/auth/verify-email`, {token});
    if (res.data?.success) {
        return res.data?.payload
    }
    return null
};
