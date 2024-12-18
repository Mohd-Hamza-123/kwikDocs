import axios from "axios";

export const registerUser = async (userData: any) => {

    const res = await axios.post(`api/auth/signup`, userData);
    if (res.data?.success) {
        return res.data?.payload
    }
    return null
};

