import { useMemo } from "react";
import { ASTNode } from "../model/AstNode";

function getSearchTermsInDepth(node: ASTNode): Record<string, string[]> {
  const terms: Record<string, Set<string>> = {};

  function traverse(node: ASTNode) {
    // Skip if node is null or not an object
    if (!node || typeof node !== "object") return;

    // For each property in the node
    for (const [key, value] of Object.entries(node)) {
      if (!terms[key]) terms[key] = new Set();
      // Add the value if it's a basic type
      if (
        typeof value === "string" ||
        typeof value === "number" ||
        typeof value === "boolean"
      ) {
        terms[key].add(String(value));
      }

      // Recursively traverse arrays and objects
      if (Array.isArray(value)) {
        value.forEach((item) => {
          if (typeof item === "object" && item !== null) {
            traverse(item as ASTNode);
          }
        });
      } else if (typeof value === "object" && value !== null) {
        traverse(value as ASTNode);
      }
    }
  }

  traverse(node);

  // Convert Sets to arrays
  return Object.fromEntries(
    Object.entries(terms).map(([key, valueSet]) => [key, Array.from(valueSet)]),
  );
}

export function useSearchTerms(astNode: ASTNode | null) {
  return useMemo(
    () => (astNode ? getSearchTermsInDepth(astNode) : {}),
    [astNode],
  );
}
