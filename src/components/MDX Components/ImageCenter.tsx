import React, { ReactNode } from 'react'
import Image from 'next/image';

interface ImageCenterProps {
    src: string;
    alt: string;
    className?: string;
}

const ImageCenter: React.FC<ImageCenterProps> = ({
    src = "",
    alt = "",
    className = "",
    ...props
}) => {
    return (
        <div className='flex justify-center w-full'>
            <figure>
                <Image
                    src={src}
                    alt={alt}
                    width={400}
                    height={100}
                    className={`h-auto rounded-md ${className}`}
                    {...props} />
                    <figcaption className="text-center">{alt}</figcaption>
            </figure>
        </div>
    )
}

export default ImageCenter
