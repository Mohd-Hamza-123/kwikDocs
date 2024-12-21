import { I_FormInputs } from "@/app/create-docs/page";
import conf from "@/conf/conf";
import axios from "axios";

const updateDoc = async (doc: I_FormInputs, _id: string) => {
    const res = await axios.patch(
        `${conf.api_end_point}api/docs/update/${_id}`, doc);
    if (res.data?.success) {
        return res.data?.payload
    }
    return null
}

export default updateDoc;