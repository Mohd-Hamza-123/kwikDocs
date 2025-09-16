import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
    Card,
    CardContent,
    CardTitle
} from "@/components/ui/card";

const languages = [
    { name: "HTML & CSS", image: "language/html-css.png", path: "/playground-editor/html-css" },
    { name: "HTML, CSS & JavaScript", image: "/language/web.png", path: "/playground-editor/html-css-javascript" },
    // { name: "Node JS", image: "/language/javascript.jpg", path: "/playground-editor/nodejs" },
    // { name: "TypeScript", image: "/language/typescript.jpg", path: "/playground-editor/typescript" },
    // { name: "Python", image: "/language/python.png", path: "/playground-editor/python" },
    // { name: "Java", image: "/language/java.png", path: "/playground-editor/java" },
    // { name: "C++", image: "/language/cpp.png", path: "/playground-editor/cpp" },
    // { name: "C", image: "/language/c.png", path: "/playground-editor/c" },
    // { name: "Markdown", image: "/language/markdown.png", path: "/playground-editor/markdown" },
];


const Playground = () => {
    return (
        <div className="min-h-[91dvh] w-full py-8 px-4 bg-white dark:bg-bgDark">
            <h1 className="text-center text-gray-900 dark:text-gray-100 text-3xl font-extrabold mb-10 tracking-wide">
                Choose Your Language
            </h1>
            <div className="w-full md:w-[90%] mx-auto flex justify-center gap-6 flex-wrap">
                {languages.map((language) => (
                    <Link href={language.path} key={language.name} className='w-full md:w-[30%]'>
                        <Card
                            className="w-full group relative overflow-hidden rounded-xl shadow-md border border-gray-200 dark:border-gray-700 transition-transform transform hover:scale-105 hover:shadow-lg bg-gradient-to-br from-white via-gray-100 to-gray-200 dark:from-[#1e1e1e] dark:via-[#121212] dark:to-[#2c2c2c]">
                            <CardContent className="p-6 flex flex-col items-center text-center">
                                <Image
                                    height={100}
                                    width={100}
                                    src={language.image}
                                    alt={language.name}
                                    className="w-20 h-20 mb-4 object-contain group-hover:animate-pulse"
                                />
                                <CardTitle className="text-xl font-medium text-gray-800 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-gray-100">
                                    {language.name}
                                </CardTitle>
                            </CardContent>
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-500 to-red-400 opacity-0 group-hover:opacity-10 transition-opacity"></div>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Playground;