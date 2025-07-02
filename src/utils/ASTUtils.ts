import { ASTNode } from "../model/AstNode";

/**
 * Converts line/column position to character offset
 * @param sourceCode The source code string
 * @param line The line number (1-indexed)
 * @param column The column number (0-indexed)
 * @returns The character offset
 */
const lineColumnToOffset = (sourceCode: string, line: number, column: number): number => {
  const lines = sourceCode.split("\n");
  let offset = 0;

  // Add the length of all previous lines plus the newline characters
  for (let i = 0; i < line - 1; i++) {
    offset += lines[i].length + 1; // +1 for the newline character
  }

  // Add the column offset
  offset += column;

  return offset;
};

/**
 * Extracts position information from an AST node
 * @param node The AST node
 * @param sourceCode The source code string (needed for line/column conversion)
 * @returns Position information or null if not available
 */
export const extractPosition = (
  node: ASTNode,
  sourceCode?: string
): { start: number; end: number } | null => {
  // Check for common position properties
  if (node.start !== undefined && node.end !== undefined) {
    return { start: node.start as number, end: node.end as number };
  }

  if (node.range && Array.isArray(node.range) && node.range.length >= 2) {
    return { start: node.range[0] as number, end: node.range[1] as number };
  }

  console.log(node.loc);
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
};
