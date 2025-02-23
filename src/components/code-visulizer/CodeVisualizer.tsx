import { CodeBlock } from "react-code-blocks";
import { dracula } from "react-code-blocks";

type CodeVisualizerProps = {
  code: string;
  language: string;
};

const availableThemes = [
  "a11yDark",
  "a11yLight",
  "anOldHope",
  "androidstudio",
  "arta",
  "atomOneDark",
  "atomOneLight",
  "codepen",
  "dracula",
  "far",
  "github",
  "googlecode",
  "hopscotch",
  "hybrid",
  "irBlack",
  "monoBlue",
  "monokaiSublime",
  "monokai",
  "nord",
  "noctisViola",
  "obsidian",
  "ocean",
  "paraisoDark",
  "paraisoLight",
  "pojoaque",
  "purebasic",
  "railscast",
  "rainbow",
  "shadesOfPurple",
  "solarizedDark",
  "solarizedLight",
  "sunburst",
  "tomorrowNightBlue",
  "tomorrowNightBright",
  "tomorrowNightEighties",
  "tomorrowNight",
  "tomorrow",
  "vs2015",
  "xt256",
  "zenburn",
];

export const CodeVisualizer: React.FC<CodeVisualizerProps> = ({ code, language }) => {
  return <CodeBlock text={code} language={language} showLineNumbers={true} theme={dracula} />;
};
