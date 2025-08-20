export default function sanitizeHtml(htmlCode: string) {

     const findScriptRegex = /<script[\s\S]*?<\/script>/i
    const findStyleRegex = /<style\b[^>]*>([\s\S]*?)<\/style>/i

    if (htmlCode.match(findScriptRegex))
        htmlCode = htmlCode.replace(findScriptRegex, "")

    if (htmlCode.match(findStyleRegex))
        htmlCode = htmlCode.replace(findStyleRegex, "")


    htmlCode = htmlCode.replace(/ on\w+="[^"]*"/gi, "");
    htmlCode = htmlCode.replace(/ on\w+='[^']*'/gi, "");
    // Remove <object>...</object> and <iframe>...</iframe>
    htmlCode = htmlCode.replace(/<(object|iframe)[\s\S]*?>[\s\S]*?<\/\1>/gi, "");
    // Remove self-closing or standalone <embed> tags
    htmlCode = htmlCode.replace(/<embed\b[^>]*\/?>/gi, "");

    return htmlCode
}