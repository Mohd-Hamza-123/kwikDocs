'use client'
import { cookies } from 'next/headers'
import React, { useEffect } from 'react'

const InitializationWrapper = ({ children }: any) => {

    // const cookie = cookies();
    // const token = cookie.get('token')?.value
    // console.log(token);

    useEffect(() => {
        
    }, []);

    return (
        <>{children}</>
    )
}

export default InitializationWrapper