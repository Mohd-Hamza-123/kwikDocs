'use client'
import React, { useCallback, useEffect, useState } from 'react'
import { EditorState } from '@codemirror/state';
import { EditorView, highlightActiveLine, keymap } from '@codemirror/view';
import { html } from '@codemirror/lang-html';
import { CODE_SNIPPETS, Themes } from '@/constant';
import {
    history,
    defaultKeymap,
    historyKeymap
} from '@codemirror/commands';
import { toast } from '@/hooks/use-toast';
import CodeMirrorThemeDropdown from '../Code-Editor/CodeMirrorThemeDropdown';
import { svgIcons } from '../icons';
import copyToClipBoard from '@/utils/copyToClipboard';
import { useAppSelector } from '@/lib/hooks/hooks';
import { Button } from '../ui/button';

const HtmlEditor = ({ defaultCode = "", isCodeEditable = true }: { defaultCode: string, isCodeEditable?: boolean }) => {

    const theme = useAppSelector((state) => state.editorSlice.theme)
    const [code, setCode] = useState(defaultCode || CODE_SNIPPETS?.html)
    const [outputToggle, setOutputToggle] = useState(false)
    const editor = React.useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!editor.current) return
        const state = EditorState.create({
            doc: code,
            extensions: [
                html(),
                Themes[theme],
                highlightActiveLine(),
                history(),
                EditorState.readOnly.of(!isCodeEditable),
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
    }, [theme])

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

        <div className='w-full flex flex-col gap-4 p-4 poppins'>

            <div
                ref={editor}
                className='w-full h-[325px] rounded-md shadow-md relative'>
                <div className='absolute top-2 right-2 z-10'>
                    <svgIcons.copy
                        onClick={() => copyToClipBoard(code)} className="h-6 w-6 fill-gray-500 cursor-pointer hover:fill-blue-400 mb-4 border border-gray-500 p-1 rounded-sm" />
                    <CodeMirrorThemeDropdown />
                </div>
            </div>

            <div className="flex justify-end">
                <Button
                    variant='outline'
                    onClick={executeCode}
                    className="px-4 py-2 font-medium rounded-md transition-all">
                    Run Code
                </Button>
            </div>
            <div
                id="output"
                className={`${outputToggle ? "block" : "hidden"} w-full mt-4 border rounded-md bg-gray-100 h-[250px] overflow-auto`}>
            </div>

        </div>
    )
}

export default HtmlEditor