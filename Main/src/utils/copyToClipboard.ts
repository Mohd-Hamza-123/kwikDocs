import { toast } from "@/hooks/use-toast"

const copyToClipBoard = (text: string) => {
    navigator.clipboard.writeText(text)
        .then((res) => toast({ title: "Copied to clipboard" }))
        .catch((err) => toast({ title: "Failed to copy to clipboard" }))
}

export default copyToClipBoard