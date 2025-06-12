import { Store } from "@tanstack/react-store";
import { AppTheme } from "../config/theming";
import { Filter } from "../model/filter";

//Settings Store.
export const DEFAULT_THEME = AppTheme.dracula;

const theme = new Store<AppTheme>(DEFAULT_THEME);

export const settingsStore = {
  theme,
};

//Filter Store.
export const DEFAULT_FILTER: Filter<string> = {tags: []};

export const filterStore = new Store<Filter<string>>(DEFAULT_FILTER);