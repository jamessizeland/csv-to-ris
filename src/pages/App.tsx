import { useState } from 'react';
import FileUploader from 'features/fileUploader';
import convertCsvToRis from 'services/csvToRis';

const App = (): JSX.Element => {
  const [risFileUrl, setRisFileUrl] = useState<string | null>(null);

  const handleFileUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const output = convertCsvToRis(content);
      const blob = new Blob([output], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      setRisFileUrl(url);
    };
    reader.readAsText(file);
  };

  return (
    <div className="m-2">
      <div className="flex flex-col">
        <FileUploader
          onFileUpload={handleFileUpload}
          setFileUrl={setRisFileUrl}
        />
        {risFileUrl && (
          <a
            href={risFileUrl}
            download="output.ris"
            className="mt-4 p-2 bg-blue-500 text-white rounded"
          >
            Download RIS File
          </a>
        )}
      </div>
    </div>
  );
};

export default App;
