import { CodeBlock, dracula } from "react-code-blocks";
import { NavBar } from "./components/navigation/NavBar";
import { FilterBox, useFilterBoxState } from "./components/filter/FilterBox";
import { FileSelect } from "./components/common/FileSelect";
import { useAstParser } from "./hooks/useAstParser";
import { useEffect, useMemo, useState } from "react";
import { VisiblityButton } from "./components/visiblity-button/VisiblityButton";
import { isDefaultVisible } from "./config/common_keys";
import { ASTVisualizer } from "./components/ast-visualizer/ASTVisualizer";
import { useFilteredASTNodes } from "./hooks/useFilteredASTNodes";
import { useSearchTerms } from "./hooks/useSearchTerms";

function App() {
  const [code, setCode] = useState<string>("");
  const astNode = useAstParser(code);
  const { filter, updateFilter } = useFilterBoxState();
  const [filteredSearchKeys, setFilteredSearchKeys] = useState<string[]>([]);

  const searchTerms = useSearchTerms(astNode);

  const allKeys = useMemo(
    //Filter out keys with no search terms
    () => Object.entries(searchTerms).map(([key]) => key),
    [searchTerms],
  );

  const searchKeys = useMemo(
    //Filter out keys with no search terms
    () =>
      Object.entries(searchTerms)
        .filter(([_key, value]) => value.length > 0)
        .map(([key]) => key),
    [searchTerms],
  );

  useEffect(() => {
    setFilteredSearchKeys(allKeys.filter(isDefaultVisible));
  }, [allKeys]);

  const filteredASTNodes = useFilteredASTNodes(astNode, filter);

  return (
    <div className="flex flex-col h-screen bg-black">
      <div className="flex-1/2 mb-1">
        <NavBar />
      </div>
      <div className="flex-1/4 m-1 p-2 rounded bg-base-200">
        <FileSelect onChange={setCode} />
      </div>
      <div className="flex flex-row flex-1 overflow-hidden">
        <div className="flex-1 overflow-auto h-full m-1 rounded bg-base-200">
          <CodeBlock
            text={code}
            language="javascript"
            showLineNumbers={true}
            theme={dracula}
          />
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
          <ASTVisualizer
            mainNode={filteredASTNodes}
            displayKeys={filteredSearchKeys}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
