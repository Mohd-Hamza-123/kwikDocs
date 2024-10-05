import conf from "@/conf/conf"
import axios from "axios"

export const uploadImageAPI = async (formData: FormData) => {
    try {
        const res = await axios.post(`${conf.api_end_point}/api/image/upload`, formData)
        if (res?.data?.success) {
            return res?.data?.payload
        } else {
            return null
        }
    } catch (error) {
        console.log(error)
        return null
    }
}

export const deleteImageAPI = async (images: any) => {
    try {
        const res = await axios.delete(`${conf.api_end_point}/api/upload-image`, {
            data: {
                images
            }
        })
    } catch (error) {
        console.log(error);
        return null
    }
}