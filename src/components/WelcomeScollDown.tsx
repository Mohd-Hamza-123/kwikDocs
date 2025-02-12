'use client'
import React from 'react'
import { FaArrowCircleDown } from "react-icons/fa";
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
const WelcomeScrollDown = () => {

    useGSAP(() => {
        gsap.to('#home-scroll-down', {
            y: 55,
            duration: 3,
            repeat: -1,
        });
    },
    );

    return (
        <div id="home-scroll-down" className="text-center mt-8 flex flex-col gap-2 items-center">
            <p className="text-lg">Scroll Down</p>
            <FaArrowCircleDown />
        </div>
    )
}

export default WelcomeScrollDown