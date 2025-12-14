import React from 'react'
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ChooseTech, PlaygroundLanguages, PlaygroundProjectWrapper } from '@/components';

export default async function PlaygroundProject({ params }: any) {

    const { id: userId } = await params

    return (
        <main className="py-6 px-6 max-w-5xl mx-auto">

            <section className='flex gap-2 justify-between'>

                <ChooseTech/>


                <div className="flex flex-col items-end gap-4 mb-6">
                    <label htmlFor="project-search" className="sr-only">
                        Search projects
                    </label>
                    <form className="relative flex gap-2">
                        <Input
                            type="search"
                            id="project-search"
                            placeholder="Search projects by title"
                        />
                        <Button type="submit">Search</Button>
                    </form>
                    <PlaygroundLanguages />
                </div>
            </section>



            {/* Header */}
            <header className="mb-4">
                <h1 className="text-2xl font-semibold text-gray-100">Your Projects</h1>
                <p className="text-sm text-gray-400 mt-1">
                    Manage your projects — open the editor, duplicate, or share.
                </p>
            </header>
            <PlaygroundProjectWrapper userId={userId} />
        </main>
    );

}
