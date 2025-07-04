import { ASTVisualizer } from "../components/ast-visualizer/ASTVisualizer";
import { CodeVisualizer } from "../components/code-visulizer/CodeVisualizer";
import { FileSelect } from "../components/file-select/FileSelect";
import { FilterBox } from "../components/filter/FilterBox";
import { VisiblityButton } from "../components/visiblity-button/VisiblityButton";

const ASTPowerSearch = () => {
  return (
    <>
      <div className="flex-1/4 m-1 p-2 rounded bg-base-200">
        <FileSelect />
      </div>
      <div className="flex flex-row flex-1 overflow-hidden">
        <div className="flex-1 overflow-auto h-full m-1 rounded bg-base-200">
          <CodeVisualizer />
        </div>
        <div className="flex-1 overflow-auto h-full p-3 m-1 rounded bg-base-200">
          <div className="flex">
            <VisiblityButton />
            <FilterBox />
          </div>
          <ASTVisualizer />
        </div>
      </div>
    </>
  );
};

export default ASTPowerSearch;
