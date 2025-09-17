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
