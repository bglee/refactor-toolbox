import { a11yDark, dracula, github, a11yLight, anOldHope, androidstudio, atomOneDark, atomOneLight, monokai, nord, solarizedDark, solarizedLight, tomorrowNight, vs2015 } from "react-code-blocks";
import { CodeBlockTheme } from "react-code-blocks/dist/types";

// All available code block themes
// Note: Only a subset of these themes are currently implemented in the DaisyUI configuration

export enum AppTheme {
  a11yDark = "a11yDark",
  a11yLight = "a11yLight",
  anOldHope = "anOldHope",
  androidstudio = "androidstudio",
  //"arta", // TODO: Implement in DaisyUI
  atomOneDark = "atomOneDark",
  atomOneLight = "atomOneLight",
  //"codepen", // TODO: Implement in DaisyUI
  dracula = "dracula",
  //"far", // TODO: Implement in DaisyUI
  github = "github",
  //"googlecode", // TODO: Implement in DaisyUI
  //"hopscotch", // TODO: Implement in DaisyUI
  //"hybrid", // TODO: Implement in DaisyUI
  //"irBlack", // TODO: Implement in DaisyUI
  //"monoBlue", // TODO: Implement in DaisyUI
  //"monokaiSublime", // TODO: Implement in DaisyUI
  monokai = "monokai",
  nord = "nord",
  //"noctisViola", // TODO: Implement in DaisyUI
  //"obsidian", // TODO: Implement in DaisyUI
  //"ocean", // TODO: Implement in DaisyUI
  //"paraisoDark", // TODO: Implement in DaisyUI
  //"paraisoLight", // TODO: Implement in DaisyUI
  //"pojoaque", // TODO: Implement in DaisyUI
  //"purebasic", // TODO: Implement in DaisyUI
  //"railscast", // TODO: Implement in DaisyUI
  //"rainbow", // TODO: Implement in DaisyUI
  //"shadesOfPurple", // TODO: Implement in DaisyUI
  solarizedDark = "solarizedDark",
  solarizedLight = "solarizedLight",
  //"sunburst", // TODO: Implement in DaisyUI
  //"tomorrowNightBlue", // TODO: Implement in DaisyUI
  //"tomorrowNightBright", // TODO: Implement in DaisyUI
  //"tomorrowNightEighties", // TODO: Implement in DaisyUI
  tomorrowNight = "tomorrowNight",
  //"tomorrow", // TODO: Implement in DaisyUI
  vs2015 = "vs2015",
  //"xt256", // TODO: Implement in DaisyUI
  //"zenburn", // TODO: Implement in DaisyUI
}

export const codeBlockThemeMap = new Map<AppTheme, CodeBlockTheme>([
  [AppTheme.dracula, dracula],
  [AppTheme.github, github],
  [AppTheme.a11yDark, a11yDark],
  [AppTheme.a11yLight, a11yLight],
  [AppTheme.anOldHope, anOldHope],
  [AppTheme.androidstudio, androidstudio],
  [AppTheme.atomOneDark, atomOneDark],
  [AppTheme.atomOneLight, atomOneLight],
  [AppTheme.monokai, monokai],
  [AppTheme.nord, nord],
  [AppTheme.solarizedDark, solarizedDark],
  [AppTheme.solarizedLight, solarizedLight],
  [AppTheme.tomorrowNight, tomorrowNight],
  [AppTheme.vs2015, vs2015]
]);