const removeStartingNumber = (string: string): string => {
    let info = string.split("")
    let result = [];
    let isStop = false;
    for (let index = 0; index < info.length; index++) {
        const element = info[index];
        const num = Number(element)
        if (!isNaN(num) && !isStop) {
            continue
        } else {
            result.push(element)
            isStop = true
        }
    }
    const name = result.join("")
    return name
}

export default removeStartingNumber