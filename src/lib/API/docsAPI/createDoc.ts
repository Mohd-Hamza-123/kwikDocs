import { I_Docs } from "@/app/create-docs/page";
import axios from "axios";

const createDoc = async (doc: I_Docs) => {
    const res = await axios.post(`api/docs/create`, doc);
    if (res.data?.success) {
        return res.data?.payload
    }
    return null
};

export default createDoc;