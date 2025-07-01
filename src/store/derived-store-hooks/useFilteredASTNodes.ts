import { Filter } from "../../model/filter";
import { ASTNode } from "../../model/AstNode";
import { useMemo } from "react";
import { pathBuilder } from "../../components/ast-visualizer/ASTNodeContext";
import { useFilterStore } from "../store-hooks/useFilterStore";
import { useSourceFileParser } from "./useSourceFileParser";

// Type for our search index
type SearchIndex = Map<string, Map<string, Array<ASTNode>>>;

// Build the search index once when the AST is loaded
// TODO: Current implementation only supports top-level property searches.
// For nested property searches, we would need to:
// 1. Store the full path to each property in the index
// 2. Modify the index structure to: Map<path, Map<value, node>>
// 3. Update the search logic to handle path-based lookups
function buildSearchIndex(node: ASTNode): SearchIndex {
  const searchIndex: SearchIndex = new Map();

  function traverse(node: ASTNode, parentPath: string, nodeIndex: number) {
    if (!node || typeof node !== "object") return;

    const path = pathBuilder(node, parentPath, nodeIndex);

    // Process direct properties
    for (const [key, value] of Object.entries(node)) {
      if (value !== null && value !== undefined) {
        const valueType = typeof value;

        if (valueType === "string" || valueType === "number" || valueType === "boolean") {
          const strValue = String(value);

          // Initialize the key map if it doesn't exist
          if (!searchIndex.has(key)) {
            searchIndex.set(key, new Map());
          }

          // Add the value to the key's map
          const valueMap = searchIndex.get(key)!;
          if (!valueMap.has(strValue)) {
            valueMap.set(strValue, []);
          }
          valueMap.get(strValue)!.push(node);
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
  return searchIndex;
}

function findMatchingTermsInDepth(
  node: ASTNode,
  filter: Filter<string>,
  searchIndex: SearchIndex
): Record<string, ASTNode> {
  const terms: Record<string, ASTNode> = {};

  // If no filters, return early
  if (filter.tags.length === 0) {
    return { root: node };
  }

  // Use the search index to find matching nodes
  for (const { tag, term } of filter.tags) {
    const valueMap = searchIndex.get(tag);
    if (valueMap) {
      const matchingNode = valueMap.get(term);
      if (matchingNode) {
        // Use the node's path as the key
        let index = 0;
        for (const node of matchingNode) {
          const path = pathBuilder(node, "root", index);
          terms[path] = node;
          index++;
        }
      }
    }
  }
  return terms;
}

export const useFilteredASTNodes = (): Record<string, ASTNode> => {
  const { filter } = useFilterStore();
  const { ast } = useSourceFileParser();

  // Build the search index once when the AST changes
  const searchIndex = useMemo(() => {
    if (!ast) return new Map();
    return buildSearchIndex(ast);
  }, [ast]);

  const filteredASTNodes = useMemo(() => {
    if (ast === null) return {} as Record<string, ASTNode>;
    if (filter.tags.length === 0) return { root: ast } as Record<string, ASTNode>;

    return findMatchingTermsInDepth(ast, filter, searchIndex);
  }, [ast, filter, searchIndex]);

  return filteredASTNodes;
};
