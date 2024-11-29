import { useState, useCallback } from 'react';

export const useVideoProcessor = () => {
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState({});
  const [error, setError] = useState(null);

  const processVideo = useCallback(async (video, settings, effects) => {
    setProcessing(true);
    setError(null);

    try {
      // Create worker instance
      const worker = new Worker(
        new URL('../workers/videoProcessor.worker.js', import.meta.url)
      );

      // Handle worker messages
      worker.onmessage = (e) => {
        const { type, progress, result, error } = e.data;

        switch (type) {
          case 'progress':
            setProgress(prev => ({
              ...prev,
              [video.name]: progress
            }));
            break;

          case 'complete':
            setProgress(prev => ({
              ...prev,
              [video.name]: 100
            }));
            // Handle completed video
            break;

          case 'error':
            setError(error);
            break;
        }
      };

      // Start processing
      worker.postMessage({ video, settings, effects });

      return () => worker.terminate();
    } catch (err) {
      setError(err.message);
    } finally {
      setProcessing(false);
    }
  }, []);

  return {
    processing,
    progress,
    error,
    processVideo
  };
};

export default useVideoProcessor;