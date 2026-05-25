'use client'
import dynamic from 'next/dynamic'
import { toast } from '@/hooks/use-toast';
import { svgIcons } from '@/components/icons';
import Link from 'next/link';
import sanitizeHtml from '@/utils/Sanitize-html';
import { useAppDispatch } from '@/lib/hooks/hooks';
import React, { useState, useRef, useEffect } from 'react';
import injectCssAndJavascriptIntoHtml from '@/utils/InjectCssIntoHtml';
import { addJavaScriptLogs, clearJavaScriptLogs } from '@/lib/store/features/logsSlice';
import conf from '@/conf/conf';
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
    const finalCode = useRef<string>('')
    const [outputToggle, setOutputToggle] = useState(false)
    const [visible, setVisible] = useState<'html' | 'css' | 'javascript' | 'output' | 'terminal'>('html')

    const executeCode = () => {
        try {
            dispatch(clearJavaScriptLogs());
            const htmlCode = htmlRef.current?.getValue?.() ?? ''
            const cssCode = cssRef.current?.getValue?.() ?? ''
            const javascriptCode = javascriptRef.current?.getValue() ?? ''

            setVisible('output')

            const sanitizedHtml = sanitizeHtml(htmlCode)

            const iframe = document.createElement('iframe')
            // iframe.sandbox = "allow-scripts allow-forms allow-same-origin"
            iframe.style.width = "100%"
            iframe.style.height = "100%"
            iframe.id = "preview-iframe";
            const Code = injectCssAndJavascriptIntoHtml(sanitizedHtml, cssCode, javascriptCode)

            if (outputRef.current) {
                outputRef.current.innerHTML = ''
                outputRef.current.appendChild(iframe)
                setOutputToggle(true)
            }

            const environment = process.env.NODE_ENV
            const previewOrigin = environment === "development"? "http://localhost:3001": conf.preview
            console.log(conf.preview)
            
            const onParentMessage = (event: MessageEvent) => {
                try {
                    const data = event.data
                    if (!data || typeof data !== "object") return;
                    if (data.type === "child-ready") {
                        console.log("Parent: child is ready — sending code");
                        // send the HTML code to child
                        iframe.contentWindow?.postMessage({ type: "parent-message", code: Code }, previewOrigin);
                        // remove this listener; we only needed the ready handshake
                        window.removeEventListener("message", onParentMessage);
                    }
                    if (data.type === "child-ack") {
                        console.log("Parent got child-ack:", data);
                    }
                } catch (error) {
                    console.error("parent handler error", error);
                }
            }
            window.addEventListener("message", onParentMessage)
           
            // finalCode.current = Code
           
            iframe.src = environment === "development" ? 'http://localhost:3001/render' : conf.preview + '/render'
           

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

            <div id='playground-editor-html-css-navigation' className="flex flex-row lg:flex-col justify-around items-center gap-4 md:gap-8 p-2 rounded-md shadow-md dark:bg-black/40 backdrop-blur-md border border-gray-300 dark:border-gray-700 overflow-y-hidden overflow-x-auto md:overflow-hidden">

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
                    className={`border px-2 py-2 rounded-sm ${visible === 'javascript' ? 'bg-white' : "odd:"}`}>
                    <svgIcons.javascript className="w-4 h-4 md:w-7 md:h-7" />
                </div>

                <div
                    onClick={executeCode}
                    className='border px-3 py-3 bg-green-500 rounded-sm'>
                    <svgIcons.play className="w-4 h-4 md:w-5 md:h-5 fill-white" />
                </div>


                <div
                    onClick={() => setVisible('terminal')}
                    className='border px-3 py-3 rounded-sm'>
                    <svgIcons.terminal className="w-4 h-4 md:w-5 md:h-5" />
                </div>

                {/* <Link href={`https://kwikdocs-preview.vercel.app/render?finalHtml=${finalCode.current}`} target="_blank">
                    <div className='border px-3 py-3 rounded-sm'>
                        <svgIcons.newWindow className="w-4 h-4 md:w-5 md:h-5" />
                    </div>
                </Link> */}

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
        </div >
    )
}

export default Page