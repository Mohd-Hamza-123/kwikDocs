import axios from "axios";

export const getAllTechnology = async () => {
    const res = await axios.get(`/api/tech/read-tech`, {
        timeout: 7000
    });
    if (res.data?.success) {
        return res.data?.payload
    }
    return null
};
