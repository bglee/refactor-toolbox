import React, { useState, useCallback } from "react";
import { buildSearchIndex } from "../../store/derived-store-hooks/useFilteredASTNodes";
import { getSearchTermsInDepth } from "../../store/derived-store-hooks/useSearchTerms";
import { generateChecksum } from "../../utils/ChecksumUtils";
import { languages } from "../../parsers/_parser_constants";
import { ASTNode } from "../../model/AstNode";

interface PerformanceMetrics {
  parseTime: number;
  searchTermsTime: number;
  searchIndexTime: number;
  nodeCount: number;
  searchTime: number;
  checksumTime: number;
  checksum: string;
  parserUsed: string;
  fileSize: number;
}

interface SearchTest {
  query: string;
  results: number;
  time: number;
}

export const AstNavPerformaceTest: React.FC = () => {
  // Never use app state here. Its all useState for perf testing.
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [searchTests, setSearchTests] = useState<SearchTest[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [ast, setAst] = useState<ASTNode | null>(null);
  const [selectedParser, setSelectedParser] = useState<string>("");
  const [fileContent, setFileContent] = useState<string>("");
  const [loadingStep, setLoadingStep] = useState<string>("");

  const detectLanguage = useCallback((file: File) => {
    return languages.find((language) => language.fileExtension === file.name.split(".").pop());
  }, []);

  const handleFileInput = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.item(0);
      if (file) {
        // Clear previous stats when new file is selected
        setMetrics(null);
        setSearchTests([]);
        setAst(null);

        setSelectedFile(file);
        const reader = new FileReader();
        reader.onload = (e) => {
          const content = e.target?.result as string;
          setFileContent(content);

          const detectedLanguage = detectLanguage(file);
          if (detectedLanguage) {
            setSelectedParser(detectedLanguage.parsers[0].parserId);
          }
        };
        reader.readAsText(file);
      }
    },
    [detectLanguage]
  );

  const parseAST = useCallback(() => {
    if (!selectedFile || !fileContent || !selectedParser) {
      console.log("Missing required data for parsing:", {
        hasFile: !!selectedFile,
        hasContent: !!fileContent,
        hasParser: !!selectedParser,
      });
      return null;
    }

    const detectedLanguage = detectLanguage(selectedFile);
    if (!detectedLanguage) {
      console.log("No language detected for file:", selectedFile.name);
      return null;
    }

    try {
      const parseStart = performance.now();
      const parsedAST = detectedLanguage.parse(fileContent, selectedParser);
      const parseEnd = performance.now();

      if (!parsedAST) {
        console.log(
          "Parser returned null AST for:",
          selectedFile.name,
          "with parser:",
          selectedParser
        );
        return null;
      }

      setAst(parsedAST);
      return { ast: parsedAST, parseTime: parseEnd - parseStart };
    } catch (error) {
      console.error(
        "AST parsing failed for file:",
        selectedFile.name,
        "with parser:",
        selectedParser,
        error
      );
      return null;
    }
  }, [selectedFile, fileContent, selectedParser, detectLanguage]);

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
    if (!selectedFile || !fileContent || !selectedParser) return;

    setIsRunning(true);
    setLoadingStep("Starting performance test...");

    // Add a timeout to prevent stuck loading state
    const timeoutId = setTimeout(() => {
      console.error("Performance test timed out");
      setLoadingStep("Test timed out");
      setIsRunning(false);
      setMetrics(null);
    }, 30000); // 30 second timeout

    // Use setTimeout to avoid blocking the UI
    setTimeout(() => {
      try {
        // Parse AST first
        setLoadingStep("Parsing AST...");
        const parseResult = parseAST();
        if (!parseResult) {
          throw new Error("AST parsing failed");
        }

        const { ast: parsedAST, parseTime } = parseResult;

        if (!parsedAST) {
          throw new Error("AST parsing returned null");
        }

        // Test search terms generation
        setLoadingStep("Generating search terms...");
        const searchTermsStart = performance.now();
        const searchTerms = getSearchTermsInDepth(parsedAST);
        const searchTermsEnd = performance.now();

        // Test search index building
        setLoadingStep("Building search index...");
        const searchIndexStart = performance.now();
        const searchIndex = buildSearchIndex(parsedAST);
        const searchIndexEnd = performance.now();

        // Count nodes
        setLoadingStep("Counting nodes...");
        const nodeCount = countNodes(parsedAST);

        // Test checksum generation
        setLoadingStep("Generating checksum...");
        const checksumStart = performance.now();
        const checksum = generateChecksum(JSON.stringify(parsedAST));
        const checksumEnd = performance.now();

        setLoadingStep("Finalizing results...");

        const metric: PerformanceMetrics = {
          parseTime,
          searchTermsTime: searchTermsEnd - searchTermsStart,
          searchIndexTime: searchIndexEnd - searchIndexStart,
          nodeCount,
          searchTime: 0,
          checksumTime: checksumEnd - checksumStart,
          checksum,
          parserUsed: selectedParser,
          fileSize: selectedFile.size,
        };

        setMetrics(metric);
        setLoadingStep("");
        clearTimeout(timeoutId);
      } catch (error) {
        console.error("Performance test failed:", error);
        setLoadingStep("Error occurred during test");
        // Clear any partial results on error
        setMetrics(null);
        clearTimeout(timeoutId);
      } finally {
        setIsRunning(false);
      }
    }, 0);
  }, [selectedFile, fileContent, selectedParser, parseAST, countNodes]);

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
      <h3 className="text-lg font-bold mb-4">AST Performance Test</h3>

      {/* File Selection */}
      <div className="mb-4">
        <div className="flex items-center gap-4 mb-2">
          <input type="file" onChange={handleFileInput} className="file-input file-input-sm" />
          {selectedFile && (
            <span className="text-sm text-gray-600">
              Selected: {selectedFile.name} ({(selectedFile.size / 1024).toFixed(1)} KB)
            </span>
          )}
        </div>

        {selectedFile && (
          <div className="flex items-center gap-4 mb-2">
            <span className="text-sm">Parser:</span>
            <select
              className="select select-sm"
              value={selectedParser}
              onChange={(e) => setSelectedParser(e.target.value)}
            >
              {detectLanguage(selectedFile)?.parsers.map((parser) => (
                <option key={parser.parserId} value={parser.parserId}>
                  {parser.parserId}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      <div className="flex gap-2 mb-4">
        <button
          onClick={testCurrentFile}
          className="btn btn-primary btn-sm"
          disabled={!selectedFile || !fileContent || !selectedParser || isRunning}
        >
          {isRunning ? (
            <div className="flex items-center gap-2">
              <span className="loading loading-spinner loading-sm"></span>
              Testing...
            </div>
          ) : (
            "Run Performance Test"
          )}
        </button>
        <button
          onClick={runSearchTests}
          className="btn btn-secondary btn-sm"
          disabled={!ast || isSearching}
        >
          {isSearching ? (
            <div className="flex items-center gap-2">
              <span className="loading loading-spinner loading-sm"></span>
              Searching...
            </div>
          ) : (
            "Test Search Performance"
          )}
        </button>
      </div>

      {/* Loading Progress */}
      {isRunning && loadingStep && (
        <div className="mb-4 p-3 bg-base-200 rounded-lg">
          <div className="flex items-center gap-2">
            <span className="loading loading-spinner loading-sm"></span>
            <span className="text-sm font-medium">{loadingStep}</span>
          </div>
        </div>
      )}

      {metrics && (
        <div className="mb-4">
          <h4 className="font-semibold mb-2">Performance Metrics:</h4>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="font-semibold">AST Parsing: </div>{" "}
            <div>{metrics.parseTime.toFixed(2)}ms</div>
            <div className="font-semibold">Search Term Indexing: </div>{" "}
            <div>{metrics.searchTermsTime.toFixed(2)}ms</div>
            <div className="font-semibold">Search Indexing: </div>{" "}
            <div>{metrics.searchIndexTime.toFixed(2)}ms</div>
            <div className="font-semibold">Checksum Generation: </div>{" "}
            <div>{metrics.checksumTime.toFixed(2)}ms</div>
            <div className="font-semibold">Node Count: </div>{" "}
            <div>{metrics.nodeCount.toLocaleString()}</div>
            <div className="font-semibold">File Size: </div>{" "}
            <div>{(metrics.fileSize / 1024).toFixed(1)} KB</div>
            <div className="font-semibold">Parser Used: </div> <div>{metrics.parserUsed}</div>
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

      {!metrics && !isRunning && (
        <div className="text-sm text-gray-500">
          Select a file and run performance test to see results
        </div>
      )}
    </div>
  );
};
