import conf from "@/conf/conf"
export const siteConfig = {
    name: "Docs Node",
    url: conf.api_end_point || "https://docsnode.vercel.app/",
    description: "This is a documentation website",
    author: "Mohd Hamza",
    links: {
        twitter: '',
        instagram: 'https://www.instagram.com/byte_master_hamza/',
        github: 'https://github.com/Mohd-Hamza-123'
    }
}

export type siteConfig = typeof siteConfig