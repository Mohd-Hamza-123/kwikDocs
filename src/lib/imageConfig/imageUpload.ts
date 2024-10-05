import cloudinary from "../connectCloudinary";

const uploadImage = async (image: File, folder: string = 'vnsluxe') => {
    try {
        const bytes = await image.arrayBuffer();
        const buffer = Buffer.from(bytes)
        const result = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                { folder: folder },
                (error, result) => {
                    if (error) reject(error)
                    else resolve(result)
                }
            )
            uploadStream.end(buffer);
        })
        return result || null
    } catch (error) {
        console.log(error)
        return null
    }
}


export default uploadImage