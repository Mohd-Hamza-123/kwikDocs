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

  const [theme, setTheme] = useState<string>("okaidia");

  const doc: docsInterface | null = useAppSelector((state) => state.docs?.document);

  useEffect(() => {

    if (prism) {
      prism?.highlightAll();
    }

  }, [doc]);


  return <div>{children}</div>;
};

export default Prism;
