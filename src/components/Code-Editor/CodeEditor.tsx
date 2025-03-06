'use client'
import React, { useRef } from 'react'
import Spinner from '../Spinner/Spinner';
import Editor, { DiffEditor, useMonaco, loader } from '@monaco-editor/react';

export default function CodeEditor({ activeLanguage, codeValue, setCodeValue }: { activeLanguage: string, codeValue: string, setCodeValue: any }) {
    const editorRef = useRef(null);
    console.log(codeValue)

    const onChange = (value: string | undefined) => {
        if (value === undefined) return
        setCodeValue(value)
    }

    const onMount = (editor: any) => {
        editorRef.current = editor;
        editor.focus()
    }

    return (
        <Editor
            height="50vh"
            width='50vw'
            theme='vs-dark'
            // defaultLanguage={activeLanguage.toLowerCase()}
            language={activeLanguage.toLowerCase()}
            defaultValue=""
            value={codeValue}
            onMount={onMount}
            onChange={(value) => onChange(value)}
            loading={<Spinner />}
            options={{
                fontSize: 20
            }}
        />
    )
}
