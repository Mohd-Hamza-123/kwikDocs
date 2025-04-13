'use client';

import React, { useEffect, useRef, useState } from 'react';
import { EditorState } from '@codemirror/state';
import { EditorView, keymap } from '@codemirror/view';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';
import { defaultKeymap } from '@codemirror/commands';

const CodeEditor = ({ activeLanguage }: { activeLanguage: string, }) => {

    const editorRef = useRef<HTMLDivElement>(null); // Ref for the editor container
    const [codeValue, setCodeValue] = useState<string>('console.log("Hello, CodeMirror!");');
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
                EditorView.updateListener.of((update) => {
                    if (update.docChanged) {
                        setCodeValue(update.state.doc.toString());
                    }
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
            // Use Function constructor for safer evaluation
            const func = new Function('console', codeValue);
            func(customConsole);
            setOutput(logs.join('\n') || 'Code executed successfully.');
        } catch (error) {
            setOutput(`Error: ${error}`);
        }
    };

    return (
        <div>
            {/* Editor Container */}
            <div ref={editorRef} style={{ border: '1px solid #ddd', height: '500px', marginBottom: '1rem' }} />

            {/* Run Code Button */}
            <button
                onClick={runCode}
                style={{
                    padding: '0.5rem 1rem',
                    background: '#4caf50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                }}
            >
                Run Code
            </button>

            {/* Output Section */}
            <div
                style={{
                    marginTop: '1rem',
                    padding: '1rem',
                    background: '#f4f4f4',
                    border: '1px solid #ddd',
                    borderRadius: '5px',
                }}
            >
                <strong>Output:</strong>
                <pre>{output}</pre>
            </div>
        </div>
    );
};

export default CodeEditor;



// 'use client';

// import React, { useEffect, useRef, useState } from 'react';
// import { EditorState } from '@codemirror/state';
// import { EditorView, keymap } from '@codemirror/view';
// import { javascript } from '@codemirror/lang-javascript';
// import { oneDark } from '@codemirror/theme-one-dark';
// import { defaultKeymap } from '@codemirror/commands';

// const CodeEditor = () => {
//     const editorRef = useRef<HTMLDivElement>(null); // Ref for the editor container
//     const [codeValue, setCodeValue] = useState<string>('console.log("Hello, CodeMirror!");');
//     const [output, setOutput] = useState<string>('');
//     console.log(output)
//     useEffect(() => {
//         if (!editorRef.current) return;

//         // Create EditorState with extensions and initial code value
//         const state = EditorState.create({
//             doc: codeValue,
//             extensions: [
//                 oneDark,
//                 javascript(),
//                 keymap.of(defaultKeymap),
//                 EditorView.updateListener.of((update) => {
//                     if (update.docChanged) {
//                         setCodeValue(update.state.doc.toString());
//                     }
//                 }),
//             ],
//         });

//         // Mount the editor to the container
//         const view = new EditorView({
//             state,
//             parent: editorRef.current,
//         });

//         return () => view.destroy(); // Cleanup on unmount
//     }, []);

//     const runCode = () => {
//         try {
//             const result = eval(codeValue); // Executes the code
//             setOutput(result !== undefined ? String(result) : 'Code executed successfully.');
//         } catch (error) {
//             setOutput(`Error: ${error}`);
//         }
//     };

//     return (
//         <div>
//             {/* Editor Container */}
//             <div ref={editorRef} style={{ border: '1px solid #ddd', height: '500px', marginBottom: '1rem' }} />

//             {/* Run Code Button */}
//             <button
//                 onClick={runCode}
//                 style={{
//                     padding: '0.5rem 1rem',
//                     background: '#4caf50',
//                     color: 'white',
//                     border: 'none',
//                     borderRadius: '5px',
//                     cursor: 'pointer',
//                 }}
//             >
//                 Run Code
//             </button>

//             {/* Output Section */}
//             <div
//                 style={{
//                     marginTop: '1rem',
//                     padding: '1rem',
//                     background: '#f4f4f4',
//                     border: '1px solid #ddd',
//                     borderRadius: '5px',
//                 }}
//             >
//                 <strong>Output:</strong>
//                 <pre>{output}</pre>
//             </div>
//         </div>
//     );
// };

// export default CodeEditor;



// 'use client';
// import * as CodeMirror from 'codemirror';
// import React, { useEffect, useRef } from 'react';
// import { EditorState } from "@codemirror/state";
// import { EditorView, highlightActiveLine, keymap } from "@codemirror/view";
// import { javascript } from "@codemirror/lang-javascript";
// import { oneDark } from "@codemirror/theme-one-dark";
// import { defaultKeymap } from "@codemirror/commands";
// import emmet from '@emmetio/codemirror-plugin';


// const CodeEditor = ({
//     activeLanguage,
//     codeValue,
//     setCodeValue }:
//     { activeLanguage: string, codeValue: string, setCodeValue: any }
// ) => {
//     const editorRef = useRef<HTMLDivElement>(null);
//     console.log(codeValue)
//     useEffect(() => {
//         if (!editorRef.current) return;

//         const state = EditorState.create({
//             // doc: "console.log('Hello, CodeMirror!');",
//             doc: codeValue,
//             extensions: [
//                 oneDark,
//                 javascript(),
//                 EditorView.theme({
//                     "&": {
//                         height: "500px", // Set height here
//                     },
//                 }),
//                 EditorView.lineWrapping,
//                 highlightActiveLine(),
//                 keymap.of(defaultKeymap), // The keymap extension is responsible for binding keyboard keys to editor actions
//             ],
//         });
//         const view = new EditorView({
//             state,
//             parent: editorRef.current,
//         });

//         return () => view.destroy();
//     }, []);

//     return <div ref={editorRef} className="editor-container" />;
// };

// export default CodeEditor;



// 'use client'
// import React, { useEffect, useRef } from 'react'
// import Spinner from '../Spinner/Spinner';

// export default function CodeEditor({
//     activeLanguage,
//     codeValue,
//     setCodeValue }:
//     { activeLanguage: string, codeValue: string, setCodeValue: any }) {
//     const editorRef = useRef(null);


//     const onChange = (value: string | undefined) => {
//         if (value === undefined) return
//         setCodeValue(value)
//     }

//     const onMount = (editor: any) => {
//         editorRef.current = editor;
//         editor.focus()
//     }


//     return (
//         <div className='w-1/2 inline-block h-full'>

//         </div>
//     )
// }

{/* <Editor
    height="100%"
    width='100%'
    theme='vs-dark'
    // defaultLanguage={activeLanguage.toLowerCase()}
    language={activeLanguage.toLowerCase()}
    defaultValue=""
    value={codeValue}
    onMount={onMount}
    onChange={(value) => onChange(value)}
    loading={<Spinner />}
    options={{
        fontSize: 20
    }}
/> */}
