export type DocumentType = {
    slug: string;
    title: string;
    description?: string | undefined;
    slugAsParams: string;
    body: string;
    published: boolean
}

export type ImageType = {
    secure_url: string;
    public_id: string;
}

export type Technology = {
    _id: string;
    name: string;
    techType: string;
    image: ImageType;
    description: string;
}

export type TechnologyCategory = {
    techType: string;
    technologies: Technology[]
}

export type DocPageParams = {
    params : {
        tech : string;
    }
}