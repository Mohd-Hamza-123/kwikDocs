import axios from "axios";

export const createTechnology = async (formData: FormData) => {
    const res = await axios.post(`api/tech/create-tech`, formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
    if (res.data?.success) {
        return res.data?.payload
    }
    return null
};
