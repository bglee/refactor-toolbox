import { Filter } from "../model/filter";
import { ASTNode } from "../model/AstNode";
import { useMemo } from "react";
import { pathBuilder } from "../components/ast-visualizer/ASTNodeContext";

function findMatchingTermsInDepth(node: ASTNode, filter: Filter<string>): Record<string, ASTNode> {
  const terms: Record<string, ASTNode> = {};

  // Create a map for faster filter lookups
  const filterMap = new Map(filter.tags.map((tag) => [tag.tag, tag.term]));

  // If no filters, return early
  if (filterMap.size === 0) {
    return { root: node };
  }

  function traverse(node: ASTNode, parentPath: string, index: number) {
    if (!node || typeof node !== "object") return;

    const path = pathBuilder(node, parentPath, index);

    // Process direct properties
    for (const [key, value] of Object.entries(node)) {
      // Fast path for primitive values
      if (value !== null && value !== undefined) {
        const valueType = typeof value;

        if (valueType === "string" || valueType === "number" || valueType === "boolean") {
          const expectedTerm = filterMap.get(key);
          if (expectedTerm === String(value)) {
            terms[path] = node;
          }
        } else if (valueType === "object") {
          // Handle arrays and objects
          if (Array.isArray(value)) {
            for (let i = 0; i < value.length; i++) {
              const item = value[i];
              if (item && typeof item === "object") {
                traverse(item as ASTNode, path, i);
              }
            }
          } else {
            traverse(value as ASTNode, path, 0);
          }
        }
      }
    }
  }

  traverse(node, "root", 0);
  return terms;
}

export const useFilteredASTNodes = <T extends string>(
  mainNode: ASTNode | null,
  filter: Filter<T>
): Record<string, ASTNode> => {
  const filteredASTNodes = useMemo(() => {
    if (mainNode === null) return {} as Record<string, ASTNode>;
    if (filter.tags.length === 0) return { root: mainNode } as Record<string, ASTNode>;

    return findMatchingTermsInDepth(mainNode, filter);
  }, [mainNode, filter]);

  return filteredASTNodes;
};
