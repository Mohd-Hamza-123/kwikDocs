import { toast } from "./use-toast"
import { PlaygroundInput } from "@/types/models.type"

const usePlayground = () => {

    const createProject = async (data : PlaygroundInput) => {
        // console.log(data)
        try {
            const response = await fetch("/api/playground/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            })
            const responseData = await response.json()
            console.log(responseData)
            if (responseData.success) {
                toast({
                    title: responseData.message,
                    variant: "default"
                })
            } else {
                toast({
                    title: responseData.error,
                    variant: "destructive"
                })
            }
        } catch (error) {
            console.log(error)
            toast({
                title: "Document Not Saved",
                variant: "destructive"
            })
        }
    }

    return { createProject }
}

export default usePlayground