import { LanguageInterface } from "./_parser_interface";
import { JavaScript } from "./javaScript";

//Add a bit of type enforcement
const javaScript = new JavaScript();

export const fileExtensions = [javaScript.fileExtension] as const;

export type FileExtension = (typeof fileExtensions)[number];

export const languageNames = [javaScript.languageName] as const;

export type Language = (typeof languageNames)[number];

type LanguageType = LanguageInterface & {
  fileExtension: FileExtension;
  languageName: Language;
};

export const languages = [javaScript] satisfies LanguageType[];
