import { useMemo, useState } from "react";
import { ASTNode } from "../model/AstNode";
import { Language, languages } from "../parsers/_parser_constants";

interface CodeState {
  languageName: Language;
  parserId: string;
  content: string;
}

export const useSourceFileParser = () => {
  const [code, setCode] = useState<CodeState>({
    languageName: "",
    parserId: "",
    content: "",
  });

  const parser = languages.find((parser) => parser.languageName === code.languageName);

  console.log(
    `%cSource File Parser State\n` +
      `%c Language: %c${code.languageName || "none"}\n` +
      `%c Parser ID: %c${code.parserId || "none"}`,
    "font-weight: bold; font-size: 12px; color: #666;",
    "color: #666;",
    "color: #4a90e2; font-weight: bold;",
    "color: #666;",
    "color: #4a90e2; font-weight: bold;"
  );

  if (code.languageName && !parser) {
    throw new Error(`Unsupported language: ${code.languageName}`);
  }

  const ast = useMemo(
    () => (code.parserId ? parser?.parse(code.content, code.parserId) || null : null),
    [code.content, code.parserId, parser]
  );

  return {
    ast,
    code,
    setCode,
  };
};
