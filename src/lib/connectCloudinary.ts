import conf from '@/conf/conf';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: conf.cloudinary_cloud_name,
    api_key: conf.cloudinary_api_key,
    api_secret: conf.cloudinary_api_secret
});

export default cloudinary