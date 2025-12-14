import conf from "@/conf/conf"
export const siteConfig = {
    name: "Kwik Docs",
    url: conf.api_end_point,
    description: "Kwikdocs : Your Beginner-Friendly Guide to Mastering Concepts",
    author: "Mohd Hamza",
    links: {
        twitter: 'https://x.com/Mohd_Hamza_byte?t=Y6IlBXQ6nooW1eo-__OXEQ&s=08',
        instagram: 'https://www.instagram.com/byte_master_hamza/',
        github: 'https://github.com/Mohd-Hamza-123',
        reddit : 'https://www.reddit.com/user/MathematicianOld479/'
    }
}

export type siteConfig = typeof siteConfig