"use client";
import React, { useEffect } from "react";
import prism from "prismjs";
import "prismjs/themes/prism-okaidia.css";
import "prismjs/components/prism-cshtml";
import "prismjs/components/prism-css";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-json";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-python";
import "prismjs/components/prism-java";
import "prismjs/components/prism-dart";
import "prismjs/components/prism-docker";
import "prismjs/components/prism-ejs";
import "prismjs/components/prism-git";
import "prismjs/components/prism-django";
import "prismjs/components/prism-sql";
import "prismjs/components/prism-markdown";
import "prismjs/components/prism-c";
import "prismjs/components/prism-csharp";
import "prismjs/components/prism-cpp"; 
import "prismjs/components/prism-go";
import "prismjs/components/prism-graphql";
import "prismjs/components/prism-json";
import "prismjs/components/prism-kotlin";
import "prismjs/components/prism-mongodb";
import "prismjs/components/prism-nginx";
import "prismjs/components/prism-php";
import "prismjs/components/prism-powershell";
import "prismjs/components/prism-swift";

import { useAppSelector } from "@/lib/hooks/hooks";
import { docsInterface } from "@/models/docs.model";

const Prism = ({ children }: any) => {
  const doc: docsInterface | null = useAppSelector((state) => state.docs?.document);

  useEffect(() => {
    prism.highlightAll();
  }, [doc]);
  return <div>{children}</div>;
};

export default Prism;
