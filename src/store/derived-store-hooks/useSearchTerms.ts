import { useMemo } from "react";
import { ASTNode } from "../../model/AstNode";
import { useSourceFileParser } from "./useSourceFileParser";

function getSearchTermsInDepth(node: ASTNode): Record<string, string[]> {
  // Pre-allocate a single object to store results
  const terms: Record<string, string[]> = {};

  function traverse(node: ASTNode) {
    if (!node || typeof node !== "object") return;

    // Use Object.keys instead of entries for better performance
    const keys = Object.keys(node);
    const len = keys.length;

    for (let i = 0; i < len; i++) {
      const key = keys[i];
      const value = node[key];

      // Fast path for primitive values
      if (value !== null && value !== undefined) {
        if (!terms[key]) terms[key] = [];

        const valueType = typeof value;

        if (valueType === "string" || valueType === "number" || valueType === "boolean") {
          terms[key].push(String(value));
        } else if (valueType === "object") {
          // Handle arrays and objects
          if (Array.isArray(value)) {
            const arrLen = value.length;
            for (let j = 0; j < arrLen; j++) {
              const item = value[j];
              if (item && typeof item === "object") {
                traverse(item as ASTNode);
              }
            }
          } else {
            traverse(value as ASTNode);
          }
        }
      }
    }
  }

  traverse(node);

  // Remove duplicates at the end in a single pass
  for (const key in terms) {
    terms[key] = Array.from(new Set(terms[key]));
  }

  return terms;
}

export function useSearchTerms() {
  const { ast } = useSourceFileParser();
  return useMemo(() => (ast ? getSearchTermsInDepth(ast) : {}), [ast]);
}
