import { CodeBlock } from "react-code-blocks";
import { codeBlockThemeMap, AppTheme } from "../../config/theming";
import { useThemeStore } from "../../store/store-hooks/useThemeStore";
import { useCodeStateStore } from "../../store/store-hooks/useCodeStateStore";
import { useHighlightStore } from "../../store/store-hooks/useHighlightStore";
import { useMemo } from "react";

export const CodeVisualizer: React.FC = () => {
  const { theme: currentTheme } = useThemeStore();
  const { codeState } = useCodeStateStore();
  const { highlight, setHighlight } = useHighlightStore();
  const codeBlockTheme = codeBlockThemeMap.get(currentTheme);

  if (!codeBlockTheme) {
    throw new Error(`Theme ${currentTheme} not found`);
  }

  // Convert character offsets to line numbers for react-code-blocks
  const highlightLines = useMemo(() => {
    if (!highlight || !codeState.content) return undefined;

    const lines = codeState.content.split("\n");
    let currentOffset = 0;
    let startLine = 1;
    let endLine = 1;

    for (let i = 0; i < lines.length; i++) {
      const lineLength = lines[i].length + 1; // +1 for newline

      if (currentOffset <= highlight.start && highlight.start < currentOffset + lineLength) {
        startLine = i + 1;
      }

      if (currentOffset <= highlight.end && highlight.end <= currentOffset + lineLength) {
        endLine = i + 1;
        break;
      }

      currentOffset += lineLength;
    }

    return `${startLine}-${endLine}`;
  }, [highlight, codeState.content]);

  return (
    <CodeBlock
      text={codeState.content}
      language={codeState.languageName}
      showLineNumbers={true}
      theme={codeBlockTheme}
      highlight={highlightLines || undefined}
    />
  );
};
