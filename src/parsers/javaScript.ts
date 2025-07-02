import { ASTNode } from "../model/AstNode";
import { LanguageInterface, ParserInterface } from "./_parser_interface";
import * as recast from "recast";
import * as acorn from "acorn";
import * as esprima from "esprima";

const insertTreeKey = (node: any): any => {
  if (!node || typeof node !== "object") return node;

  const tree_key = node.type;

  // Create a shallow copy to avoid mutating the original node
  const newNode: any = { ...node, tree_key };

  // Recursively process all properties
  for (const key of Object.keys(node)) {
    const value = node[key];

    // Skip the parent property to avoid infinite recursion on render
    if (key === "parent") {
      newNode[key] = undefined;
      continue;
    }

    if (Array.isArray(value)) {
      // If it's an array, map over it and transform any nodes
      newNode[key] = value.map((item) => insertTreeKey(item));
    } else if (value && typeof value === "object" && "kind" in value) {
      // If it's a node, transform it
      newNode[key] = insertTreeKey(value);
    } else {
      // Otherwise, keep the value as is
      newNode[key] = value;
    }
  }

  return newNode;
};

class RecastParser implements ParserInterface {
  parserId = "recast";
  parse(code: string): ASTNode | null {
    const ast = recast.parse(code);
    return insertTreeKey(ast.program);
  }
}

class AcornParser implements ParserInterface {
  parserId = "acorn";
  parse(code: string): ASTNode | null {
    const ast = acorn.parse(code, { sourceType: "module", ecmaVersion: 2020 });
    return insertTreeKey(ast);
  }
}

class EsprimaParser implements ParserInterface {
  parserId = "esprima";
  parse(code: string): ASTNode | null {
    const ast = esprima.parseScript(code);
    return insertTreeKey(ast);
  }
}

export class JavaScript implements LanguageInterface {
  languageName = "javascript";
  fileExtension = "js";
  parsers = [new RecastParser(), new AcornParser(), new EsprimaParser()];

  parse(code: string, parserId: string): ASTNode | null {
    const parser = this.parsers.find((parser: ParserInterface) => parser.parserId === parserId);

    if (!parser) {
      throw new Error(`Parser ${parserId} not found`);
    }

    return parser.parse(code);
  }
}
