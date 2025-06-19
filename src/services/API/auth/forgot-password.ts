import axios from "axios"

const forgotPassword = async (email: string) => {
    try {
        const res = await axios.post(`/api/auth/forgot-password`, { email })
        return res
    } catch (error) {
        console.log(error)
        return error
    }
}


export default forgotPassword