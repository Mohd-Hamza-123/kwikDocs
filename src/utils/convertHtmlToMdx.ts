import TurndownService from 'turndown';

const convertHtmlToMdx = (html: string): string => {
    const turndownService = new TurndownService();
    const markdown = turndownService.turndown(html);

    // Optionally append JSX elements if needed
    const mdx = markdown; // Add custom JSX logic here if necessary
    return mdx;
};

export default convertHtmlToMdx
