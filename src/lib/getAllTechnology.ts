import connectDB from "@/conf/database";
import TechModel from "@/models/tech.model";

export const getAllTechnology = async () => {

    try {
       
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

        // console.log(data)
        return data

    } catch (error: unknown) {
        console.error("error : ", error instanceof Error ? error.message : error);
        return null
    }

}