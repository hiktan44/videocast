import React, { useState } from 'react';

const BatchProcessor = () => {
  const [files, setFiles] = useState([]);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState({});

  const handleFileSelect = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFiles(prevFiles => [...prevFiles, ...selectedFiles]);
  };

  const removeFile = (index) => {
    setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
  };

  const startBatchProcessing = async () => {
    setProcessing(true);
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      
      // Update progress
      setProgress(prev => ({
        ...prev,
        [file.name]: {
          status: 'processing',
          percent: 0
        }
      }));

      try {
        // Process file here
        // Update progress as processing continues
        setProgress(prev => ({
          ...prev,
          [file.name]: {
            status: 'complete',
            percent: 100
          }
        }));
      } catch (error) {
        setProgress(prev => ({
          ...prev,
          [file.name]: {
            status: 'error',
            error: error.message
          }
        }));
      }
    }

    setProcessing(false);
  };

  return (
    <div className="batch-processor p-4">
      <h3 className="text-lg font-bold mb-4">Batch Processing</h3>
      
      {/* File Input */}
      <div className="mb-4">
        <input
          type="file"
          multiple
          onChange={handleFileSelect}
          accept="video/*"
          className="w-full p-2 border rounded"
        />
      </div>

      {/* File List */}
      <div className="mb-4">
        {files.map((file, index) => (
          <div key={index} className="flex items-center justify-between p-2 border-b">
            <span>{file.name}</span>
            <div className="flex items-center">
              {progress[file.name] && (
                <div className="mr-4">
                  {progress[file.name].status === 'processing' && (
                    <span>{progress[file.name].percent}%</span>
                  )}
                  {progress[file.name].status === 'complete' && (
                    <span className="text-green-500">Complete</span>
                  )}
                  {progress[file.name].status === 'error' && (
                    <span className="text-red-500">Error</span>
                  )}
                </div>
              )}
              <button
                onClick={() => removeFile(index)}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Process Button */}
      {files.length > 0 && (
        <button
          onClick={startBatchProcessing}
          disabled={processing}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
        >
          {processing ? 'Processing...' : 'Start Processing'}
        </button>
      )}
    </div>
  );
};

export default BatchProcessor;