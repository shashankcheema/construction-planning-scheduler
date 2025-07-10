import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import { AreaStatement } from '../types';
import { validateFile, validateAreaStatement } from '../utils/validation';

interface FileUploaderProps {
  onFileProcessed: (data: AreaStatement) => void;
  onFileError: (error: string) => void;
  isProcessing: boolean;
  progress: number;
  error: string | null;
}

const FileUploader: React.FC<FileUploaderProps> = ({
  onFileProcessed,
  onFileError,
  isProcessing,
  progress,
  error
}) => {
  const [dragActive, setDragActive] = useState(false);

  const processFile = useCallback(async (file: File) => {
    try {
      // Validate file
      const fileValidation = validateFile(file);
      if (!fileValidation.isValid) {
        onFileError(fileValidation.errors.join(', '));
        return;
      }

      // Read file content
      const text = await file.text();
      let data: any;

      try {
        data = JSON.parse(text);
      } catch (parseError) {
        onFileError('Invalid JSON format. Please check your file.');
        return;
      }

      // Validate data structure
      const dataValidation = validateAreaStatement(data);
      if (!dataValidation.isValid) {
        onFileError(`Data validation failed: ${dataValidation.errors.join(', ')}`);
        return;
      }

      // Process the file
      onFileProcessed(data);
    } catch (err) {
      onFileError(err instanceof Error ? err.message : 'An unexpected error occurred');
    }
  }, [onFileProcessed, onFileError]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      processFile(acceptedFiles[0]);
    }
  }, [processFile]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/json': ['.json']
    },
    multiple: false,
    disabled: isProcessing
  });

  return (
    <div {...getRootProps()} className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors duration-200 ${isDragActive ? 'border-primary-500 bg-primary-50' : 'border-gray-300 bg-white'}`}
      onDragEnter={() => setDragActive(true)}
      onDragLeave={() => setDragActive(false)}
      onDrop={() => setDragActive(false)}
    >
      <input {...getInputProps()} />
      <div className="space-y-4">
        {isProcessing ? (
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="h-12 w-12 text-primary-500 animate-spin" />
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-900">Processing File...</h3>
              <p className="text-sm text-gray-500">Please wait while we analyze your data</p>
            </div>
            {/* Progress Bar */}
            <div className="w-full max-w-md">
              <div className="bg-gray-200 rounded-full h-2">
                <div
                  className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-sm text-gray-600 mt-2">{progress}% complete</p>
            </div>
          </div>
        ) : (
          <>
            <div className="flex justify-center">
              {isDragActive ? (
                <Upload className="h-12 w-12 text-primary-500" />
              ) : (
                <FileText className="h-12 w-12 text-gray-400" />
              )}
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-medium text-gray-900">
                {isDragActive ? 'Drop your file here' : 'Upload Area Statement'}
              </h3>
              <p className="text-sm text-gray-500">
                Drag and drop your JSON file here, or{' '}
                <span className="text-primary-600 font-medium">click to browse</span>
              </p>
              <p className="text-xs text-gray-400">
                Only the new area statement format is supported
              </p>
            </div>
          </>
        )}
      </div>
      {/* Error Display */}
      {error && (
        <div className="bg-error-50 border border-error-200 rounded-lg p-4 mt-4">
          <div className="flex items-start">
            <AlertCircle className="h-5 w-5 text-error-500 mt-0.5 flex-shrink-0" />
            <div className="ml-3">
              <h3 className="text-sm font-medium text-error-800">Upload Error</h3>
              <p className="text-sm text-error-700 mt-1">{error}</p>
            </div>
          </div>
        </div>
      )}
      {/* File Requirements */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
        <div className="flex items-start">
          <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">File Requirements</h3>
            <ul className="text-sm text-blue-700 mt-2 space-y-1">
              <li>• JSON format only</li>
              <li>• Maximum file size: 10MB</li>
              <li>• Must contain valid area statement data</li>
              <li>• Only the new area statement format is supported</li>
            </ul>
          </div>
        </div>
      </div>
      {/* Sample File */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mt-4">
        <h3 className="text-sm font-medium text-gray-800 mb-3">Sample File</h3>
        <button
          onClick={() => {
            fetch('/src/data/area-statement.json')
              .then(response => response.json())
              .then(data => {
                onFileProcessed(data);
              })
              .catch(() => onFileError('Failed to load sample file'));
          }}
          className="text-left p-3 bg-white rounded border border-gray-200 hover:border-primary-300 hover:shadow-sm transition-all duration-200"
          disabled={isProcessing}
        >
          <div className="font-medium text-gray-900">Area Statement Format</div>
          <div className="text-sm text-gray-500">New unified structure</div>
        </button>
      </div>
    </div>
  );
};

export default FileUploader; 