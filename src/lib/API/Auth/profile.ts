import axios from "axios";

const getProfile = async () => {

    const response = await axios.post(`/api/auth/profile`);
    if (response?.data?.success) return response.data.payload

    return null;

}

export default getProfile;