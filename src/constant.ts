import { oneDark } from '@codemirror/theme-one-dark';
import { monokai } from '@uiw/codemirror-theme-monokai';
import { andromeda } from '@uiw/codemirror-theme-andromeda';
import {
  dracula,
  cobalt,
  tomorrow,
  coolGlow,
  solarizedLight,
  espresso,
  birdsOfParadise
} from 'thememirror';


export const saltRounds = 10
export const type_Reset_Email = 'RESET'
export const type_Verify_Email = 'VERIFY'

export const technologyEnums = [
  'DSA',
  'library',
  'framework',
  'query language',
  'World Wide Web',
  'coding language',
  'Runtime Environment',
  'Backend As a Service',
  'Version Control System',
  "Containerization Platform",
]


export const CODE_SNIPPETS = {
  css: `*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  }

  html,body{
  width : 100%;
  height: 100%;
  overflow-x:hidden;
  }
  `,
  javascript: `\nfunction greet(name) {\n\tconsole.log("Hello, " + name + "!");\n}\n\ngreet("Alex");\n`,
  typescript: `\ntype Params = {\n\tname: string;\n}\n\nfunction greet(data: Params) {\n\tconsole.log("Hello, " + data.name + "!");\n}\n\ngreet({ name: "Alex" });\n`,
  python: `\ndef greet(name):\n\tprint("Hello, " + name + "!")\n\ngreet("Alex")\n`,
  java: `\npublic class HelloWorld {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println("Hello World");\n\t}\n}\n`,
  html: `<html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>

      <h1>Hello World</h1>

    </body>
</html>`
};

export const CSP = `
<meta http-equiv="Content-Security-Policy" content="
  default-src 'none';
  script-src * 'unsafe-inline' 'unsafe-eval';
  style-src * 'unsafe-inline';
  img-src * data: blob:;
  connect-src *;
  font-src *;
  media-src *;
  frame-src *;
  base-uri 'none';
  form-action *;
  ">
`


export const Themes = {
  monokai: monokai,
  andromeda: andromeda,
  oneDark: oneDark,
  dracula: dracula,
  cobalt: cobalt,
  coolGlow: coolGlow,
  solarizedLight: solarizedLight,
  tomorrow: tomorrow,
  espresso: espresso,
  birdsOfParadise: birdsOfParadise
}