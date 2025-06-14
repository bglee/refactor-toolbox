import { NavBar } from "./components/navigation/HeaderBar";
import { FilterBox } from "./components/filter/FilterBox";
import { FileSelect } from "./components/file-select/FileSelect";
import { VisiblityButton } from "./components/visiblity-button/VisiblityButton";
import { ASTVisualizer } from "./components/ast-visualizer/ASTVisualizer";
import { CodeVisualizer } from "./components/code-visulizer/CodeVisualizer";
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


  return (
    <div className="flex flex-col h-screen bg-black">
      <div className="flex-1/2 mb-1">
        <NavBar />
      </div>
      <div className="flex-1/4 m-1 p-2 rounded bg-base-200">
        <FileSelect/>
      </div>
      <div className="flex flex-row flex-1 overflow-hidden">
        <div className="flex-1 overflow-auto h-full m-1 rounded bg-base-200">
          <CodeVisualizer/>
        </div>
        <div className="flex-1 overflow-auto h-full p-3 m-1 rounded bg-base-200">
          <div className="flex">
            <VisiblityButton/>
            <FilterBox/>
          </div>
          <ASTVisualizer/>
        </div>
      </div>
    </div>
  );
}

export default App;
