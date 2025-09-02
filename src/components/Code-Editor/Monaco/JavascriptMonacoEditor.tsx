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
  const defaultValue = CODE_SNIPPETS.javascript


  const disposeRef = useRef<null | (() => void)>(null)
  const editorRef = useRef<monacoType.editor.IStandaloneCodeEditor | null>(null)


  const beforeMount: BeforeMount = (monaco) => {
    // disposeRef.current = emmetHTML(monaco, ['javascript'])
  }

  const handleMount: OnMount = (editor, monaco) => {

    editorRef.current = editor
    editor.updateOptions({
      quickSuggestions: { other: true, comments: false, strings: true },
      wordBasedSuggestions: 'off',
      suggestOnTriggerCharacters: true,
      fontSize: window.innerWidth > 768 ? 16 : 14,
      lineNumbers: window.innerWidth > 768 ? 'on' : 'off',
      readOnly: false,
      smoothScrolling: true,  
      wordWrap: "on",
      minimap: {
        enabled: true,
      },
      automaticLayout: true,
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
        defaultLanguage="javascript"
        beforeMount={beforeMount}
        defaultValue={defaultValue}
      />
    </section>
  )
}
)

HtmlMonacoEditor.displayName = "JavascriptMonacoEditor"

export default HtmlMonacoEditor