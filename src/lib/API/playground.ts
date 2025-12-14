export const getPlaygroundProject = async (userId: string, tech: string, pageParam: number) => {
    const res = await fetch(`/api/playground/read/get-all`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ userId, tech, pageParam })
    })
    const data = await res.json();
    return {
        document: data.data,
        nextCursor : 1
    }
}