import axios from "axios";

export const getDocs = async () => {
    const res = await axios.get(
        `api/docs`);
    if (res.data?.success) {
        return res?.data?.payload
    }
    return null
};

export const getDoc = async (id: string) => {
    const res = await axios.get(
        `api/docs/${id}`
    );
    if (res.data?.success) {
        return res?.data?.payload
    }
    return null
};