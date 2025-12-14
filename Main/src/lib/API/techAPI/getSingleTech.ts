import conf from "@/conf/conf";
import axios from "axios";

export const getSingleTechnology = async (id: string) => {
    const res = await axios.get(`${conf.api_end_point}api/tech/read-single-tech/${id}`);
    if (res.data?.success) {
        return res.data?.payload
    }
    return null
};
