import { DocsBookmarks, MainDocs, RelatedDocs } from '@/index';
import React from 'react'
interface I_TechParams {
    tech: string
}
const Tech = ({ params }: { params: I_TechParams }) => {
    const { tech } = params;
    return (
        <>
            <main className="flex">
                <section className="w-[20%] border border-r-0">
                    {/* <DocsBookmarks doc={doc} /> */}
                </section>
                <section className="w-[62%] border">
                    {/* <MainDocs doc={doc} /> */}
                </section>
                <section className="w-[18%] border border-l-0">
                    <RelatedDocs />
                </section>
            </main>
           
        </>
    )
}

export default Tech