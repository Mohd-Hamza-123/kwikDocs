'use client'
import CodeEditor from '@/components/Code-Editor/CodeEditor'
import { CODE_SNIPPETS, LANGUAGE_VERSIONS } from '@/constant'
import { CodeOutput, LanguageSelector } from '@/index'
import React, { useEffect, useState } from 'react'

export default function Playground() {

  const [codeValue, setCodeValue] = useState('')
  const [activeLanguage, setActiveLanguage] = useState('javascript')

  useEffect(() => {
    setCodeValue(CODE_SNIPPETS.javascript)
  }, [])

  const onLanguageChange = (language: keyof typeof CODE_SNIPPETS) => {
    setActiveLanguage(language);
    const code = CODE_SNIPPETS[language]
    setCodeValue(code)
  }

  return (
    <div className='w-full border border-red-700 h-[90vh] px-2 py-2'>
      {/* <LanguageSelector
        activeLanguage={activeLanguage}
        onLanguageChange={onLanguageChange}
      /> */}
      <CodeEditor
        activeLanguage={activeLanguage}
        // codeValue={codeValue}
        // setCodeValue={setCodeValue}
      />
      <CodeOutput
        codeValue={codeValue}
        activeLanguage={activeLanguage}
      />
    </div>
  )
}
