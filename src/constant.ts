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
  'Version Control System',
  "Containerization Platform",
]

export const LANGUAGE_VERSIONS = {
  javascript: "18.15.0",
  typescript: "5.0.3",
  python: "3.10.0",
  java: "15.0.2",
  csharp: "6.12.0",
  php: "8.2.3",
};

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
  csharp:
    'using System;\n\nnamespace HelloWorld\n{\n\tclass Hello { \n\t\tstatic void Main(string[] args) {\n\t\t\tConsole.WriteLine("Hello World in C#");\n\t\t}\n\t}\n}\n',
  html: `<html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>

      <h1>Hello World</h1>

    </body>
</html>`,
};


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