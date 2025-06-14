import { CodeBlock } from "react-code-blocks";
import { codeBlockThemeMap, AppTheme } from "../../config/theming";
import { useThemeStore } from "../../store/store-hooks/useThemeStore";
import { useCodeStateStore } from "../../store/store-hooks/useCodeStateStore";

export const CodeVisualizer: React.FC = () => {
  const { theme: currentTheme } = useThemeStore();
  const { codeState } = useCodeStateStore();
  const codeBlockTheme = codeBlockThemeMap.get(currentTheme);

   

  if (!codeBlockTheme) {
    throw new Error(`Theme ${currentTheme} not found`);
  }

  return (
    <CodeBlock text={codeState.content} language={codeState.languageName} showLineNumbers={true} theme={codeBlockTheme} />
  );
};
