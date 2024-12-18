const conf = {
    api_end_point: String(process.env.NEXT_PUBLIC_API_END_POINT),
    mongodb_uri: String(process.env.MONGODB_URI),
    cloudinary_cloud_name: String(process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME),
    cloudinary_api_key: String(process.env.CLOUDINARY_API_KEY),
    cloudinary_api_secret: String(process.env.CLOUDINARY_API_SECRET),
    mail_user : String(process.env.MAIL_USER),
    mail_password: String(process.env.MAIL_PASSWORD),
    token_secret : String(process.env.TOKEN_SECRET)
}

export default conf