import conf from "@/conf/conf";

export const getAllTechnology = async () => {
    try {

        const res = await fetch(`${conf.api_end_point}api/tech/read-tech`, {
            method: "GET",
        });

        if (!res.ok) throw new Error("Failed to fetch tech data");

        const data = await res.json();
        return data?.payload || null

    } catch (error: any) {
        console.log(error);
        return null
    }

};
