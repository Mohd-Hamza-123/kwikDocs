const organize = async (name : string) => {
    try {
        const res = await fetch('/api/docs/organize', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name })
        })
        return res
    } catch (error) {
        console.log(error)
        return error
    }
}

export default organize