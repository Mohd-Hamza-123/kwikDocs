'use client'
import gsap from 'gsap';
import React from 'react'
import { useGSAP } from '@gsap/react';
import { FaArrowCircleDown } from "react-icons/fa";

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
        <div 
        id="home-scroll-down" 
        className="text-center mt-6 flex flex-col gap-2 items-center">
            <p className="text-lg z-0">Scroll Down</p>
            <FaArrowCircleDown />
        </div>
    )
}

export default WelcomeScrollDown