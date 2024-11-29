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
    <div className="video-settings p-4">
      <h3 className="text-lg font-bold mb-4">Video Settings</h3>
      
      {/* Resolution Setting */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Resolution</label>
        <select
          value={settings.resolution}
          onChange={(e) => onSettingsChange({ ...settings, resolution: e.target.value })}
          className="w-full p-2 border rounded"
        >
          {resolutions.map((res) => (
            <option key={res.value} value={res.value}>
              {res.label}
            </option>
          ))}
        </select>
      </div>

      {/* Quality Setting */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Quality</label>
        <select
          value={settings.quality}
          onChange={(e) => onSettingsChange({ ...settings, quality: e.target.value })}
          className="w-full p-2 border rounded"
        >
          {qualities.map((quality) => (
            <option key={quality} value={quality}>
              {quality.charAt(0).toUpperCase() + quality.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* FPS Setting */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">FPS</label>
        <input
          type="number"
          value={settings.fps}
          onChange={(e) => onSettingsChange({ ...settings, fps: parseInt(e.target.value) })}
          min="1"
          max="60"
          className="w-full p-2 border rounded"
        />
      </div>
    </div>
  );
};

export default VideoSettings;