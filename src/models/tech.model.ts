
import mongoose from "mongoose";

const techSchema = new mongoose.Schema({

    name: {
        type: String,
        unique: true,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    techType: {
        type: String,
        required: true,
    },
    image: {
        type: {
            public_id: String,
            secure_url: String
        },
        required: false,
        _id: false
    },

})

export const TechModel = mongoose.models.TechModel || mongoose.model("TechModel", techSchema)