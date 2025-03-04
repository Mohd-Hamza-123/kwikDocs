'use client'
import React, { useRef } from 'react'
import Spinner from '../Spinner/Spinner';
import Editor, { DiffEditor, useMonaco, loader } from '@monaco-editor/react';

export default function CodeEditor({ activeLanguage, codeValue }: { activeLanguage: string, codeValue: string }) {
    const editorRef = useRef(null);

    const onMount = (editor: any) => {
        editorRef.current = editor;
        editor.focus()
    }

    return (
        <Editor
            height="70vh"
            width='50vw'
            theme='vs-dark'
            // defaultLanguage={activeLanguage.toLowerCase()}
            language={activeLanguage.toLowerCase()}
            defaultValue="// some comment"
            value={codeValue}
            onMount={onMount}
            loading={<Spinner />}
            options={{
                fontSize: 20
            }}
        />
    )
}
