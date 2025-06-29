"use client";
import React, { useEffect, useState } from "react";
import prism from "prismjs";
import "prismjs/themes/prism-okaidia.css";
// import "prismjs/themes/prism.css"; 
// import "prismjs/themes/prism-coy.css";
// import "prismjs/themes/prism-dark.css"; 
// import "prismjs/themes/prism-funky.css";
// import "prismjs/themes/prism-tomorrow.css";
// import "prismjs/themes/prism-twilight.css";
// import "prismjs/themes/prism-solarizedlight.css"; 

import "prismjs/components/prism-c";
import "prismjs/components/prism-css";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-sql";
import "prismjs/components/prism-cpp";
import "prismjs/components/prism-json";
import "prismjs/components/prism-java";
import "prismjs/components/prism-cshtml";
import "prismjs/components/prism-python";
import "prismjs/components/prism-docker";
import "prismjs/components/prism-markdown";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";

import { useAppSelector } from "@/lib/hooks/hooks";
import { docsInterface } from "@/models/docs.model";

const Prism = ({ children }: any) => {

  const theme = useAppSelector((state) => state.editorSlice.prismTheme)

  const doc: docsInterface | null = useAppSelector((state) => state.docs?.document);

  const loadTheme = () => {
    const link = document.getElementById("prism-theme");
    if(link) link.remove()
    const createLink = document.createElement("link")
    createLink.id = "prism-theme"
    createLink.rel = "stylesheet"
    createLink.href = `/themes/prism-${theme}.css`
    document.head.appendChild(createLink)
  }

  useEffect(() => {

    if (prism) {
      loadTheme()
      prism?.highlightAll();
    }

  }, [doc, theme]);


  return <div>{children}</div>;
};

export default Prism;
