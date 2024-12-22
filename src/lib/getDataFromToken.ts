import { NextRequest } from "next/server";
import jwt from 'jsonwebtoken'
import conf from "@/conf/conf";

const getDataFromToken = async (request: NextRequest) => {
    try {
        const token = request.cookies.get('token')?.value || ""
        
        const decodedToken: any = jwt.verify(token, conf.token_secret);
      
        return decodedToken?._id
    } catch (error: any) {
        throw new Error(error?.message || "Invalid Token")
    }
}

export default getDataFromToken