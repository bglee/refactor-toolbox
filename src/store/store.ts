import { Store } from "@tanstack/react-store";
import { AppTheme } from "../config/theming";
import { Filter } from "../model/filter";
import { CodeState } from "../model/CodeState";
import { ContextMenuState } from "../model/ContextMenuState";

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
};

export const codeStateStore = new Store<CodeState>(DEFAULT_CODE_STATE);

const DEFAULT_CONTEXT_MENU: ContextMenuState | null = null;

export const contextMenuStore = new Store<ContextMenuState | null>(DEFAULT_CONTEXT_MENU);
