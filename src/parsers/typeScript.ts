
import { ASTNode } from "../model/AstNode";
import { LanguageInterface, ParserInterface } from "./_parser_interface";

class TypeScriptParser implements ParserInterface {
  parserId = "typescript";
  parse(code: string): ASTNode | null {
    const typescript = require("typescript");
    const ast = typescript.parse(code);
    return ast.program;
  }
}


export class TypeScript implements LanguageInterface {
  languageName = "typescript";
  fileExtension = "ts";
  parsers = [new TypeScriptParser()];

  parse(code: string, parserId: string): ASTNode | null {
    const parser = this.parsers.find((parser: ParserInterface) => parser.parserId === parserId);

    if (!parser) {
      throw new Error(`Parser ${parserId} not found`);
    }

    return parser.parse(code);
  }
}
