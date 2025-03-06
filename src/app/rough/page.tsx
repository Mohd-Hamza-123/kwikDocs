'use client'
import CodeEditor from '@/components/Code-Editor/CodeEditor'
import { CODE_SNIPPETS, LANGUAGE_VERSIONS } from '@/constant'
import { CodeOutput, LanguageSelector } from '@/index'
import React, { useState } from 'react'

export default function page() {

  const [codeValue, setCodeValue] = useState('')
  const [activeLanguage, setActiveLanguage] = useState('javascript')

  const onLanguageChange = (language: string) => {
    console.log(language)
    setActiveLanguage(language);
    const code = CODE_SNIPPETS[language] as any
    setCodeValue((prev: string) => code)
  }

  return (
    <div>
      <LanguageSelector
        activeLanguage={activeLanguage}
        onLanguageChange={onLanguageChange}
      />
      <CodeEditor
        activeLanguage={activeLanguage}
        codeValue={codeValue}
        setCodeValue={setCodeValue}
      />
      <CodeOutput
        codeValue={codeValue}
        activeLanguage={activeLanguage}
      />
    </div>
  )
}
