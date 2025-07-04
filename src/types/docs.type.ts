export type DocumentType = {
    slug: string;
    title: string;
    description?: string | undefined;
    slugAsParams: string;
    body: string;
    published: boolean
}