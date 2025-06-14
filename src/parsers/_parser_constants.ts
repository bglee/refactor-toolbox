import { LanguageInterface } from "./_parser_interface";
import { JavaScript } from "./javaScript";
import { TypeScript } from "./typeScript";

//Add a bit of type enforcement
const javaScript = new JavaScript();
const typeScript = new TypeScript();


export const fileExtensions = [javaScript.fileExtension, typeScript.fileExtension] as const;

export type FileExtension = (typeof fileExtensions)[number];

export const languageNames = [javaScript.languageName, typeScript.languageName] as const;

export type Language = (typeof languageNames)[number];

type LanguageType = LanguageInterface & {
  fileExtension: FileExtension;
  languageName: Language;
};

export const languages = [javaScript, typeScript] satisfies LanguageType[];
