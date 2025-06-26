'use client';
import { CodeOutput } from '@/index';
import { Button } from '../ui/button';
import { FaRegCopy } from "react-icons/fa";
import { EditorState } from '@codemirror/state';
import { oneDark } from '@codemirror/theme-one-dark';
import copyToClipBoard from '@/utils/copyToClipboard';
import { javascript } from '@codemirror/lang-javascript';
import { autocompletion } from '@codemirror/autocomplete';
import React, { useEffect, useRef, useState } from 'react';
import LanguageSelector from '@/components/Code-Editor/LanguageSelector';
import {
    history,
    defaultKeymap,
    historyKeymap
} from '@codemirror/commands';
import {
    keymap,
    EditorView,
    lineNumbers,
    highlightActiveLine,
} from '@codemirror/view';

const CodeEditor = () => {

    const editorRef = useRef<HTMLDivElement>(null);
    const [output, setOutput] = useState<string>('');
    const [codeValue, setCodeValue] = useState<string>('// Write javascript code ');

    useEffect(() => {
        if (!editorRef.current) return;
        const state = EditorState.create({
            doc: codeValue,
            extensions: [
                oneDark,
                history(),
                javascript(),
                lineNumbers(),
                autocompletion(),
                highlightActiveLine(),
                keymap.of([...defaultKeymap, ...historyKeymap]),
                EditorView.updateListener.of((update) => {
                    if (update.docChanged) {
                        setCodeValue(update.state.doc.toString());
                    }
                }),
                EditorView.theme({
                    "&": {
                        height: "100%",
                        width: "100%"
                    },
                }),
            ],
        });

        // Mount the editor to the container
        const view = new EditorView({
            state,
            parent: editorRef.current,
        });

        return () => view.destroy(); // Cleanup on unmount
    }, []);

    const runCode = () => {
        const logs: string[] = [];
        const customConsole = {
            log: (...args: any[]) => {
                logs.push(args.map((arg) => String(arg)).join(' '));
            },
        };
        // console.log(customConsole)
        try {
            // Using Function constructor for safer evaluation
            const func = new Function('console', codeValue);
            func(customConsole);
            setOutput(logs.join('\n') || 'Code executed successfully.');
        } catch (error) {
            setOutput(`Error: ${error}`);
        }
    };

    return (
        <section className='flex gap-2 h-full w-full flex-col items-center justify-center'>

            <div className='flex gap-2 w-full justify-center items-center'>
                <LanguageSelector activeLanguage='javascript' onLanguageChange={() => { }} />
                <Button
                    onClick={runCode}
                    // className='w-[85px]'
                    variant='default'
                >Run Code</Button>
            </div>

            <div className='flex gap-2 w-full h-full relative'>
                <Button
                    onClick={() => copyToClipBoard(codeValue)}
                    className='w-[45px] absolute z-10 left-2 bottom-2'
                    variant='destructive'
                    title="Copy Code">
                    <FaRegCopy />
                </Button>
                <div ref={editorRef} className='h-full flex-1 text-lg' />
                <CodeOutput
                    output={output}
                    className='flex flex-col gap-2 items-center flex-1 h-full'
                />
                
            </div>

        </section>
    );
};

export default CodeEditor;



