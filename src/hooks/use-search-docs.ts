import React from 'react'

export default function useSearchDocs() {

    const searchDocs = (search: string) => {
        console.log(search)
        return search
    }

    return {
        searchDocs
    }
}


