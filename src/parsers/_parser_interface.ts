import { ASTNode } from "../model/AstNode";

export interface ParserInterface {
  parserId: string;
  parse(code: string): ASTNode | null;
}

export interface LanguageInterface {
  languageName: string;
  fileExtension: string;
  parsers: ParserInterface[];
  parse(code: string, parserId: string): ASTNode | null;
}
