import cloudinary from "../connectCloudinary";

export const deleteImage = async (publicId: string) => {
    const result = await cloudinary.uploader.destroy(publicId);
    console.log(result)
    return true
}