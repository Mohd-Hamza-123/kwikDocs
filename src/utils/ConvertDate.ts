
export const DateFormatter = (inputDate: string) => {
    const timestamp = inputDate;
    const date = new Date(timestamp);

    const year = date.getFullYear();
    const month = date.toLocaleString("default", { month: "long" });
    const day = date.getDate();
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12;
    const readableDate = `${month} ${day}, ${year}, ${hours}:${minutes} ${ampm}`;
    return readableDate
}

export function generateUniqueId() {
    const length = 20
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';

    while (result.length < length) {
        const randomPart = Math.random().toString(36).substring(2);
        result += randomPart;
    }

    return result.substring(0, length);
}

