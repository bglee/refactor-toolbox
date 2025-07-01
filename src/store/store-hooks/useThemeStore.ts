import { settingsStore } from "../store";
import { AppTheme } from "../../config/theming";
import { useStore } from "@tanstack/react-store";

export const useThemeStore = () => {
  return {
    theme: useStore(settingsStore.theme, (state: AppTheme) => state),
    setTheme: (theme: AppTheme) => settingsStore.theme.setState(() => theme),
  } as const;
};
