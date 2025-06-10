import { useEffect, useState } from "react";
import { DEFAULT_THEME, settingsStore } from "../store";
import { AppTheme } from "../../config/theming";

export const useThemeStore = () => {
  const [theme, setTheme] = useState(DEFAULT_THEME);

  useEffect(() => {
    const unsubscribe = settingsStore.theme.subscribe(() => {
      setTheme(settingsStore.theme.state);
    });

    return () => unsubscribe();
  }, [theme]);

  return {
    theme,
    setTheme: (theme: AppTheme) => settingsStore.theme.setState(() => theme),
  } as const;
};
