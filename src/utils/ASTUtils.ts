import { ASTNode } from "../model/AstNode";

/**
 * Finds an AST node by its path
 * @param root The root AST node
 * @param path The path to the node (e.g., "Program[0].body[0]")
 * @returns The found AST node or null if not found
 */
export function findNodeByPath(root: ASTNode, path: string): ASTNode | null {
  if (path === "root") {
    return root;
  }

  const pathParts = path.split(".");
  let current: any = root;

  for (let i = 0; i < pathParts.length; i++) {
    const part = pathParts[i];

    // Parse the part to extract node type and index
    const match = part.match(/^(.+)\[(\d+)\]$/);
    if (!match) {
      return null;
    }

    const [, nodeType, indexStr] = match;
    const index = parseInt(indexStr, 10);

    // Find the property that contains the node
    let found = false;

    for (const [key, value] of Object.entries(current)) {
      if (Array.isArray(value)) {
        // Check if any item in the array has the matching tree_key
        const item = value[index];

        if (item && typeof item === "object" && "tree_key" in item) {
          if (item.tree_key === nodeType) {
            current = item;
            found = true;
            break;
          }
        }
      } else if (value && typeof value === "object" && "tree_key" in value) {
        if (value.tree_key === nodeType) {
          current = value;
          found = true;
          break;
        }
      }
    }

    if (!found) {
      return null;
    }
  }

  return current;
}

/**
 * Converts line/column position to character offset
 * @param sourceCode The source code string
 * @param line The line number (1-indexed)
 * @param column The column number (0-indexed)
 * @returns The character offset
 */
function lineColumnToOffset(sourceCode: string, line: number, column: number): number {
  const lines = sourceCode.split("\n");
  let offset = 0;

  // Add the length of all previous lines plus the newline characters
  for (let i = 0; i < line - 1; i++) {
    offset += lines[i].length + 1; // +1 for the newline character
  }

  // Add the column offset
  offset += column;

  return offset;
}

/**
 * Extracts position information from an AST node
 * @param node The AST node
 * @param sourceCode The source code string (needed for line/column conversion)
 * @returns Position information or null if not available
 */
export function extractPosition(
  node: ASTNode,
  sourceCode?: string
): { start: number; end: number } | null {
  // Check for common position properties
  if (node.start !== undefined && node.end !== undefined) {
    return { start: node.start as number, end: node.end as number };
  }

  if (node.range && Array.isArray(node.range) && node.range.length >= 2) {
    return { start: node.range[0] as number, end: node.range[1] as number };
  }

  if (node.loc && typeof node.loc === "object") {
    const loc = node.loc as any;
    if (loc.start && loc.end && sourceCode) {
      // Convert line/column positions to character offsets
      const startOffset = lineColumnToOffset(sourceCode, loc.start.line, loc.start.column);
      const endOffset = lineColumnToOffset(sourceCode, loc.end.line, loc.end.column);
      return { start: startOffset, end: endOffset };
    }
  }

  return null;
}
