function injectCssIntoHtml(html : string, css : string) {
    const headContentRegex = /<head\b[^>]*>([\s\S]*?)<\/head>/i
    let headContent = html.match(headContentRegex)
    let finalHeadContent = ''
    if (headContent) {
        // console.log(headContent)
        let content = headContent[1]
        finalHeadContent = `<head>` + content + `<style>${css}</style>` + `</head>`
    }
    else {

    }

    const finalHtmlContent = html.replace(headContentRegex, finalHeadContent)
    return finalHtmlContent
}

export default injectCssIntoHtml