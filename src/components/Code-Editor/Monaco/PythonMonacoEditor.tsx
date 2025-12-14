'use client'
import React from 'react'
import Editor from '@monaco-editor/react'
import { CODE_SNIPPETS } from '@/constant'

export default function PythonMonacoEditor() {

    const defaultValue = CODE_SNIPPETS.python

    return (
        <div className='h-[80dvh] w-full'>
            <Editor
                height="100%"
                theme='vs-dark'
                defaultLanguage='python'
                defaultValue={defaultValue}
            />
        </div>
    )
}
