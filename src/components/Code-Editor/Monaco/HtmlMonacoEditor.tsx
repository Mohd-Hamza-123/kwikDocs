'use client'
import Editor from '@monaco-editor/react'
import { CODE_SNIPPETS } from '@/constant'
import { emmetHTML } from 'emmet-monaco-es'
import type { OnMount, BeforeMount } from '@monaco-editor/react'
import React, { useEffect, useRef, forwardRef, useImperativeHandle } from 'react'
import type * as monacoType from 'monaco-editor'


interface Props {
  visible: 'block' | 'hidden',
  className: string
}

const HtmlMonacoEditor = forwardRef((props: Props, ref) => {

  const { visible, className } = props
  const defaultValue = CODE_SNIPPETS.html


  const disposeRef = useRef<null | (() => void)>(null)
  const editorRef = useRef<monacoType.editor.IStandaloneCodeEditor | null>(null)


  const beforeMount: BeforeMount = (monaco) => {
    disposeRef.current = emmetHTML(monaco, ['html'])
  }

  const handleMount: OnMount = (editor, monaco) => {

    editorRef.current = editor
    // console.log(editorRef.current?.getValue())
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
      fontSize: window.innerWidth > 768 ? 16 : 14,
      lineNumbers: window.innerWidth > 768 ? 'on' : 'off',
      readOnly: false,
      smoothScrolling: true,  
      wordWrap: "on",
      minimap: {
        // minimap is that tiny preview of your code shown on the right-hand side
        enabled: true,
      },
      automaticLayout: true,
      // autoClosingBrackets : true,
      // autoClosingComments : true,
    });
  }

  useImperativeHandle(ref, () => ({
    getValue: () => editorRef.current?.getValue() || ''
  }))

  useEffect(() => {
    return () => {
      disposeRef.current?.()
    }
  }, [])

  return (
    <section className={`h-full w-full ${visible}`}>
      <Editor
        height="100%"
        theme='vs-dark'
        onMount={handleMount}
        defaultLanguage="html"
        beforeMount={beforeMount}
        defaultValue={defaultValue}
      />
    </section>
  )
}
)

HtmlMonacoEditor.displayName = "HtmlMonacoEditor"

export default HtmlMonacoEditor