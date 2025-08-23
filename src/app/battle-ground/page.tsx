'use client'
import React from 'react'
import Editor from '@monaco-editor/react'
import { CODE_SNIPPETS } from '@/constant'


const Page = () => {
    const defaultValue = CODE_SNIPPETS.html
    const handleMount = (editor: any, monaco: any) => {
        editor.updateOptions({
            quickSuggestions: { other: true, comments: false, strings: true },
            wordBasedSuggestions: false,
            suggestOnTriggerCharacters: true,
        });
    }
    return (
        <>
            <Editor
                height={400}
                defaultLanguage="html"
                defaultValue={defaultValue}
                theme='vs-dark'
                onMount={handleMount}
            />
        </>
    )
}

export default Page