import conf from "@/conf/conf";

export const getAllTechnology = async () => {
    try {

        const res = await fetch(`${conf.api_end_point}api/tech/read-tech`, {
            method: "GET",
            next : {
                revalidate : process.env.NODE_ENV === "development" ? 0 : 60 * 60 * 24 * 14
            }
        });
        
        if (!res.ok) throw new Error("Failed to fetch tech data");

        const data = await res.json();
    
        console.log("end")
        return data?.payload || null

    } catch (error: any) {
        console.log(error?.message);
        return null
    }

};
