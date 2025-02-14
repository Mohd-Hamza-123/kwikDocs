import conf from "@/conf/conf"
export const siteConfig = {
    name: "Docs Node",
    url: conf.api_end_point,
    description: "Learn Simply: Your Beginner-Friendly Guide to Mastering Concepts",
    author: "Mohd Hamza",
    links: {
        twitter: '',
        instagram: 'https://www.instagram.com/byte_master_hamza/',
        github: 'https://github.com/Mohd-Hamza-123'
    }
}

export type siteConfig = typeof siteConfig