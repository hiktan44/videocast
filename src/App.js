import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { ThemeToggle } from './components/ThemeToggle';
import VideoPreview from './components/VideoPreview';
import VideoSettings from './components/VideoSettings';
import VideoEffects from './components/VideoEffects';
import BatchProcessor from './components/BatchProcessor';

function App() {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videoSettings, setVideoSettings] = useState({
    resolution: '1080p',
    quality: 'high',
    fps: 30
  });

  const [videoEffects, setVideoEffects] = useState({
    brightness: 0,
    contrast: 0,
    saturation: 0,
    blur: 0,
    sharpness: 0
  });

  const [trimSettings, setTrimSettings] = useState({
    startTime: 0,
    endTime: 0
  });

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('video/')) {
      setSelectedVideo(file);
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background-light dark:bg-background-dark
                      text-text-light dark:text-text-dark transition-colors">
        <nav className="p-4 bg-surface-light dark:bg-surface-dark shadow-md">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold">VideoCast</h1>
            <ThemeToggle />
          </div>
        </nav>
        
        <main className="container mx-auto p-4">
          <div className="mb-6">
            <input
              type="file"
              accept="video/*"
              onChange={handleFileSelect}
              className="w-full p-2 border rounded bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <VideoPreview
                videoFile={selectedVideo}
                effects={videoEffects}
                onTrimChange={setTrimSettings}
              />
            </div>

            <div className="space-y-6">
              <VideoSettings
                settings={videoSettings}
                onSettingsChange={setVideoSettings}
              />
              <VideoEffects
                effects={videoEffects}
                onEffectChange={setVideoEffects}
              />
            </div>
          </div>

          <div className="mt-6">
            <BatchProcessor />
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;