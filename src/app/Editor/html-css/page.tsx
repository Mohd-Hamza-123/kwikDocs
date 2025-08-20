'use client'
import { toast } from '@/hooks/use-toast';
import { css } from '@codemirror/lang-css';
import { html } from '@codemirror/lang-html';
import { svgIcons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { EditorState } from '@codemirror/state';
import sanitizeHtml from '@/utils/Sanitize-html';
import { useAppSelector } from '@/lib/hooks/hooks';
import { CODE_SNIPPETS, Themes } from '@/constant';
import injectCssIntoHtml from '@/utils/InjectCssIntoHtml';
import copyToClipBoard from '@/utils/copyToClipboard';
import createEmmetKeyMap from '@/components/Code-Editor/HTML/Emmet';
import React, { useCallback, useEffect, useState, useRef } from 'react'
import { EditorView, highlightActiveLine, keymap } from '@codemirror/view';
import { autocompletion, closeBracketsKeymap, completionKeymap , closeBrackets } from '@codemirror/autocomplete';
import CodeMirrorThemeDropdown from '@/components/Code-Editor/CodeMirrorThemeDropdown';
import {
    history,
    defaultKeymap,
    historyKeymap
} from '@codemirror/commands';
import { createCssPropertyKeyMap } from '@/utils/codeMirror/automaticClose';


const Page = () => {


    const isCodeEditable = true
    const editor = useRef<HTMLDivElement>(null)
    const cssEditor = useRef<HTMLDivElement>(null)
    const outputRef = useRef<HTMLDivElement>(null)
    const htmlViewRef = useRef<EditorView | null>(null)
    const [outputToggle, setOutputToggle] = useState(false)
    const [cssCode, setCssCode] = useState(CODE_SNIPPETS?.css)
    const [htmlCode, setHtmlCode] = useState(CODE_SNIPPETS?.html)
    // console.log(htmlCode)

    const theme = useAppSelector((state) => state.editorSlice.theme)

    const htmlState = () => {
        if (!editor.current) return
        const state = EditorState.create({
            doc: htmlCode,
            extensions: [
                html(),
                Themes[theme],
                history(),
                autocompletion(),
                highlightActiveLine(),
                keymap.of([
                    ...defaultKeymap,
                    ...historyKeymap,
                    ...completionKeymap,
                    ...closeBracketsKeymap,
                    createEmmetKeyMap('html'),
                ]),
                EditorState.readOnly.of(!isCodeEditable),
                EditorView.updateListener.of((update) => {
                    const html = update.state.doc?.toString()
                    setHtmlCode(html)
                }),
                EditorView.theme({
                    "&": {
                        height: "100%",
                        width: "100%"
                    },
                }),
            ]
        })

        const HtmlView = new EditorView({
            state,
            parent: editor.current,
        });
        htmlViewRef.current = HtmlView
        return HtmlView
    }
    const cssState = () => {
        if (!cssEditor.current) return

        const cssState = EditorState.create({
            doc: cssCode,
            extensions: [
                css(),
                Themes[theme],
                history(),
                createCssPropertyKeyMap(),
                closeBrackets(),
                autocompletion(),
                highlightActiveLine(),
                keymap.of([
                    ...defaultKeymap,
                    ...historyKeymap,
                    ...completionKeymap,
                     ...closeBracketsKeymap,
                    createEmmetKeyMap('css'),
                ]),
                EditorState.readOnly.of(!isCodeEditable),
                EditorView.updateListener.of((update) => {
                    // console.log(update)
                    // console.log(update.docChanged)
                    // console.log(update.state.doc?.toString()) // how ? 
                    setCssCode(update.state.doc?.toString())
                }),
                EditorView.theme({
                    "&": {
                        height: "100%",
                        width: "100%"
                    },
                }),
            ]
        })



        const cssView = new EditorView({
            state: cssState,
            parent: cssEditor.current,
        });

        return cssView
    }


    useEffect(() => {

        const htmlView = htmlState()
        const cssView = cssState()

        return () => {
            if (htmlView) htmlView.destroy()
            if (cssView) cssView.destroy()
        }
    }, [theme])


    const executeCode = () => {
        try {
            const sanitizedHtml = sanitizeHtml(htmlCode)
            setHtmlCode(sanitizedHtml)
            if (htmlViewRef.current) {
                htmlViewRef.current.dispatch({
                    changes: {
                        from: 0,
                        to: htmlViewRef.current.state.doc.length,
                        insert: sanitizedHtml,
                    }
                })
            }

            const iframe = document.createElement('iframe')
            iframe.style.width = "100%"
            iframe.style.height = "100%"
            const finalHtmlCode = injectCssIntoHtml(sanitizedHtml, cssCode)
            iframe.srcdoc = finalHtmlCode
            // console.log(finalHtmlCode)
            if (outputRef.current) {
                outputRef.current.innerHTML = ''
                outputRef.current.appendChild(iframe)
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
                className='w-full h-[80dvh] rounded-md shadow-md relative overflow-y-scroll'>
            </div>
            <div
                ref={cssEditor}
                className='w-full h-[80dvh] rounded-md shadow-md relative overflow-y-scroll'>
            </div>

            <div className="flex justify-end items-center gap-2">
                <svgIcons.copy
                    onClick={() => copyToClipBoard(htmlCode)} className="h-8 w-8 fill-gray-500 cursor-pointer hover:fill-blue-400 border border-gray-500 p-1 rounded-sm" />
                <CodeMirrorThemeDropdown />
                <Button
                    variant='outline'
                    onClick={executeCode}
                    className="px-4 py-2 font-medium rounded-md transition-all">
                    Run Code
                </Button>
            </div>
            <div
                ref={outputRef}
                className={`${outputToggle ? "block" : "hidden"} w-full mt-4 border rounded-md h-[250px] overflow-auto bg-white`}>
            </div>

        </div>
    )
}

export default Page