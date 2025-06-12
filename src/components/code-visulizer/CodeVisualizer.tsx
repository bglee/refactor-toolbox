import { CodeBlock } from "react-code-blocks";
import { codeBlockThemeMap, AppTheme } from "../../config/theming";
import { useThemeStore } from "../../store/hooks/useThemeStore";

type CodeVisualizerProps = {
  theme: AppTheme;
  code: string;
  language: string;
};

export const CodeVisualizer: React.FC<CodeVisualizerProps> = ({  code, language }) => {
  const { theme: currentTheme } = useThemeStore();
  const codeBlockTheme = codeBlockThemeMap.get(currentTheme);

   

  if (!codeBlockTheme) {
    throw new Error(`Theme ${currentTheme} not found`);
  }

  return (
    <CodeBlock text={code} language={language} showLineNumbers={true} theme={codeBlockTheme} />
  );
};
