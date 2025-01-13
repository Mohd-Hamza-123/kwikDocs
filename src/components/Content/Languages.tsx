'use client'
import React from 'react'
import { Button } from '../ui/button'
import { LoadingPage } from '@/index';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { useAppDispatch } from '@/lib/hooks/hooks';
import { setDoc } from '@/lib/store/features/docsSlice';
import { getAllTechnology } from '@/lib/API/techAPI/getAllTech';

export interface I_Image {
    public_id: string;
    secure_url: string;
}
export interface I_Language {
    _id: string;
    name: string;
    image: I_Image;
    techType: string;
    description: string
}

const Technologies = () => {

    const router = useRouter();
    const dispatch = useAppDispatch();

    const {
        data: technology = [],
        error: technologyError,
        isPending: technologyPending,
        isSuccess: technologySuccess,
        isFetching: technologyFetching,
        refetch
    } = useQuery({
        queryKey: ['technologies'],
        queryFn: getAllTechnology,
        staleTime: Infinity,
    });

    if (technologyPending) return <LoadingPage />

    const handleLearn = (techId: string) => {
        router.push(`/read-doc/${techId}`);
        dispatch(setDoc({ document: null }));
    }

    return (
        <div className='dark:bg-bgDark'>
            {technology?.map((techObj: any) => {
                return <section
                    key={techObj?.techType}>
                    <h1 className='text-2xl lg:text-3xl text-center capitalize font-cursive'>{techObj?.techType}
                    </h1>
                    {techObj?.technologies?.map((tech: any, index: number) => (
                        <div key={tech?._id + index} className={`dark:bg-containerDark rounded-lg bg-white shadow-md my-6 dark:text-white p-5 w-[94%] lg:w-[70%] mx-auto flex flex-col lg:flex-row ${(index + 1) % 2 === 0 ? 'lg:flex-row-reverse' : ''}`}>
                            <div className="relative overflow-hidden bg-cover bg-no-repeat lg:w-[40%] w-full">
                                <img
                                    className={`rounded-sm w-full h-full object-contain object-center`}
                                    src={tech?.image?.secure_url}
                                    alt='image'
                                    height={200}
                                    width={200}

                                />
                            </div>
                            <div className="flex justify-around flex-col lg:w-[60%] w-full p-3">
                                <h3 className="mb-2 text-2xl lg:text-3xl font-medium leading-tight text-center">
                                    {tech?.name}
                                </h3>
                                <p className="mb-4 text-base text-gray-500 text-justify">
                                    {tech?.description}
                                </p>
                                <Button
                                    variant={'outline'}
                                    onClick={() => handleLearn(tech?._id)}
                                >Learn {tech?.name}</Button>
                            </div>
                        </div>
                    ))}
                </section>
            })}
        </div>
    )
}

export default Technologies