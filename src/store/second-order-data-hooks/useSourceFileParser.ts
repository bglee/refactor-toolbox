import { useCodeStateStore } from "../store-hooks/useCodeStateStore";
import { useMemo } from "react";
import { languages } from "../../parsers/_parser_constants";

export const useSourceFileParser = () => {
  const { codeState } = useCodeStateStore();

  const parser = languages.find((parser) => parser.languageName === codeState.languageName);

  console.log(
    `%cSource File Parser State\n` +
      `%c Language: %c${codeState.languageName || "none"}\n` +
      `%c Parser ID: %c${codeState.parserId || "none"}`,
    "font-weight: bold; font-size: 12px; color: #666;",
    "color: #666;",
    "color: #4a90e2; font-weight: bold;",
    "color: #666;",
    "color: #4a90e2; font-weight: bold;"
  );

  if (codeState.languageName && !parser) {
    throw new Error(`Unsupported language: ${codeState.languageName}`);
  }

  const ast = useMemo(
    () => {
      try {
        return codeState.parserId ? parser?.parse(codeState.content, codeState.parserId) || null : null;
      } catch (e) {
        console.error(e);
        return null;
      }
    },
    [codeState.content, codeState.parserId, parser]
  );

  return {
    ast,
  };
};
