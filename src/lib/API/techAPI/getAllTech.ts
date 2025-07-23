
export const getAllTechnology = async () => {
    try {

        const res = await fetch(`http://localhost:3000/api/tech/read-tech`, {
            method: "GET",
        });
        if (res.ok) {
            const data = await res.json();
            return data?.payload || null
        } else {
            return null
        }
    } catch (error: any) {
        console.log(error?.message)
    }

};
