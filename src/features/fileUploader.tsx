import React, { useState, useEffect } from 'react';
import { notifyError } from 'services/notifications';

interface FileUploaderProps {
  onFileUpload: (file: File) => void;
  setFileUrl: (url: string | null) => void;
}

const FileUploader = ({
  onFileUpload,
  setFileUrl,
}: FileUploaderProps): JSX.Element => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const handleDragEnter = (event: DragEvent) => {
      event.preventDefault();
    };

    const handleDragOver = (event: DragEvent) => {
      event.preventDefault();
    };

    const handleDragLeave = (event: DragEvent) => {
      event.preventDefault();
      setIsDragging(false);
    };

    const handleDrop = (event: DragEvent) => {
      event.preventDefault();
      setIsDragging(false);
    };

    document.addEventListener('dragenter', handleDragEnter);
    document.addEventListener('dragover', handleDragOver);
    document.addEventListener('dragleave', handleDragLeave);
    document.addEventListener('drop', handleDrop);

    return () => {
      document.removeEventListener('dragenter', handleDragEnter);
      document.removeEventListener('dragover', handleDragOver);
      document.removeEventListener('dragleave', handleDragLeave);
      document.removeEventListener('drop', handleDrop);
    };
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'text/csv') {
      setSelectedFile(file);
      onFileUpload(file);
    } else {
      notifyError('Please select a CSV file.');
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file && file.type === 'text/csv') {
      setSelectedFile(file);
      onFileUpload(file);
    } else {
      notifyError('Please drop a CSV file.');
    }
    setIsDragging(false);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  return (
    <div
      className={`p-4 border-2 rounded-lg ${
        isDragging ? 'border-blue-500' : 'border-dashed'
      }`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      {selectedFile ? (
        <div>
          <p>Selected file: {selectedFile.name}</p>
          <button
            className="px-4 py-2 mt-4 bg-red-500 text-white rounded"
            onClick={() => {
              setSelectedFile(null);
              setFileUrl(null);
            }}
          >
            Clear
          </button>
        </div>
      ) : (
        <div>
          <p>Drag and drop a CSV file here or click to select a file.</p>
          <input
            type="file"
            accept=".csv"
            id="fileInput"
            onChange={handleFileChange}
            className="hidden"
          />
          <button
            className="px-4 py-2 mt-4 bg-blue-500 text-white rounded"
            onClick={() => document.getElementById('fileInput')?.click()}
          >
            Select File
          </button>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
