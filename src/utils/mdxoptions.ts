import rehypePrettyCode from "rehype-pretty-code";

const options = {
  theme: "github-dark", // or any VS Code theme like "nord", "dracula", etc.
  onVisitLine(node: any) {
    // Prevent collapsing empty lines
    if (node.children.length === 0) {
      node.children = [{ type: "text", value: " " }];
    }
  },
  onVisitHighlightedLine(node: any) {
    node.properties.className.push("highlighted");
  },
  onVisitHighlightedWord(node: any) {
    node.properties.className = ["word-highlight"];
  },
};

export const mdxOptions = {
  rehypePlugins: [[rehypePrettyCode, options]],
};
