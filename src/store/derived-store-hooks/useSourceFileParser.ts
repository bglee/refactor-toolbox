import { useEffect } from "react";
import { languages } from "../../parsers/_parser_constants";
import { astStore, codeStateStore } from "../store";
import { useStore } from "@tanstack/react-store";
import { AstState } from "../../model/AstState";

export const useSourceFileParser = () => {
  useEffect(() => {
    const unsubscribe = codeStateStore.subscribe(() => {
      const codeState = codeStateStore.state;
      const astState = astStore.state;

      if (codeState.checksum !== astState.codeChecksum) {
        const parser = languages.find((parser) => parser.languageName === codeState.languageName);

        if (codeState.languageName && !parser) {
          // We should error log this to the console.
          //eslint-disable-next-line no-console
          console.error(`Unsupported language: ${codeState.languageName}`);
          return;
        }
        if (codeState.parserId && parser) {
          astStore.setState({
            node: parser.parse(codeState.content, codeState.parserId),
            codeChecksum: codeState.checksum,
          });
        } else {
          astStore.setState({ node: null, codeChecksum: "" });
        }
      }
    });
    return () => unsubscribe();
  }, []);

  return {
    //Any here because while ts seems to infer the type of state in the editor, it does not at instanisation
    ast: useStore(astStore, (state: AstState) => state.node),
  };
};
