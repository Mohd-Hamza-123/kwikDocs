import CodeEditor from '@/components/Code-Editor/CodeEditor'
import React, { useEffect, useState } from 'react'

export default function Playground() {

  return (
    <div className='w-full border border-gray-400 h-[91dvh] px-2 py-2'>
      {/* <LanguageSelector
        activeLanguage={activeLanguage}
        onLanguageChange={onLanguageChange}
      /> */}
      <CodeEditor/>
    </div>
  )
}
