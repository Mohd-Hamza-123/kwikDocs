import { LoginSchemaType } from "@/lib/validation/authSchema";

const LoginUser = async (userData: LoginSchemaType) => {

    const response = await fetch(`/api/auth/login`, {
        method: 'POST',
        headers: {
            contentType: 'application/json',
        },
        body: JSON.stringify(userData)
    });
    const data = await response.json()
    return data
};

export default LoginUser

