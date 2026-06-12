import connectDB from "@/conf/database";
import TechModel from "@/models/tech.model";

export const getAllTechnology = async () => {

    console.log("TechModel")
    await connectDB();
    const data = await TechModel.aggregate([
        {
            $group: {
                _id: "$techType",
                technologies: {
                    $push: "$$ROOT"
                }
            }
        },
        {
            $project: {
                _id: 0,
                techType: "$_id",
                technologies: 1
            }
        }
    ])

    console.log(data)
    return data

}