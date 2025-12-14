'use client'
import React, { useEffect, useRef, forwardRef, useImperativeHandle } from 'react'
import Editor from '@monaco-editor/react'
import { CODE_SNIPPETS } from '@/constant'
import type { OnMount, BeforeMount } from '@monaco-editor/react'
import { emmetCSS } from 'emmet-monaco-es'

interface Props {
  visible: 'block' | 'hidden',
  className: string,
}

const CssMonacoEditor = forwardRef((props: Props, ref) => {

  const { visible, className } = props
  const defaultValue = CODE_SNIPPETS.css
  const disposeRef = useRef<null | (() => void)>(null)
  const editorRef = useRef<any>(null)


  const beforeMount: BeforeMount = (monaco) => {
    disposeRef.current = emmetCSS(monaco, ['css'])
    editorRef.current = monaco // save editor instance
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
      wordWrap: "on",
      smoothScrolling: true,  
      minimap: {
        enabled: true,
      },
      automaticLayout: true,
    })
  }

  const handleChange = (value: string | undefined) => {
    console.log(value)
  }

  // const handleGetValue = () => {
  //   const value = editorRef.current?.getValue()
  //   console.log("Editor value:", value)
  //   setCssCode(value)
  // }

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
        defaultLanguage="css"
        onChange={handleChange}
        beforeMount={beforeMount}
        defaultValue={defaultValue}
      />
    </section>
  )
}
)
CssMonacoEditor.displayName = "CssMonacoEditor"
export default CssMonacoEditor