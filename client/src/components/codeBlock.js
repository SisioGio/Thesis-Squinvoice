import { CopyBlock, dracula } from "react-code-blocks";
function CodeBlock({ text, language }) {
  return (
    <CopyBlock
      text={text}
      language={language}
      showLineNumbers={true}
      wrapLines
      theme={dracula}
    />
  );
}

export default CodeBlock;
