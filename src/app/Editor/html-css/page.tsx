'use client'
import { svgIcons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { EditorState } from '@codemirror/state';
import { useAppSelector } from '@/lib/hooks/hooks';
import { CODE_SNIPPETS, Themes } from '@/constant';
import copyToClipBoard from '@/utils/copyToClipboard';
import createEmmetKeyMap from '@/components/Code-Editor/HTML/Emmet';
import React, { useCallback, useEffect, useState, useRef } from 'react'
import { EditorView, highlightActiveLine, keymap } from '@codemirror/view';
import { autocompletion, completionKeymap } from '@codemirror/autocomplete';
import CodeMirrorThemeDropdown from '@/components/Code-Editor/CodeMirrorThemeDropdown';
import {
    history,
    defaultKeymap,
    historyKeymap
} from '@codemirror/commands';
import sanitizeHtml from '@/utils/Sanitize-html';

const Page = ({
    defaultCode = "",
    isCodeEditable = true,
    id = 0,
}: { defaultCode: any, isCodeEditable?: any, id: any }) => {
    // console.log(defaultCode)
    const theme = useAppSelector((state) => state.editorSlice.theme)
    const [code, setCode] = useState(defaultCode || CODE_SNIPPETS?.html)
    const [outputToggle, setOutputToggle] = useState(false)
    const editor = useRef<HTMLDivElement>(null)
    const cssEditor = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!editor.current) return
        if (!cssEditor.current) return

        const state = EditorState.create({
            doc: code,
            extensions: [
                html(),
                css(),
                Themes[theme],
                history(),
                autocompletion(),
                highlightActiveLine(),
                keymap.of([
                    ...defaultKeymap,
                    ...historyKeymap,
                    ...completionKeymap,
                    // ...closeBracketsKeymap,
                    createEmmetKeyMap('html'),
                    createEmmetKeyMap('css'),
                ]),
                EditorState.readOnly.of(!isCodeEditable),
                EditorView.updateListener.of((update) => {
                    // console.log(update)
                    // console.log(update.docChanged)
                    // console.log(update.state.doc?.toString()) // how ? 
                    setCode(update.state.doc?.toString())
                }),
                EditorView.theme({
                    "&": {
                        height: "100%",
                        width: "100%%"
                    },
                }),
            ]
        })
        const cssState = EditorState.create({
            doc: code,
            extensions: [
                html(),
                css(),
                Themes[theme],
                history(),
                autocompletion(),
                highlightActiveLine(),
                keymap.of([
                    ...defaultKeymap,
                    ...historyKeymap,
                    ...completionKeymap,
                    // ...closeBracketsKeymap,
                    createEmmetKeyMap('html'),
                    createEmmetKeyMap('css'),
                ]),
                EditorState.readOnly.of(!isCodeEditable),
                EditorView.updateListener.of((update) => {
                    // console.log(update)
                    // console.log(update.docChanged)
                    // console.log(update.state.doc?.toString()) // how ? 
                    setCode(update.state.doc?.toString())
                }),
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
        const cssView = new EditorView({
            state : cssState,
            parent: cssEditor.current,
        });

        return () => {
            view.destroy()
            cssView.destroy()
        }
    }, [theme])

    const executeCode = () => {
        try {
            const iframe = document.createElement('iframe')
            iframe.style.width = "100%"
            iframe.style.height = "100%"
            sanitizeHtml(code)
            console.log(code)

            iframe.srcdoc = code

            const output = document.getElementById(`output${id ? id : 0}`)
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
    }

    return (

        <div className='w-full flex flex-col gap-4 p-4 poppins'>

            <div
                ref={editor}
                className='w-full min-h-[80px] max-h-[325px] rounded-md shadow-md relative overflow-y-scroll'>
            </div>
            <div
                ref={cssEditor}
                className='w-full min-h-[80px] max-h-[325px] rounded-md shadow-md relative overflow-y-scroll'>
            </div>

            <div className="flex justify-end items-center gap-2">
                <svgIcons.copy
                    onClick={() => copyToClipBoard(code)} className="h-8 w-8 fill-gray-500 cursor-pointer hover:fill-blue-400 border border-gray-500 p-1 rounded-sm" />
                <CodeMirrorThemeDropdown />
                <Button
                    variant='outline'
                    onClick={executeCode}
                    className="px-4 py-2 font-medium rounded-md transition-all">
                    Run Code
                </Button>
            </div>
            <div
                id={`output${id ? id : 0}`}
                className={`${outputToggle ? "block" : "hidden"} w-full mt-4 border rounded-md bg-gray-100 h-[250px] overflow-auto`}>
            </div>

        </div>
    )
}

export default Page