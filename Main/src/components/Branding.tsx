import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import { siteConfig } from '../../config/site';

const Branding = () => {
    return (
        <Link href={`/`}>
            <figure className='flex gap-1 items-center cursor-pointer'>
                <Image
                    height={200}
                    width={200}
                    className="mx-auto lg:h-16 w-auto h-8"
                    src="/logo.png"
                    alt='logo'/>
                <figcaption className="font-semibold text-lg lg:text-xl">
                    <h1 className='text-base lg:text-xl'>{siteConfig.name}</h1>
                </figcaption>
            </figure>
        </Link>
    )
}

export default Branding