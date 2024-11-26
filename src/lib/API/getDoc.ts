import axios from "axios";

export const getDocs = async () => {
    const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_END_POINT}api/docs`);
    if (res.data?.success) {
        return res?.data?.payload
    }
    return null
};