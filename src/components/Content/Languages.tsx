'use client'
import React from 'react'
import { Button } from '../ui/button'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
export interface I_Language {
    _id: number;
    image: string;
    title: string;
    description: string
}
const Languages = ({
    _id,
    image,
    title,
    description
}: I_Language) => {

    const isEven = _id % 2 === 0;
    const router = useRouter();
    const handleLearn = () => {
        router.push(`learn/${title}`);
    }

    return (
        <div className={`p-3 rounded-lg bg-white shadow-md dark:bg-surface-dark dark:text-white text-surface w-[94%] lg:w-[70%] mx-auto my-8 flex flex-col lg:flex-row ${isEven ? 'lg:flex-row-reverse' : ''}`}>
            <div className="relative overflow-hidden bg-cover bg-no-repeat lg:w-[40%] w-full">
                <Image
                    className={`rounded-sm w-full h-full object-contain object-center`}
                    src={image}
                    alt='image'
                    height={200}
                    width={200}
                />
            </div>
            <div className="p-6 flex justify-around flex-col lg:w-[60%] w-full">
                <h3 className="mb-2 text-4xl font-medium leading-tight text-center">
                    {title}
                </h3>
                <p className="mb-4 text-base text-gray-500">
                    {description}
                </p>
                <Button
                    variant={'outline'}
                    onClick={handleLearn}
                >Learn {title}</Button>
            </div>
        </div>
    )
}

export default Languages