import React from 'react';

const VideoSettings = ({ settings, onSettingsChange }) => {
  const resolutions = [
    { label: '4K (2160p)', value: '2160p' },
    { label: '1440p', value: '1440p' },
    { label: '1080p', value: '1080p' },
    { label: '720p', value: '720p' },
    { label: '480p', value: '480p' }
  ];

  const qualities = ['highest', 'high', 'medium', 'low'];

  return (
    <div className="p-4 bg-surface-light dark:bg-surface-dark rounded-lg shadow-md">
      <h3 className="text-lg font-bold mb-4">Video Settings</h3>
      
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Resolution</label>
        <select
          value={settings.resolution}
          onChange={(e) => onSettingsChange({ ...settings, resolution: e.target.value })}
          className="w-full p-2 border rounded bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
        >
          {resolutions.map((res) => (
            <option key={res.value} value={res.value}>
              {res.label}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Quality</label>
        <select
          value={settings.quality}
          onChange={(e) => onSettingsChange({ ...settings, quality: e.target.value })}
          className="w-full p-2 border rounded bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
        >
          {qualities.map((quality) => (
            <option key={quality} value={quality}>
              {quality.charAt(0).toUpperCase() + quality.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">FPS</label>
        <input
          type="number"
          value={settings.fps}
          onChange={(e) => onSettingsChange({ ...settings, fps: parseInt(e.target.value) })}
          min="1"
          max="60"
          className="w-full p-2 border rounded bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
        />
      </div>
    </div>
  );
};

export default VideoSettings;