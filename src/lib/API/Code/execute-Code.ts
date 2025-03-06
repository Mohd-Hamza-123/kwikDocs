import axios from "axios";
import { LANGUAGE_VERSIONS } from "@/constant";

export const executeCode = async (sourceCode: string, language: keyof typeof LANGUAGE_VERSIONS) => {
    console.log(sourceCode)
    const response = await axios.post('https://emkc.org/api/v2/piston/execute', {
        "language": language,
        "version": LANGUAGE_VERSIONS[language],
        "files": [
            {
                "content": sourceCode
            }
        ]
    })
    return response.data
}