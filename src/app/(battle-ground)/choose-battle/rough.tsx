'use client'
import React from 'react'
import Editor from '@monaco-editor/react'
import { CODE_SNIPPETS } from '@/constant'
import type { OnMount } from '@monaco-editor/react'
import type * as monacoType from "monaco-editor";
import { emmetHTML } from 'emmet-monaco-es'

const Page = () => {
    const defaultValue = CODE_SNIPPETS.html
    const handleMount: OnMount = (editor, monaco) => {
        // editor.updateOptions({...}) is the API for changing the configuration of the Monaco Editor after it has been created.
        editor.updateOptions({
            // quickSuggestions → controls when suggestions pop up automatically:
            // other: true → show in normal code 
            // comments: false → don’t show inside comments 
            // strings: true → show inside strings
            quickSuggestions: { other: true, comments: false, strings: true },
            // wordBasedSuggestions: false → disables random word suggestions from the document (only use your custom completions or language server).
            wordBasedSuggestions: 'off',
            // suggestOnTriggerCharacters: true → automatically show suggestions when you type special trigger characters (., <, ", etc.) instead of only on Ctrl+Space.
            suggestOnTriggerCharacters: true,
            // optional extras:
            // tabCompletion: "on",
            // snippetSuggestions: "inline",
            fontSize: 16,
            lineNumbers: 'on',
            readOnly: false,
            minimap: {
                // minimap is that tiny preview of your code shown on the right-hand side
                enabled: true,
            },
            automaticLayout: true,
            // autoClosingBrackets : true,
            // autoClosingComments : true,
        });

        // monaco.languages.registerCompletionItemProvider tells Monaco: “Whenever I’m editing HTML, use this provider to supply custom autocomplete suggestions.
        const disposable = monaco.languages.registerCompletionItemProvider("html", {
            triggerCharacters: ["<", " ", '"', "'", "/", "!"],
            provideCompletionItems(model, position) {
                const word = model.getWordUntilPosition(position);
                const range = new monaco.Range(
                    position.lineNumber,
                    word.startColumn,
                    position.lineNumber,
                    word.endColumn
                );

                return {
                    suggestions: [
                        {
                            label: "html5-boilerplate",
                            filterText: "!",
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            documentation: "Basic HTML5 Boilerplate",
                            insertTextRules:
                                monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            insertText: [
                                "<!DOCTYPE html>",
                                '<html lang="en">',
                                "<head>",
                                '  <meta charset="UTF-8" />',
                                '  <meta name="viewport" content="width=device-width, initial-scale=1.0" />',
                                "  <title>$1</title>",
                                "</head>",
                                "<body>",
                                "  $2",
                                "</body>",
                                "</html>",
                            ].join("\n"),
                            range,
                        },
                        {
                            label: "meta:viewport",
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            documentation: "Responsive viewport meta",
                            insertText:
                                '<meta name="viewport" content="width=device-width, initial-scale=1.0" />',
                            range,
                        },
                        {
                            label: "script:defer",
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            documentation: "Script tag with defer",
                            insertText: '<script src="$1" defer></script>',
                            insertTextRules:
                                monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            range,
                        },
                    ],
                };
            },
        });

        emmetHTML(monaco)
        // ✅ cleanup: when the editor is disposed, unregister the provider
        editor.onDidDispose(() => disposable.dispose());


    }
    return (
        <>
            <Editor
                height={400}
                defaultLanguage="html"
                defaultValue={defaultValue}
                theme='vs-dark'
                onMount={handleMount}
            />
        </>
    )
}

export default Page