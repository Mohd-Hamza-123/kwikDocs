'use client'
import gsap from 'gsap';
import React from "react";
import { Languages, Sidebar } from "..";
import { useGSAP } from '@gsap/react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaArrowCircleDown } from "react-icons/fa";
import { frameworksToLearn, languagesToLearn } from '@/components/Content/LanguagesContent';
import Link from 'next/link';
import { RxHamburgerMenu } from "react-icons/rx";
import { useTypicalContext } from '@/context/Typical-Context';

const GettingStarted = () => {
  const { isSideBarOpen, setIsSideBarOpen } = useTypicalContext()
  useGSAP(() => {
    gsap.to('#home-scroll-down', {
      y: 60,
      duration: 3,
      repeat: -1,
    });
  },
  );
  const sideBarToggle = () => {
    setIsSideBarOpen((prev) => !prev)
  }
  return (
    <div className="bg-gray-100">
      {/* Navigation Bar */}
      <div className="min-h-screen">
        <header className="bg-white shadow-md py-4">
          <div className="container mx-auto px-6 flex justify-between items-center">
            <Link href={`/`}>
              <h1 className="text-2xl font-bold text-indigo-600">MyDocs</h1>
            </Link>
            <nav className="space-x-6 flex items-center text-gray-700">
              <Link href="/quick-look" className="hover:text-indigo-500">
                Quick look
              </Link>
              <Link href="#guides" className="hover:text-indigo-500">
                Guides
              </Link>
              <Button
                variant={'outline'} className="hover:text-indigo-500 p-3"
                onClick={sideBarToggle}
              >
                <RxHamburgerMenu className='text-2xl' />
              </Button>
            </nav>
          </div>
          <Sidebar />
        </header>
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

      <h2 className='text-4xl text-center'>Coding Languages</h2>
      {languagesToLearn.map((languages) => (<Languages
        key={languages._id}
        {...languages} />))
      }

      <h2 className='text-4xl text-center'>Frameworks</h2>
      {
        frameworksToLearn.map((framework) => (<Languages
          key={framework?._id}
          {...framework} />))
      }

      {/* Footer */}
      <footer className="bg-gray-50 mt-10 py-6">
        <div className="container mx-auto text-center text-gray-600 text-sm">
          © {new Date().getFullYear()} MyDocs. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default GettingStarted;
