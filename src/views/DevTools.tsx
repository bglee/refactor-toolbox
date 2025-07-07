import React from "react";
import { MaterialIcon } from "../components/common/MaterialIcon";
import { AstNavPerformaceTest } from "../components/performance/ASTNavPerformanceTest";

const DevTools: React.FC = () => {
  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="bg-base-200 rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-6 flex items-center">
          <MaterialIcon name="bug_report" className="mr-3" />
          Developer Tools
        </h1>

        <div className="space-y-8">
          {/* Performance Testing Section */}
          <div className="bg-base-100 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Performance Testing</h2>
            <p className="text-base-content/70 mb-4">
              Test and analyze the performance of AST navigation and search functionality.
            </p>

            <AstNavPerformaceTest />
          </div>

          {/* Future Dev Tools Sections */}
          <div className="bg-base-100 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Additional Tools</h2>
            <p className="text-base-content/70">
              More developer tools and utilities will be added here in the future.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DevTools;
