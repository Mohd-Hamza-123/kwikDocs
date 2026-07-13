import React from "react";
import Link from "next/link";
import { TechnologyCategory } from "@/types/docs.type";

type Props = {
    technologies: TechnologyCategory[]
}

const Welcome = ({ technologies }: Props) => {

    const techs = technologies.flatMap((tech) => tech.technologies)
    const names = techs.map((tech) => tech.name)

    return (
        <section className="min-h-[91dvh] flex flex-col justify-center items-center bg-inherit px-4 py-16">
            <div className="max-w-5xl w-full text-center">
                <h1 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-red-500">
                    Read Documentation like Stories
                </h1>

                <p className="mt-6 text-lg md:text-xl text-gray-600 dark:text-gray-300">
                    With the best guides and resources for developers.
                </p>

                <div className="mt-10">
                    <h2 className="text-lg md:text-xl font-semibold text-gray-800 dark:text-gray-100">
                        Start learning directly
                    </h2>

                    <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                        {names.map((name: string) => {
                            return (
                                <Link
                                    key={name}
                                    href={`/docs/${name.toLocaleLowerCase()}`}
                                    className="rounded-xl border border-gray-300 dark:border-gray-700 bg-white/5 px-4 py-3 text-sm md:text-base font-semibold text-gray-800 dark:text-gray-200 hover:text-white hover:border-purple-500 hover:bg-gradient-to-r hover:from-purple-600 hover:to-red-500 transition">
                                    {name}
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Welcome;