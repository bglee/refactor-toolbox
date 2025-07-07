import { Store } from "@tanstack/react-store";
import { AppTheme } from "../config/theming";
import { Filter } from "../model/filter";
import { CodeState, HighlightState } from "../model/CodeState";
import { ContextMenuState } from "../model/ContextMenuState";
import { AstState } from "../model/AstState";
import { ModalState } from "../model/ModalState";

//Settings Store.
export const DEFAULT_THEME = AppTheme.dracula;

const theme = new Store<AppTheme>(DEFAULT_THEME);

export const settingsStore = {
  theme,
};

//Filter Store.
export const DEFAULT_FILTER: Filter<string> = { tags: [] };

export const filterStore = new Store<Filter<string>>(DEFAULT_FILTER);

//Key Visibility Store
export const DEFAULT_KEY_VISIBILITY: string[] = [];

export const keyVisibilityStore = new Store<string[]>(DEFAULT_KEY_VISIBILITY);

//Code State Store
export const DEFAULT_CODE_STATE: CodeState = {
  languageName: "",
  parserId: "",
  content: "",
  checksum: "",
  file: undefined,
};

//AST Store
export const DEFAULT_AST: AstState = { node: null, codeChecksum: "" };

export const astStore = new Store<AstState>(DEFAULT_AST);

export const codeStateStore = new Store<CodeState>(DEFAULT_CODE_STATE);

//Highlight Store
export const DEFAULT_HIGHLIGHT: HighlightState | null = null;

export const highlightStore = new Store<HighlightState | null>(DEFAULT_HIGHLIGHT);

//Context Menu Store
const DEFAULT_CONTEXT_MENU: ContextMenuState | null = null;

export const contextMenuStore = new Store<ContextMenuState | null>(DEFAULT_CONTEXT_MENU);

//Modal Store
const DEFAULT_MODAL: ModalState = {
  modalKey: "",
};

export const modalStore = new Store<ModalState>(DEFAULT_MODAL);
