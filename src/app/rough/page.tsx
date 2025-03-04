'use client'
import CodeEditor from '@/components/Code-Editor/CodeEditor'
import { CODE_SNIPPETS } from '@/constant'
import { LanguageSelector } from '@/index'
import React, { useState } from 'react'

export default function page() {

  const [codeValue, setCodeValue] = useState('// some comment')
  const [activeLanguage, setActiveLanguage] = useState('Javascript')

  const onLanguageChange = (language: string) => {
    console.log(language)
    setActiveLanguage(language);
    const code = CODE_SNIPPETS[language] as string
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
      />
    </div>
  )
}
