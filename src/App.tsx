import { AppTheme } from "./config/theming";
import { useLocalStore } from "./store/bindings/useLocalStore";
import { settingsStore } from "./store/store";
import { useBindStore } from "./store/bindings/useRetriveFromBinding";
import { useDOMAttribute } from "./store/bindings/useDOMAttribute";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

const router = createRouter({ routeTree });

const App = () => {
  useBindStore({
    defaultState: AppTheme.dracula,
    store: settingsStore.theme,
    bindings: [
      useLocalStore(settingsStore.theme, "theme"),
      useDOMAttribute(settingsStore.theme, "data-theme"),
    ],
  });

  return (
    <div className="flex flex-col h-screen bg-base-100">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
