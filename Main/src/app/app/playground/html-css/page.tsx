'use client'
import './page.css'
import dynamic from 'next/dynamic';
import { toast } from '@/hooks/use-toast';
import { svgIcons } from '@/components/icons';
import { CodeSaveDialog } from '@/components';
import React, { useState, useRef } from 'react'
import { Button } from '@/components/ui/button';
import sanitizeHtml from '@/utils/Sanitize-html';
import usePlayground from '@/hooks/use-playground';
import { useAppSelector } from '@/lib/hooks/hooks';
import { injectCssIntoHtml } from '@/utils/InjectCssIntoHtml';
const HtmlMonacoEditor = dynamic(() => import('@/components/Code-Editor/Monaco/HtmlMonacoEditor'), { ssr: false })
const CssMonacoEditor = dynamic(() => import('@/components/Code-Editor/Monaco/CssMonacoEditor'), { ssr: false })


const Page = () => {

    const cssRef = useRef<any>(null)
    const htmlRef = useRef<any>(null)
    const outputRef = useRef<HTMLDivElement>(null)

    const { createProject } = usePlayground()
    const [outputToggle, setOutputToggle] = useState(false)
    const userData = useAppSelector((state) => state.auth.userData);
    
    const [visible, setVisible] = useState<'html' | 'css' | 'output'>('html');

    const executeCode = () => {
        try {

            const htmlCode = htmlRef.current?.getValue?.() ?? ''
            const cssCode = cssRef.current?.getValue?.() ?? ''

            setVisible('output')
            const sanitizedHtml = sanitizeHtml(htmlCode)
            // setHtmlCode(sanitizedHtml)

            const iframe = document.createElement('iframe')
            iframe.style.width = "100%"
            iframe.style.height = "100%"
            const finalHtmlCode = injectCssIntoHtml(sanitizedHtml, cssCode)
            iframe.srcdoc = finalHtmlCode

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

    const saveProject = async (title: string, description: string) => {
        const html = htmlRef.current?.getValue?.() ?? ''
        const css = cssRef.current?.getValue?.() ?? ''

        createProject({
            html,
            css,
            user: userData?._id!,
            title,
            description,
            views : 0
        })
    }


    return (
        <div className='w-full flex flex-col lg:flex-row gap-2 md:gap-4 p-2 md:p-4 poppins border h-[91dvh]'>

            <div id='playground-editor-html-css-navigation' className="flex flex-row lg:flex-col justify-center items-center gap-8 p-2 rounded-xl shadow-md  bg-black/40 backdrop-blur-md border border-gray-700 overflow-x-scroll">
                <Button
                    onClick={() => setVisible('html')}
                    className='md:h-10'
                    variant={visible === 'html' ? 'default' : 'secondary'}>
                    <svgIcons.html className="w-4 h-4 md:w-7 md:h-7" />
                </Button>
                <Button
                    variant={visible === 'css' ? 'default' : 'secondary'}
                    className='md:h-10'
                    onClick={() => setVisible('css')}>
                    <svgIcons.css className="w-4 h-4 md:w-7 md:h-7" />
                </Button>
                <Button
                    variant={visible === 'output' ? 'outline' : 'secondary'}
                    onClick={executeCode}
                    className="px-4 py-2 font-semibold bg-green-500 hover:bg-green-600 text-white rounded-lg shadow-lg md:h-10">
                    <svgIcons.play className="w-4 h-4 md:w-7 md:h-7" />
                </Button>

                <CodeSaveDialog
                    saveProject={saveProject}
                />

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
                <div
                    ref={outputRef}
                    id='playground-editor-html-css-output'
                    className={`${outputToggle ? "block" : "hidden"} w-full border rounded-md h-full overflow-auto bg-white ${visible === 'output' ? 'block' : 'hidden'}`}>
                </div>

            </section>
        </div>
    )
}

export default Page