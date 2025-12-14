import conf from "@/conf/conf";
import axios from "axios";

export const createTechnology = async (formData: FormData) => {
    const res = await axios.post(`${conf.api_end_point}api/tech/create-tech`, formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
    if (res.data?.success) {
        return res.data?.payload
    }
    return null
};
