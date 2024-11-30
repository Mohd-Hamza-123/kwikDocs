import conf from "@/conf/conf";
import mongoose from "mongoose";

async function connectDB() {
    try {

        if (mongoose.connection.readyState >= 1) return

        await mongoose.connect(conf.mongodb_uri);
        const connection = mongoose.connection

        connection.on('connected', () => {
            console.log("mongoDB connected")
        })
        connection.on('error', (err) => {
            console.log('mongoDB connection error. Make sure mongodb is up & running. Error : ' + err);
            process.exit()
        });
    } catch (error) {
        console.log("Something went wrong in connecting Database");
        console.log(error)
    }
}

export default connectDB