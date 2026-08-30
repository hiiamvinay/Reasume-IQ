import React, { useRef, useState } from 'react';
import Button from './Button';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  accept?: string;
  label?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  onFileSelect,
  accept = '.pdf,.docx',
  label = 'Upload Resume',
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onFileSelect(file);
  };

  const handleDragEnter = () => setIsDragging(true);
  const handleDragLeave = () => setIsDragging(false);
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) onFileSelect(file);
  };

  return (
    <div
      className={`rounded-2xl border-2 border-dashed transition-all p-8 text-center cursor-pointer ${
        isDragging
          ? 'border-blue-500 bg-blue-500/10 scale-105'
          : 'border-purple-500/50 bg-gradient-to-br from-purple-600/5 to-blue-600/5 hover:border-purple-400'
      }`}
      onClick={() => inputRef.current?.click()}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        type="file"
        ref={inputRef}
        className="hidden"
        accept={accept}
        onChange={handleChange}
      />
      <div className="text-5xl mb-4">📄</div>
      <p className="mb-2 text-white font-semibold text-lg">{label}</p>
      <p className="text-sm text-gray-400">Drag & drop your resume here or click to browse</p>
      <p className="text-xs text-gray-500 mt-3">Supported formats: PDF, DOCX (Max 10MB)</p>
      <Button variant="outline" size="sm" className="mt-4">
        Browse Files
      </Button>
    </div>
  );
};

export default FileUpload;
