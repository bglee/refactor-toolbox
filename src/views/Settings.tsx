import React from "react";
import { MaterialIcon } from "../components/common/MaterialIcon";
import { useThemeStore } from "../store/store-hooks/useThemeStore";
import { AppTheme, codeBlockThemeMap } from "../config/theming";

export const Settings: React.FC = () => {
  const { theme: currentTheme, setTheme } = useThemeStore();

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="bg-base-200 rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-6 flex items-center">
          <MaterialIcon name="settings" className="mr-3" />
          Settings
        </h1>
        
        <div className="space-y-8">
          {/* Theme Section */}
          <div className="bg-base-100 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Theme</h2>
            <p className="text-base-content/70 mb-4">
              Choose your preferred theme for the application.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.values(AppTheme)
                .filter((value) => codeBlockThemeMap.has(value))
                .map((theme) => (
                  <div
                    key={theme}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      currentTheme === theme
                        ? "border-primary bg-primary/10"
                        : "border-base-300 hover:border-base-content/30"
                    }`}
                    onClick={() => setTheme(theme as AppTheme)}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium capitalize">
                        {theme.toString().replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                      {currentTheme === theme && (
                        <MaterialIcon name="check" className="text-primary" />
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Future Settings Sections */}
          <div className="bg-base-100 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Preferences</h2>
            <p className="text-base-content/70">
              Additional settings will be added here in the future.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}; 