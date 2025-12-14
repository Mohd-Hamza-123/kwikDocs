import React from 'react'
import { ImSpinner3 } from "react-icons/im";

export default function ButtonSpinner({className}: {className?: string}) {
    return (
        <ImSpinner3 className={`animate-spin ${className}`} />
    )
}
