'use client'
import './page.css'
import { toast } from '@/hooks/use-toast';
import { css } from '@codemirror/lang-css';
import { html } from '@codemirror/lang-html';
import { svgIcons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { EditorState } from '@codemirror/state';
import sanitizeHtml from '@/utils/Sanitize-html';
import { useAppSelector } from '@/lib/hooks/hooks';
import { CODE_SNIPPETS, Themes } from '@/constant';
import copyToClipBoard from '@/utils/copyToClipboard';
import injectCssIntoHtml from '@/utils/InjectCssIntoHtml';
import createEmmetKeyMap from '@/components/Code-Editor/HTML/Emmet';
import React, { useCallback, useEffect, useState, useRef } from 'react'
import { EditorView, highlightActiveLine, keymap } from '@codemirror/view';
import { createCssPropertyKeyMap } from '@/utils/codeMirror/automaticClose';
import { autocompletion, closeBracketsKeymap, completionKeymap, closeBrackets } from '@codemirror/autocomplete';
import CodeMirrorThemeDropdown from '@/components/Code-Editor/CodeMirrorThemeDropdown';
import {
    history,
    defaultKeymap,
    historyKeymap
} from '@codemirror/commands';


const Page = () => {

    const isCodeEditable = true
    const editor = useRef<HTMLDivElement>(null)
    const cssEditor = useRef<HTMLDivElement>(null)
    const outputRef = useRef<HTMLDivElement>(null)
    const htmlViewRef = useRef<EditorView | null>(null)
    const [visible, setVisible] = useState<'html' | 'css' | 'output'>('html')
    const [outputToggle, setOutputToggle] = useState(false)
    const [cssCode, setCssCode] = useState(CODE_SNIPPETS?.css)
    const [htmlCode, setHtmlCode] = useState(CODE_SNIPPETS?.html)
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
            setVisible('output')
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
        <div className='w-full flex flex-col lg:flex-row gap-4 p-4 poppins'>

            <div id='playground-editor-html-css-navigation' className="flex flex-row lg:flex-col justify-center items-center gap-5 p-2 rounded-xl shadow-md sticky top-0 bg-black/40 backdrop-blur-md border border-gray-700 overflow-x-scroll">
                <Button
                    onClick={() => setVisible('html')}
                    variant={visible === 'html' ? 'default' : 'secondary'}
                    className="flex items-center gap-2">
                    <svgIcons.html className="w-7 h-7" />
                </Button>
                <Button
                    variant={visible === 'css' ? 'default' : 'secondary'}
                    className="flex items-center gap-2"
                    onClick={() => setVisible('css')}>
                    <svgIcons.css className="w-7 h-7" />
                </Button>
                <Button
                    variant={visible === 'output' ? 'outline' : 'secondary'}
                    onClick={executeCode}
                    className="px-4 py-2 flex items-center gap-2 font-semibold bg-green-500 hover:bg-green-600 text-white rounded-lg shadow-lg">
                    <svgIcons.play className="w-7 h-7" />
                </Button>
                <CodeMirrorThemeDropdown triggerType="button" />
            </div>

            <section className='w-full'>
                <div
                    ref={editor}
                    className={`w-full h-[80dvh] rounded-md shadow-md relative overflow-y-scroll ${visible === 'html' ? 'block' : 'hidden'}`}>
                    <svgIcons.copy
                        onClick={() => copyToClipBoard(htmlCode)}
                        className="h-9 w-9 bg-gray-800 text-gray-300 hover:text-blue-400 hover:bg-gray-700 cursor-pointer p-2 rounded-full absolute top-3 right-3 shadow-md transition z-10"
                    />
                </div>
                <div
                    ref={cssEditor}
                    className={`w-full h-[80dvh] rounded-md shadow-md relative overflow-y-scroll ${visible === 'css' ? 'block' : 'hidden'}`}>
                    <svgIcons.copy
                        onClick={() => copyToClipBoard(cssCode)}
                        className="h-9 w-9 bg-gray-800 text-gray-300 hover:text-blue-400 hover:bg-gray-700 cursor-pointer p-2 rounded-full absolute top-3 right-3 shadow-md transition z-10"
                    />
                </div>
                <div
                    ref={outputRef}
                    className={`${outputToggle ? "block" : "hidden"} w-full border rounded-md h-[80dvh] overflow-auto bg-white ${visible === 'output' ? 'block' : 'hidden'}`}>
                </div>
            </section>
        </div>
    )
}

export default Page