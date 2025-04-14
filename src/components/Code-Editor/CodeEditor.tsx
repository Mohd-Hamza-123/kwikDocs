'use client';
import { CodeOutput } from '@/index'
import { Button } from '../ui/button';
import { EditorState } from '@codemirror/state';
import { oneDark } from '@codemirror/theme-one-dark';
import { javascript } from '@codemirror/lang-javascript';
import { autocompletion } from '@codemirror/autocomplete';
import React, { useEffect, useRef, useState } from 'react';
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
        console.log(customConsole)
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
        <section className='flex gap-2 h-full w-full'>
            {/* Editor Container */}
            <div ref={editorRef} className='h-full w-1/2 text-lg' />
            <div className='flex flex-col gap-2 items-center w-1/2 h-full'>
                <Button onClick={runCode}>Run Code</Button>
                <CodeOutput output={output} />
            </div>
        </section>
    );
};

export default CodeEditor;



