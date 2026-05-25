import Welcome from "@/components/Welcome";
import { getAllTechnology } from "@/lib/getAllTechnology";
import Technologies from "@/components/cards/Technologies";
import EmptyTechnologies from "@/components/Technologies/EmpytTechnologies";

const TechStack = async () => {

    try {

        const technology = await getAllTechnology();
        
        const isTechnologyNotEmpty = Array.isArray(technology) && technology.length > 0

        if (!isTechnologyNotEmpty) {
            throw new Error("No technology data available");
        }

        return <>
            <Welcome />
            <Technologies technology={technology} />
        </>

    } catch (error) {
        console.error("Docs error:", error);
        return <EmptyTechnologies />
    }
};

export default TechStack;
