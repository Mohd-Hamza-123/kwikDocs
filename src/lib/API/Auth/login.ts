
const LoginUser = async (userData: any) => {
    console.log(userData)
    const response = await fetch(`/api/auth/login`, {
        method: 'POST',
        headers: {
            contentType: 'application/json',
        },
        body: JSON.stringify(userData)
    });
    const data = await response.json()
    console.log(data)
    if (data?.success) {
        return data
    }
    return null
};

export default LoginUser

