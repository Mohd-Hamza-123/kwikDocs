'use client'
import gsap from 'gsap';
import React from "react";
import { Technologies } from "../../";
import { useGSAP } from '@gsap/react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaArrowCircleDown } from "react-icons/fa";
import { frameworksToLearn, languagesToLearn } from '@/components/Content/LanguagesContent';
import { useQuery } from '@tanstack/react-query';
import { getAllTechnology } from '@/lib/API/techAPI/getAllTech';

const Home = () => {
    useGSAP(() => {
        gsap.to('#home-scroll-down', {
            y: 60,
            duration: 3,
            repeat: -1,
        });
    },
    );
    return (
        <div className="bg-gray-100">
            <div className="min-h-screen">
                <div className="bg-white shadow-lg mx-auto mt-16 max-w-4xl rounded-lg p-8 text-center">
                    <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
                        Learn to Code
                    </h1>
                    <p className="text-lg text-gray-600 mb-6">
                        With the best guides and resources for developers.
                    </p>
                    <form className="relative max-w-md mx-auto flex gap-2">
                        <Input />
                        <Button variant="outline">Search</Button>
                    </form>
                    <p className="mt-4 text-indigo-600 font-medium">
                        Not Sure Where To Begin?
                    </p>
                </div>

                <div id="home-scroll-down" className="text-center mt-10 flex flex-col gap-2 items-center">
                    <p className="text-lg">Scroll Down</p>
                    <FaArrowCircleDown />
                </div>
            </div>


            <Technologies />

            <footer className="bg-gray-50 mt-10 py-6">
                <div className="container mx-auto text-center text-gray-600 text-sm">
                    © {new Date().getFullYear()} MyDocs. All rights reserved.
                </div>
            </footer>
        </div>
    )
}

export default Home