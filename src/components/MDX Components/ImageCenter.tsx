import React from 'react'
import Image from 'next/image';

interface ImageCenterProps {
    src: string;
    alt: string;
    className: string;
}

const ImageCenter: React.FC<ImageCenterProps> = ({ src, alt = 'Image', className = "", ...props }) => {
    return (
        <div className={`flex justify-center w-full`}>
            <Image
                className={`h-auto rounded-md ${className}`}
                {...props}
                src={src}
                alt={alt}
                quality={100}
                height={200}
                width={400}
            />
        </div>
    )
}

export default ImageCenter
