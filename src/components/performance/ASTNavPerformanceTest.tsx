import React, { useState, useCallback } from "react";
import { useSourceFileParser } from "../../store/derived-store-hooks/useSourceFileParser";
import { buildSearchIndex } from "../../store/derived-store-hooks/useFilteredASTNodes";
import { getSearchTermsInDepth } from "../../store/derived-store-hooks/useSearchTerms";
import { generateChecksum } from "../../utils/ChecksumUtils";

interface PerformanceMetrics {
  searchTermsTime: number;
  searchIndexTime: number;
  nodeCount: number;
  renderTime: number;
  searchTime: number;
  checksumTime: number;
  checksum: string;
}

interface SearchTest {
  query: string;
  results: number;
  time: number;
}

export const AstNavPerformaceTest: React.FC = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [searchTests, setSearchTests] = useState<SearchTest[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const { ast } = useSourceFileParser();

  const countNodes = useCallback((node: any): number => {
    if (!node || typeof node !== "object") return 0;
    let count = 1;
    for (const key in node) {
      const value = node[key];
      if (Array.isArray(value)) {
        for (const item of value) {
          count += countNodes(item);
        }
      } else if (value && typeof value === "object") {
        count += countNodes(value);
      }
    }
    return count;
  }, []);

  const testCurrentFile = useCallback(() => {
    if (!ast) return;

    setIsRunning(true);

    // Use setTimeout to avoid blocking the UI
    setTimeout(() => {
      try {
        // Test search terms generation
        const searchTermsStart = performance.now();
        const searchTerms = getSearchTermsInDepth(ast);
        const searchTermsEnd = performance.now();

        // Test search index building
        const searchIndexStart = performance.now();
        const searchIndex = buildSearchIndex(ast);
        const searchIndexEnd = performance.now();

        // Test rendering (simulate)
        const renderStart = performance.now();
        const nodeCount = countNodes(ast);
        const renderEnd = performance.now();

        // Test checksum generation
        const checksumStart = performance.now();
        const checksum = generateChecksum(JSON.stringify(ast));
        const checksumEnd = performance.now();

        const metric: PerformanceMetrics = {
          searchTermsTime: searchTermsEnd - searchTermsStart,
          searchIndexTime: searchIndexEnd - searchIndexStart,
          nodeCount,
          renderTime: renderEnd - renderStart,
          searchTime: 0,
          checksumTime: checksumEnd - checksumStart,
          checksum,
        };

        setMetrics(metric);
      } catch (error) {
        console.error("Performance test failed:", error);
      } finally {
        setIsRunning(false);
      }
    }, 0);
  }, [ast, countNodes]);

  const runSearchTests = useCallback(() => {
    if (!ast) return;

    setIsSearching(true);

    setTimeout(() => {
      try {
        const searchIndex = buildSearchIndex(ast);
        const tests: SearchTest[] = [];

        // Test different types of searches
        const searchQueries = [
          { query: "type", description: "Common property search" },
          { query: "name", description: "Name property search" },
          { query: "value", description: "Value property search" },
          { query: "kind", description: "Kind property search" },
          { query: "start", description: "Start position search" },
          { query: "end", description: "End position search" },
          { query: "loc", description: "Location object search" },
          { query: "comments", description: "Comments array search" },
          { query: "leadingComments", description: "Leading comments search" },
          { query: "trailingComments", description: "Trailing comments search" },
        ];

        searchQueries.forEach(({ query, description }) => {
          const searchStart = performance.now();
          const results = searchIndex.get(query) || new Map();
          const totalResults = Array.from(results.values()).flat().length;
          const searchEnd = performance.now();

          tests.push({
            query: `${query} (${description})`,
            results: totalResults,
            time: searchEnd - searchStart,
          });
        });

        // Test complex searches (multiple properties)
        const complexSearchStart = performance.now();
        let complexResults = 0;
        const commonProps = ["type", "name", "value", "kind"];
        commonProps.forEach((prop) => {
          const propResults = searchIndex.get(prop);
          if (propResults) {
            complexResults += Array.from(propResults.values()).flat().length;
          }
        });
        const complexSearchEnd = performance.now();

        tests.push({
          query: "Complex search (type + name + value + kind)",
          results: complexResults,
          time: complexSearchEnd - complexSearchStart,
        });

        // Test full text search simulation
        const fullTextStart = performance.now();
        let fullTextResults = 0;

        searchIndex.forEach((valueMap) => {
          valueMap.forEach((nodes, value) => {
            if (typeof value === "string" && value.length > 0) {
              fullTextResults += nodes.length;
            }
          });
        });

        const fullTextEnd = performance.now();

        tests.push({
          query: "Full text search simulation",
          results: fullTextResults,
          time: fullTextEnd - fullTextStart,
        });

        setSearchTests(tests);

        // Update metrics with average search time
        if (metrics) {
          const avgSearchTime = tests.reduce((sum, test) => sum + test.time, 0) / tests.length;
          setMetrics((prev) => (prev ? { ...prev, searchTime: avgSearchTime } : null));
        }
      } catch (error) {
        console.error("Search tests failed:", error);
      } finally {
        setIsSearching(false);
      }
    }, 0);
  }, [ast, metrics]);

  return (
    <div className="p-4 bg-base-300 rounded-lg mb-4">
      <h3 className="text-lg font-bold mb-4">Performance Test File</h3>

      <div className="flex gap-2 mb-4">
        <button
          onClick={testCurrentFile}
          className="btn btn-primary btn-sm"
          disabled={!ast || isRunning}
        >
          {isRunning ? "Testing..." : "Test Current File"}
        </button>
        <button
          onClick={runSearchTests}
          className="btn btn-secondary btn-sm"
          disabled={!ast || isSearching}
        >
          {isSearching ? "Searching..." : "Test Search Performance"}
        </button>
      </div>

      {metrics && (
        <div className="mb-4">
          <h4 className="font-semibold mb-2">Performance Metrics:</h4>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="font-semibold">Search Term Indexing: </div>{" "}
            <div>{metrics.searchTermsTime.toFixed(2)}ms</div>
            <div className="font-semibold">Search Indexing: </div>{" "}
            <div>{metrics.searchIndexTime.toFixed(2)}ms</div>
            <div className="font-semibold">Approximate Render Time: </div>{" "}
            <div>{metrics.renderTime.toFixed(2)}ms</div>
            <div className="font-semibold">Checksum Generation: </div>{" "}
            <div>{metrics.checksumTime.toFixed(2)}ms</div>
            <div className="font-semibold">Node Count: </div>{" "}
            <div>{metrics.nodeCount.toLocaleString()}</div>
            <div className="font-semibold">Checksum: </div>{" "}
            <div className="font-mono text-xs">{metrics.checksum}</div>
            {metrics.searchTime > 0 && <div>Avg Search: {metrics.searchTime.toFixed(2)}ms</div>}
          </div>
        </div>
      )}

      {searchTests.length > 0 && (
        <div>
          <h4 className="font-semibold mb-2">Search Performance Tests:</h4>
          <div className="overflow-x-auto">
            <table className="table table-xs">
              <thead>
                <tr>
                  <th>Query Type</th>
                  <th>Results</th>
                  <th>Time (ms)</th>
                </tr>
              </thead>
              <tbody>
                {searchTests.map((test, index) => (
                  <tr key={index}>
                    <td className="text-xs">{test.query}</td>
                    <td>{test.results.toLocaleString()}</td>
                    <td>{test.time.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {!ast && <div className="text-sm text-gray-500">Load a file to test performance</div>}
    </div>
  );
};
