'use client'
import React, { useEffect, useRef } from 'react'
import Editor from '@monaco-editor/react'
import { CODE_SNIPPETS } from '@/constant'
import type { OnMount, BeforeMount } from '@monaco-editor/react'
import type * as monacoType from "monaco-editor";
import { emmetHTML } from 'emmet-monaco-es'

const Page = () => {
    const defaultValue = CODE_SNIPPETS.html
    const disposeRef = useRef<null | (() => void)>(null)
    const editorRef = useRef<any>(null)

    const beforeMount: BeforeMount = (monaco) => {
        disposeRef.current = emmetHTML(monaco, ['html'])
        editorRef.current = monaco // save editor instance
    }

    const handleMount: OnMount = (editor, monaco) => {
        // editor.updateOptions({...}) is the API for changing the configuration of the Monaco Editor after it has been created.
        editor.updateOptions({
            // quickSuggestions → controls when suggestions pop up automatically:
            // other: true → show in normal code 
            // comments: false → don’t show inside comments 
            // strings: true → show inside strings
            quickSuggestions: { other: true, comments: false, strings: true },
            // wordBasedSuggestions: false → disables random word suggestions from the document (only use your custom completions or language server).
            wordBasedSuggestions: 'off',
            // suggestOnTriggerCharacters: true → automatically show suggestions when you type special trigger characters (., <, ", etc.) instead of only on Ctrl+Space.
            suggestOnTriggerCharacters: true,
            // optional extras:
            // tabCompletion: "on",
            // snippetSuggestions: "inline",
            fontSize: 16,
            lineNumbers: 'on',
            readOnly: false,
            minimap: {
                // minimap is that tiny preview of your code shown on the right-hand side
                enabled: true,
            },
            automaticLayout: true,
            // autoClosingBrackets : true,
            // autoClosingComments : true,
        });
    }


    const handleChange = (value: string | undefined) => {
        console.log(value)
    }

    const handleGetValue = () => {
        const value = editorRef.current?.getValue()
        console.log("Editor value:", value)
    }

    useEffect(() => {
        return () => {
            disposeRef.current?.()
        }
    }, [])

    return (
        <>
            <Editor
                height={400}
                theme='vs-dark'
                onMount={handleMount}
                defaultLanguage="html"
                onChange={handleChange}
                beforeMount={beforeMount}
                defaultValue={defaultValue}
            />
        </>
    )
}

export default Page