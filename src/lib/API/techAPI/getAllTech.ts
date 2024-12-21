import conf from "@/conf/conf";
import axios from "axios";

export const getAllTechnology = async () => {
    const res = await axios.get(`${conf.api_end_point}api/tech/read-tech`);
    if (res.data?.success) {
        return res.data?.payload
    }
    return null
};
