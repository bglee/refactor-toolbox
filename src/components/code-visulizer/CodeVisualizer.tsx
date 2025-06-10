import { CodeBlock } from "react-code-blocks";
import { codeBlockThemeMap, AppTheme } from "../../config/theming";

type CodeVisualizerProps = {
  theme: AppTheme;
  code: string;
  language: string;
};

export const CodeVisualizer: React.FC<CodeVisualizerProps> = ({ theme, code, language }) => {
  const codeBlockTheme = codeBlockThemeMap.get(theme);

  if (!codeBlockTheme) {
    throw new Error(`Theme ${theme} not found`);
  }

  return (
    <CodeBlock text={code} language={language} showLineNumbers={true} theme={codeBlockTheme} />
  );
};
