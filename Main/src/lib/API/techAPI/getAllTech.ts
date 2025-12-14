import conf from "@/conf/conf";
const REVALIDATE_TIME = 60 * 60 * 24 * 14;
import { TechnologyCategory } from "@/types/docs.type";

type ApiResponse =
    { success: true; message: string; payload: TechnologyCategory[]; }
    | { success: false; message: string; error?: string }

export const getAllTechnology = async (): Promise<TechnologyCategory[] | null> => {

    try {
        const END_POINT = process.env.NODE_ENV === "development" ? "http://localhost:3000/" : conf.api_end_point
        const res = await fetch(`${END_POINT}api/tech/read-tech`, {
            method: "GET",
            ...(process.env.NODE_ENV === 'development' ?
                { cache: 'no-store' as const } :
                {
                    next: {
                        revalidate: REVALIDATE_TIME
                    }
                })
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch tech data: ${res.status} ${res.statusText}`);
        }

        const data: ApiResponse = await res.json();

        if (data.success && Array.isArray(data.payload)) {
            return data.payload
        }

        return null

    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Unknown error";
        console.error("[getAllTechnology] Error:", message);
        return null;
    }

};
