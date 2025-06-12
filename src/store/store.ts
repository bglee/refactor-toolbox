import { Store } from "@tanstack/react-store";
import { AppTheme } from "../config/theming";

//Settings Store.
export const DEFAULT_THEME = AppTheme.dracula;

const theme = new Store<AppTheme>(DEFAULT_THEME);

export const settingsStore = {
  theme,
};
