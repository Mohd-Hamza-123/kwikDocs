'use client'
import React from 'react'

const Error = ({ error }: any) => {
    console.log(error?.message)
    return (
        <p>Something Went wrong</p>
    )
}

export default Error