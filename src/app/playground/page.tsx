import React from 'react';
import Image from 'next/image';
import { 
    Card, 
    CardContent, 
    CardTitle 
} from "@/components/ui/card";

const languages = [
    { name: "HTML, CSS & JavaScript", image: "/language/web.png" },
    { name: "JavaScript", image: "/language/javascript.jpg" },
    { name: "TypeScript", image: "/language/typescript.jpg" },
    { name: "Python", image: "/language/python.png" },
    { name: "Java", image: "/language/java.png" },
    { name: "C++", image: "/language/cpp.png" },
    { name: "C", image: "/language/c.png" },
];

const Playground = () => {
    return (
        <div className="min-h-screen p-8 bg-white dark:bg-bgDark">
            <h1 className="text-center text-gray-900 dark:text-gray-100 text-4xl font-extrabold mb-10 tracking-wide">
                Choose Your Language
            </h1>
            <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {languages.map((language) => (
                    <Card
                        key={language.name}
                        className="group relative overflow-hidden rounded-xl shadow-md border border-gray-200 dark:border-gray-700 transition-transform transform hover:scale-105 hover:shadow-lg bg-gradient-to-br from-white via-gray-100 to-gray-200 dark:from-[#1e1e1e] dark:via-[#121212] dark:to-[#2c2c2c]"
                    >
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
                ))}
            </div>
        </div>
    );
};

export default Playground;