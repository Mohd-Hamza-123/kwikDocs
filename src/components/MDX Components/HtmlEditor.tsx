'use client'
import React, { useCallback, useEffect, useState } from 'react'
import { EditorState } from '@codemirror/state';
import { EditorView, highlightActiveLine, keymap } from '@codemirror/view';
import { html } from '@codemirror/lang-html';
import { oneDark } from '@codemirror/theme-one-dark';
import { CODE_SNIPPETS } from '@/constant';
import {
    history,
    defaultKeymap,
    historyKeymap
} from '@codemirror/commands';
import { toast } from '@/hooks/use-toast';

const HtmlEditor = ({ defaultCode = "" }: { defaultCode: string }) => {

    const [code, setCode] = useState(defaultCode || CODE_SNIPPETS?.html)
    const [outputToggle, setOutputToggle] = useState(false)
    const editor = React.useRef<HTMLDivElement>(null)

    console.log(code)
    useEffect(() => {
        if (!editor.current) return
        const state = EditorState.create({
            doc: code,
            extensions: [
                html(),
                oneDark,
                highlightActiveLine(),
                EditorView.updateListener.of((update) => {
                    // console.log(update)
                    // console.log(update.docChanged)
                    // console.log(update.state.doc?.toString()) // how ? 
                    setCode(update.state.doc?.toString())

                }),
                keymap.of([...defaultKeymap, ...historyKeymap]),
                EditorView.theme({
                    "&": {
                        height: "100%",
                        width: "100%%"
                    },
                }),
            ]
        })

        const view = new EditorView({
            state,
            parent: editor.current,
        });
        return () => view.destroy()
    }, [])

    const executeCode = useCallback(() => {
        try {
            const iframe = document.createElement('iframe')
            iframe.style.width = "100%"
            iframe.style.height = "100%"
            iframe.srcdoc = code
            const output = document.getElementById('output')
            if (output) {
                output.innerHTML = ''
                output.appendChild(iframe)
                setOutputToggle(true)
            }
        } catch (error: any) {
            console.log(error)
            setOutputToggle(false)
            toast({
                title: 'Error',
                variant: 'destructive',
                description: error?.message || "Something went wrong",
            })
        }

    }, [code])

    return (

        <div className='w-full flex flex-col gap-4 p-4'>
            {/* Editor Section */}
            <div
                ref={editor}
                className='w-full h-[325px] border border-gray-300 rounded-md shadow-md'>
            </div>

            <div className="flex justify-end">
                <button
                    onClick={executeCode}
                    className="px-4 py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 transition-all">
                    Run Code
                </button>
            </div>

            {/* Output Section */}
            <div
                id="output"
                className={`${outputToggle ? "block" : "hidden"} w-full mt-4 border rounded-md bg-gray-100 p-4 h-[250px] overflow-auto`}>
            </div>

        </div>
    )
}

export default HtmlEditor