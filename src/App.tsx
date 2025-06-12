import { NavBar } from "./components/navigation/HeaderBar";
import { FilterBox, useFilterBoxState } from "./components/filter/FilterBox";
import { FileSelect } from "./components/file-select/FileSelect";
import { useEffect, useMemo, useState } from "react";
import { VisiblityButton } from "./components/visiblity-button/VisiblityButton";
import { isDefaultVisible } from "./config/common_keys";
import { ASTVisualizer } from "./components/ast-visualizer/ASTVisualizer";
import { useFilteredASTNodes } from "./hooks/useFilteredASTNodes";
import { useSearchTerms } from "./hooks/useSearchTerms";
import { CodeVisualizer } from "./components/code-visulizer/CodeVisualizer";
import { useSourceFileParser } from "./hooks/useSourceFileParser";
import { AppTheme } from "./config/theming";
import { useLocalStore } from "./store/bindings/useLocalStore";
import { settingsStore } from "./store/store";
import { useBindStore } from "./store/bindings/useRetriveFromBinding";
import { useDOMAttribute } from "./store/bindings/useDOMAttribute";

function App() {

   useBindStore({
     defaultState: AppTheme.dracula,
     store: settingsStore.theme,
     bindings: [
       useLocalStore(settingsStore.theme, "theme"),
       useDOMAttribute(settingsStore.theme, "data-theme")
     ]
   });

  const { ast, code, setCode } = useSourceFileParser();
  const { filter, updateFilter } = useFilterBoxState();

  const [filteredSearchKeys, setFilteredSearchKeys] = useState<string[]>([]);

  const searchTerms = useSearchTerms(ast);

  const allKeys = useMemo(
    //Filter out keys with no search terms
    () => Object.entries(searchTerms).map(([key]) => key),
    [searchTerms]
  );

  const searchKeys = useMemo(
    //Filter out keys with no search terms
    () =>
      Object.entries(searchTerms)
        .filter(([_key, value]) => value.length > 0)
        .map(([key]) => key),
    [searchTerms]
  );

  useEffect(() => {
    setFilteredSearchKeys(allKeys.filter(isDefaultVisible));
  }, [allKeys]);

  const filteredASTNodes = useFilteredASTNodes(ast, filter);

  return (
    <div className="flex flex-col h-screen bg-black">
      <div className="flex-1/2 mb-1">
        <NavBar />
      </div>
      <div className="flex-1/4 m-1 p-2 rounded bg-base-200">
        <FileSelect
          onChange={(content, languageName, parserId) =>
            setCode({ content, languageName, parserId })
          }
        />
      </div>
      <div className="flex flex-row flex-1 overflow-hidden">
        <div className="flex-1 overflow-auto h-full m-1 rounded bg-base-200">
          <CodeVisualizer code={code.content} language="javascript" theme={AppTheme.dracula} />
        </div>
        <div className="flex-1 overflow-auto h-full p-3 m-1 rounded bg-base-200">
          <div className="flex">
            <VisiblityButton
              allKeys={allKeys}
              filteredKeys={filteredSearchKeys}
              setFilteredKeys={setFilteredSearchKeys}
            />
            <FilterBox
              filter={filter}
              onChange={updateFilter}
              filterKeyOptions={searchKeys}
              filterTermOptions={searchTerms}
            />
          </div>
          <ASTVisualizer nodes={filteredASTNodes} displayKeys={filteredSearchKeys} />
        </div>
      </div>
    </div>
  );
}

export default App;
