import { useCallback, useMemo } from "react";
import { languages } from "../../parsers/_parser_constants";
import { useCodeStateStore } from "../../store/store-hooks/useCodeStateStore";
import { generateChecksum } from "../../utils/ChecksumUtils";

const detectLanguage = (file: File) => {
  return languages.find((language) => language.fileExtension === file.name.split(".").pop());
};

export const FileSelect: React.FC = () => {
  const { codeState, setCodeState } = useCodeStateStore();

  const updateCodeState = useCallback(
    (
      file: File,
      content: string,
      languageName: string | undefined,
      parserId: string | undefined
    ) => {
      if (content && languageName && parserId) {
        // Generate checksum for the complete code state
        const checksum = generateChecksum(content, languageName, parserId);

        setCodeState({
          file,
          content,
          languageName,
          parserId,
          checksum,
        });
      }
    },
    [setCodeState]
  );

  const handleSelectedParserIdChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const parserId = event.target.value;
      if (codeState.file) {
        const detectedLanguage = detectLanguage(codeState.file);
        if (detectedLanguage?.parsers.some((parser) => parser.parserId === parserId)) {
          updateCodeState(
            codeState.file,
            codeState.content,
            detectedLanguage?.languageName,
            parserId
          );
        }
      }
    },
    [updateCodeState]
  );

  const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.item(0);
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;

        const detectedLanguage = languages.find(
          (language) => language.fileExtension === file?.name.split(".").pop()
        );

        updateCodeState(
          file,
          content,
          detectedLanguage?.languageName,
          detectedLanguage?.parsers[0].parserId
        );
      };
      reader.readAsText(file);
    }
  };

  const detectedLanguage = useMemo(
    () => (codeState.file ? detectLanguage(codeState.file) : undefined),
    [codeState.file]
  );

  const parserOptions = useMemo(() => {
    return detectedLanguage?.parsers.map((parser) => ({
      label: parser.parserId,
      value: parser.parserId,
    }));
  }, [detectedLanguage]);

  const handleClearFile = useCallback(() => {
    setCodeState({ file: undefined, content: "", languageName: "", parserId: "", checksum: "" });
  }, [setCodeState]);

  return (
    <div className="pl-5 flex flex-row gap-1 items-center">
      <div className="flex items-center gap-4">
        <input type="file" onChange={handleFileInput} className="file-input file-input-sm" />
        {codeState.file && (
          <span className="text-sm text-gray-600">
            Selected: {codeState.file.name} ({(codeState.file.size / 1024).toFixed(1)} KB)
          </span>
        )}
      </div>
      <div className="flex-grow" />
      {codeState.file && (
        <>
          {detectedLanguage ? (
            <div className="text-sm text-gray-500">
              Language from file extension:
              <span className="font-bold text-primary/70 ml-2">
                {detectedLanguage?.languageName}
              </span>
            </div>
          ) : (
            <div className="text-sm text-gray-500">Unknown file extension</div>
          )}
          {detectedLanguage ? (
            <div className="text-sm text-gray-500 px-5">
              <label htmlFor="language-select">Select Parser:</label>
              <select
                className="bg-base-200 ml-2 border border-neutral rounded-md p-0.5 text-primary/70"
                id="language-select"
                value={codeState.parserId}
                onChange={handleSelectedParserIdChange}
              >
                {parserOptions?.map((parser, index) => (
                  <option key={index} value={parser.value}>
                    {parser.label}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <div className="text-sm text-gray-500 px-5">
              No parsers found for this file extension
            </div>
          )}

          <div
            className="cursor-pointer text-[14px] font-mono text-primary/50 hover:text-primary/80 mr-2"
            onClick={handleClearFile}
          >
            Clear File
          </div>
        </>
      )}
    </div>
  );
};
