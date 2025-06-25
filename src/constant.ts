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
  javascript: `\nfunction greet(name) {\n\tconsole.log("Hello, " + name + "!");\n}\n\ngreet("Alex");\n`,
  typescript: `\ntype Params = {\n\tname: string;\n}\n\nfunction greet(data: Params) {\n\tconsole.log("Hello, " + data.name + "!");\n}\n\ngreet({ name: "Alex" });\n`,
  python: `\ndef greet(name):\n\tprint("Hello, " + name + "!")\n\ngreet("Alex")\n`,
  java: `\npublic class HelloWorld {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println("Hello World");\n\t}\n}\n`,
  csharp:
    'using System;\n\nnamespace HelloWorld\n{\n\tclass Hello { \n\t\tstatic void Main(string[] args) {\n\t\t\tConsole.WriteLine("Hello World in C#");\n\t\t}\n\t}\n}\n',
  html: `<html>\n\t<head>\n\t\t<title>Hello World</title>\n\t</head>\n\t<body>\n\t\t<h1>Hello World</h1>\n\t</body>\n</html>\n`,
};
