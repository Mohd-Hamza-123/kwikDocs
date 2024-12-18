import axios from "axios";

const LoginUser = async (userData: any) => {

    const res = await axios.post(`api/auth/login`, userData);
    if (res.data?.success) {
        return res.data?.payload
    }
    return null
};

export default LoginUser