import axios from "axios"

const deleteDoc = async (Id: string) => {
    console.log(Id)
    const response = await axios.delete(`/api/docs/delete/${Id}`)

    return response?.data?.success || false
}

export default deleteDoc