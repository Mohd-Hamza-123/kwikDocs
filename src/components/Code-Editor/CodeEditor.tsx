'use client';

import React, { useEffect, useRef, useState } from 'react';
import { EditorState } from '@codemirror/state';
import { EditorView, highlightActiveLine, keymap } from '@codemirror/view';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';
import { defaultKeymap } from '@codemirror/commands';
import { Button } from '../ui/button';
import { CodeOutput } from '@/index'

const CodeEditor = ({ activeLanguage }: { activeLanguage: string, }) => {

    const editorRef = useRef<HTMLDivElement>(null); // Ref for the editor container
    const [codeValue, setCodeValue] = useState<string>('// Write javascript code ');
    const [output, setOutput] = useState<string>('');

    useEffect(() => {
        if (!editorRef.current) return;
        // Create EditorState with extensions and initial code value
        const state = EditorState.create({
            doc: codeValue,
            extensions: [
                oneDark,
                javascript(),
                keymap.of(defaultKeymap),
                highlightActiveLine(),
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



