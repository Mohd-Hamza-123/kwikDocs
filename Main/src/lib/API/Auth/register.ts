
import { SignupSchemaType } from "@/lib/validation/authSchema";

export const registerUser = async (userData: SignupSchemaType) => {
    const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
    });

    const data = await response.json();
    return data
};

