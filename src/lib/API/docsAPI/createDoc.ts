import { I_Docs } from "@/app/create-docs/page";
import conf from "@/conf/conf";
import axios from "axios";

const createDoc = async (doc: I_Docs) => {
    const res = await axios.post(`${conf.api_end_point}api/docs/create`, doc);
    if (res.data?.success) {
        return res.data?.payload
    }
    return null
};

export default createDoc;