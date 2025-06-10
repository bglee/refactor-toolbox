import { dracula } from "react-code-blocks";
import { CodeBlockTheme } from "react-code-blocks/dist/types";

// All available code block themes
// Note: Only a subset of these themes are currently implemented in the DaisyUI configuration
export enum AppTheme {
  "a11yDark",
  "a11yLight",
  "anOldHope",
  "androidstudio",
  "arta", // TODO: Implement in DaisyUI
  "atomOneDark",
  "atomOneLight",
  "codepen", // TODO: Implement in DaisyUI
  "dracula",
  "far", // TODO: Implement in DaisyUI
  "github",
  "googlecode", // TODO: Implement in DaisyUI
  "hopscotch", // TODO: Implement in DaisyUI
  "hybrid", // TODO: Implement in DaisyUI
  "irBlack", // TODO: Implement in DaisyUI
  "monoBlue", // TODO: Implement in DaisyUI
  "monokaiSublime", // TODO: Implement in DaisyUI
  "monokai",
  "nord",
  "noctisViola", // TODO: Implement in DaisyUI
  "obsidian", // TODO: Implement in DaisyUI
  "ocean", // TODO: Implement in DaisyUI
  "paraisoDark", // TODO: Implement in DaisyUI
  "paraisoLight", // TODO: Implement in DaisyUI
  "pojoaque", // TODO: Implement in DaisyUI
  "purebasic", // TODO: Implement in DaisyUI
  "railscast", // TODO: Implement in DaisyUI
  "rainbow", // TODO: Implement in DaisyUI
  "shadesOfPurple", // TODO: Implement in DaisyUI
  "solarizedDark",
  "solarizedLight",
  "sunburst", // TODO: Implement in DaisyUI
  "tomorrowNightBlue", // TODO: Implement in DaisyUI
  "tomorrowNightBright", // TODO: Implement in DaisyUI
  "tomorrowNightEighties", // TODO: Implement in DaisyUI
  "tomorrowNight",
  "tomorrow", // TODO: Implement in DaisyUI
  "vs2015",
  "xt256", // TODO: Implement in DaisyUI
  "zenburn", // TODO: Implement in DaisyUI
}

export const codeBlockThemeMap = new Map<AppTheme, CodeBlockTheme>([[AppTheme.dracula, dracula]]);

// Map code block themes to their corresponding DaisyUI theme names
// Only themes that have been implemented in the DaisyUI configuration are included
export const tailwindThemeMap = new Map<AppTheme, string>([
  [AppTheme.a11yDark, "a11yDark"],
  [AppTheme.a11yLight, "a11yLight"],
  [AppTheme.anOldHope, "anOldHope"],
  [AppTheme.androidstudio, "androidstudio"],
  [AppTheme.atomOneDark, "atomOneDark"],
  [AppTheme.atomOneLight, "atomOneLight"],
  [AppTheme.dracula, "dracula"],
  [AppTheme.github, "github"],
  [AppTheme.monokai, "monokai"],
  [AppTheme.nord, "nord"],
  [AppTheme.solarizedDark, "solarizedDark"],
  [AppTheme.solarizedLight, "solarizedLight"],
  [AppTheme.tomorrowNight, "tomorrowNight"],
  [AppTheme.vs2015, "vs2015"],
]);
