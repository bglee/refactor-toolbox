import { ASTNode } from "../model/AstNode";
import { LanguageInterface, ParserInterface } from "./_parser_interface";

class RecastParser implements ParserInterface {
  parserId = "recast";
  parse(code: string): ASTNode | null {
    const recast = require("recast");
    const ast = recast.parse(code);
    return ast.program;
  }
}

export class JavaScript implements LanguageInterface {
  languageName = "javascript";
  fileExtension = "js";
  parsers = [new RecastParser()];

  parse(code: string, parserId: string): ASTNode | null {
    const parser = this.parsers.find((parser: ParserInterface) => parser.parserId === parserId);

    if (!parser) {
      throw new Error(`Parser ${parserId} not found`);
    }

    return parser.parse(code);
  }
}
