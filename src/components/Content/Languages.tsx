import React from 'react'
import { Button } from '../ui/button'
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

    return (
        <div className={`p-3 rounded-lg bg-white shadow-md dark:bg-surface-dark dark:text-white text-surface w-[94%] lg:w-[70%] mx-auto my-8 flex flex-col lg:flex-row ${isEven ? 'lg:flex-row-reverse' : ''}`}>
            <div className="relative overflow-hidden bg-cover bg-no-repeat lg:w-[40%] w-full">
                <img
                    className={`w-full h-full object-contain object-center`}
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
                <Button variant={'outline'}>Learn {title}</Button>
            </div>
        </div>
    )
}

export default Languages