import conf from "@/conf/conf";
import axios from "axios";

export interface IgetDocs {
    techId: string;
    limit: number
    pageParam: number;
}

export const getDocs = async ({
    techId,
    limit,
    pageParam,
}: IgetDocs) => {

    const res = await axios.get(
        `${conf.api_end_point}api/docs/all-docs/${techId}`, {
        params: {
            limit,
            pageParam,
        }
    }
    );
    if (res.data?.success) {
        return res?.data
    }
    return null
};