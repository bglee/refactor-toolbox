import { Filter } from "../model/filter";
import { ASTNode } from "../model/AstNode";
import { useMemo } from "react";
import { pathBuilder } from "../components/ast-visualizer/ASTNodeContext";

function findMatchingTermsInDepth(
  node: ASTNode,
  filter: Filter<string>,
): Record<string, ASTNode> {
  const terms: Record<string, ASTNode> = {};

  async function traverse(node: ASTNode, parentPath: string, index: number) {
    const path = pathBuilder(node, parentPath, index);
    // Skip if node is null or not an object
    if (!node || typeof node !== "object") return;

    // For each property in the node
    for (const [key, value] of Object.entries(node)) {
      // Add the value if it's a basic type
      if (
        typeof value === "string" ||
        typeof value === "number" ||
        typeof value === "boolean"
      ) {
        if (
          filter.tags.some(
            (filterItem) =>
              filterItem.tag === key && filterItem.term === String(value),
          )
        ) {
          terms[path] = node;
        }
      }

      // Recursively traverse arrays and objects
      if (Array.isArray(value)) {
        Promise.resolve(
          value.map((item, index) => {
            if (typeof item === "object" && item !== null) {
              return traverse(item as ASTNode, path, index);
            }
          }),
        );
      } else if (typeof value === "object" && value !== null) {
        await traverse(value as ASTNode, path, 0);
      }
    }
  }

  traverse(node, "root", 0);

  return terms;
}

export const useFilteredASTNodes = <T extends string>(
  mainNode: ASTNode | null,
  filter: Filter<T>,
): Record<string, ASTNode> => {
  const filteredASTNodes = useMemo(() => {
    if (mainNode === null) return {} as Record<string, ASTNode>;
    if (filter.tags.length === 0)
      return { root: mainNode } as Record<string, ASTNode>;

    return findMatchingTermsInDepth(mainNode, filter);
  }, [mainNode, filter]);

  return filteredASTNodes;
};
