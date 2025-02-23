import { useEffect, useMemo, useState } from "react";
import { languages } from "../../parsers/_parser_constants";

interface FileSelectProps {
  onChange: (content: string, languageName: string, parserId: string) => void;
}

export const FileSelect: React.FC<FileSelectProps> = ({ onChange }) => {
  const [content, setContent] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [selectedParserId, setSelectedParserId] = useState<string | undefined>(undefined);

  const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.item(0);
    if (file) {
      setFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;

        const detectedLanguage = languages.find(
          (language) => language.fileExtension === file?.name.split(".").pop()
        );

        setContent(content);
        setSelectedParserId(detectedLanguage?.parsers[0].parserId);
      };
      reader.readAsText(file);
    }
  };

  const detectedLanguage = useMemo(() => {
    return languages.find((language) => language.fileExtension === file?.name.split(".").pop());
  }, [file]);

  const parserOptions = useMemo(() => {
    return detectedLanguage?.parsers.map((parser) => ({
      label: parser.parserId,
      value: parser.parserId,
    }));
  }, [detectedLanguage]);

  useEffect(() => {
    if (content && detectedLanguage && selectedParserId) {
      onChange(content, detectedLanguage.languageName, selectedParserId);
    }
  }, [content, detectedLanguage, selectedParserId]);

  return (
    <div className="pl-5 flex flex-row gap-1 items-center">
      <input type="file" onChange={handleFileInput} />
      <div className="flex-grow" />
      {file && (
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
                className="ml-2 border border-neutral rounded-md p-0.5 text-primary/70"
                id="language-select"
                value={selectedParserId}
                onChange={(e) => setSelectedParserId(e.target.value)}
              >
                {parserOptions?.map((parser) => (
                  <option value={parser.value}>{parser.label}</option>
                ))}
              </select>
            </div>
          ) : (
            <div className="text-sm text-gray-500 px-5">
              No parsers found for this file extension
            </div>
          )}
        </>
      )}
    </div>
  );
};
