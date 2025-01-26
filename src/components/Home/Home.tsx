'use client'
import gsap from 'gsap';
import React from "react";
import { useGSAP } from '@gsap/react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaArrowCircleDown } from "react-icons/fa";

const Home = () => {

    useGSAP(() => {
        gsap.to('#home-scroll-down', {
            y: 55,
            duration: 3,
            repeat: -1,
        });
    },
    );
    return (
        <div className="bg-gray-100 dark:bg-bgDark h-[88vh] flex flex-col justify-center items-center">

            <div className="bg-white dark:bg-containerDark dark:border-gray-700 shadow-lg lg:mx-auto mx-3 max-w-4xl rounded-lg p-4 lg:p-8 text-center w-[95%] lg:w-2/3 h-[57%] flex flex-col justify-around">
                <h2 className="text-2xl lg:text-4xl font-extrabold text-gray-800 dark:text-white mb-4">
                    Learn to Code
                </h2>
                <p className="text:md lg:text-lg text-gray-600 dark:text-gray-300 mb-6">
                    With the best guides and resources for developers.
                </p>
                <form className="relative max-w-md mx-auto flex gap-2">
                    <Input />
                    <Button variant="outline">Search</Button>
                </form>
                <p className="mt-4 text-indigo-600 font-medium text-sm lg:text:md">
                    Not Sure Where To Begin?
                </p>
            </div>

            <div id="home-scroll-down" className="text-center mt-8 flex flex-col gap-2 items-center">
                <p className="text-lg">Scroll Down</p>
                <FaArrowCircleDown />
            </div>

        </div>
    )
}

export default Home