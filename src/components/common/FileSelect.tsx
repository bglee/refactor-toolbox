interface FileSelectProps {
  onChange: (content: string) => void;
}

export const FileSelect: React.FC<FileSelectProps> = ({ onChange }) => {
  const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.item(0);
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        onChange(content);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="pl-5">
      <input type="file" onChange={handleFileInput} />
    </div>
  );
};
