import conf from "@/conf/conf";
import axios from "axios";

export const createDoc = async (doc: any) => {

    const res = await axios.post(`${conf.api_end_point}/api/tech/create-tech`, doc);
    if (res.data?.success) {
        return res.data?.payload
    }
    return null
};
