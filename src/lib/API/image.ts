export const uploadImageAPI = async (formData: FormData) => {
    try {
        const res = await fetch(`/api/image/upload`)

    } catch (error) {
        console.log(error)
        return null
    }
}

export const deleteImageAPI = async (images: any) => {
    try {
        const res = await fetch(`api/upload-image`)
    } catch (error) {
        console.log(error);
        return null
    }
}