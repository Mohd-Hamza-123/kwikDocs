'use client'
import dynamic from 'next/dynamic'
import { toast } from '@/hooks/use-toast';
// import { JavaScriptTerminal } from '@/index';
import { svgIcons } from '@/components/icons';
import sanitizeHtml from '@/utils/Sanitize-html';
import { useAppDispatch } from '@/lib/hooks/hooks';
import React, { useState, useRef, useEffect } from 'react';
import { addJavaScriptLogs, clearJavaScriptLogs } from '@/lib/store/features/logsSlice';
import injectCssAndJavascriptIntoHtml from '@/utils/InjectCssIntoHtml';
const JavaScriptTerminal = dynamic(() => import('@/index').then(mod => mod.JavaScriptTerminal), { ssr: false })
const HtmlMonacoEditor = dynamic(() => import('@/components/Code-Editor/Monaco/HtmlMonacoEditor'), { ssr: false })
const CssMonacoEditor = dynamic(() => import('@/components/Code-Editor/Monaco/CssMonacoEditor'), { ssr: false })
const JavascriptMonacoEditor = dynamic(() => import('@/components/Code-Editor/Monaco/JavascriptMonacoEditor'), { ssr: false })


const Page = () => {

    const dispatch = useAppDispatch()

    const cssRef = useRef<any>(null)
    const htmlRef = useRef<any>(null)
    const javascriptRef = useRef<any>(null)
    const outputRef = useRef<HTMLDivElement>(null)
    const [outputToggle, setOutputToggle] = useState(false)
    const [visible, setVisible] = useState<'html' | 'css' | 'javascript' | 'output' | 'terminal'>('html')

    const executeCode = () => {
        try {
            dispatch(clearJavaScriptLogs())
            const htmlCode = htmlRef.current?.getValue?.() ?? ''
            const cssCode = cssRef.current?.getValue?.() ?? ''
            const javascriptCode = javascriptRef.current?.getValue() ?? ''

            setVisible('output')
            const sanitizedHtml = sanitizeHtml(htmlCode)

            const iframe = document.createElement('iframe')
            iframe.sandbox = "allow-scripts allow-forms"
            // iframe.referrerPolicy = 'no-referrer'

            iframe.style.width = "100%"
            iframe.style.height = "100%"
            const finalHtmlCode = injectCssAndJavascriptIntoHtml(sanitizedHtml, cssCode, javascriptCode)
            // iframe.srcdoc = finalHtmlCode
            const encodeFinalHtml = encodeURIComponent(finalHtmlCode)
            iframe.src = `https://kwikdocs-preview.vercel.app/render?finalHtml=${encodeFinalHtml}`


            if (outputRef.current) {
                outputRef.current.innerHTML = ''
                outputRef.current.appendChild(iframe)
                setOutputToggle(true)
            }

        } catch (error: unknown) {
            if (error instanceof Error) {
                toast({
                    title: 'Error',
                    variant: 'destructive',
                    description: error?.message || "Something went wrong",
                })
                console.log(error.message)
            }
            setOutputToggle(false)
        }
    }

    const handler = (event: MessageEvent) => {
        if (event.data.type === 'iframe-console') {
            const log = {
                type: event.data.logType,
                value: event.data.value
            }
            console.log(log)
            dispatch(addJavaScriptLogs({ javaScriptLogs: log }))
        }
    }

    useEffect(() => {
        if (typeof window === 'undefined') return
        window.addEventListener("message", handler);
        return () => window.removeEventListener("message", handler);

    }, []);

    return (
        <div className='w-full flex flex-col lg:flex-row gap-2 md:gap-4 p-2 md:p-4 poppins border h-[91dvh]'>

            <div id='playground-editor-html-css-navigation' className="flex flex-row lg:flex-col justify-center items-center gap-8 p-2 rounded-md shadow-md  bg-black/40 backdrop-blur-md border border-gray-700 overflow-y-hidden overflow-x-auto md:overflow-hidden">

                <div
                    onClick={() => setVisible('html')}
                    className={`border px-2 py-2 rounded-sm ${visible === 'html' ? 'bg-white' : ''}`}>
                    <svgIcons.html className="w-4 h-4 md:w-7 md:h-7" />
                </div>

                <div
                    onClick={() => setVisible('css')}
                    className={`border px-2 py-2 rounded-sm ${visible === 'css' ? 'bg-white' : "odd:"}`}                    >
                    <svgIcons.css className="w-4 h-4 md:w-7 md:h-7" />
                </div>

                <div
                    onClick={() => setVisible('javascript')}
                    className={`border px-2 py-2 rounded-sm ${visible === 'javascript' ? 'bg-white' : "odd:"}`}
                >
                    <svgIcons.javascript className="w-4 h-4 md:w-7 md:h-7" />
                </div>

                <div
                    onClick={executeCode}
                    className='border px-3 py-3 bg-green-500 rounded-sm'>
                    <svgIcons.play className="w-4 h-4 md:w-5 md:h-5" />
                </div>

                <div
                    onClick={() => setVisible('terminal')}
                    className='border px-3 py-3 rounded-sm'>
                    <svgIcons.terminal className="w-4 h-4 md:w-5 md:h-5" />
                </div>

                <div className='border px-3 py-3 rounded-sm'>
                    <svgIcons.newWindow className="w-4 h-4 md:w-5 md:h-5" />
                </div>

            </div>

            <section className='w-full h-[80dvh] lg:h-[86dvh] rounded-md overflow-hidden'>
                <HtmlMonacoEditor
                    visible={`${visible === 'html' ? 'block' : 'hidden'}`}
                    className="w-full h-full rounded-md shadow-md relative overflow-y-scroll"
                    ref={htmlRef}
                />
                <CssMonacoEditor
                    visible={`${visible === 'css' ? 'block' : 'hidden'}`}
                    className="w-full h-full rounded-md shadow-md relative overflow-y-scroll"
                    ref={cssRef}
                />
                <JavascriptMonacoEditor
                    visible={`${visible === 'javascript' ? 'block' : 'hidden'}`}
                    className="w-full h-full rounded-md shadow-md relative overflow-y-scroll"
                    ref={javascriptRef}
                />
                <div
                    ref={outputRef}
                    className={`${outputToggle ? "block" : "hidden"} w-full border rounded-md h-full overflow-auto bg-white ${visible === 'output' ? 'block' : 'hidden'}`}>
                </div>
                {visible === 'terminal' && <JavaScriptTerminal />}
            </section>
        </div>
    )
}

export default Page