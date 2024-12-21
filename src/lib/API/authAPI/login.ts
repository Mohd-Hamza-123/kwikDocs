import conf from "@/conf/conf";
import axios from "axios";

const LoginUser = async (userData: any) => {

    const res = await axios.post(`${conf.api_end_point}api/auth/login`, userData);
    if (res.data?.success) {
        return res.data?.payload
    }
    return null
};

export default LoginUser