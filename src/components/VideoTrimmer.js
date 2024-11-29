import React from 'react';

const VideoTrimmer = ({
  duration,
  startTime,
  endTime,
  onStartTimeChange,
  onEndTimeChange
}) => {
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="video-trimmer p-4 bg-surface-light dark:bg-surface-dark rounded-lg shadow-md mt-4">
      <h3 className="text-lg font-bold mb-4">Trim Video</h3>
      
      <div className="space-y-4">
        {/* Start Time */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Start Time: {formatTime(startTime)}
          </label>
          <input
            type="range"
            min="0"
            max={endTime}
            value={startTime}
            onChange={(e) => onStartTimeChange(parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-300 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        {/* End Time */}
        <div>
          <label className="block text-sm font-medium mb-2">
            End Time: {formatTime(endTime)}
          </label>
          <input
            type="range"
            min={startTime}
            max={duration}
            value={endTime}
            onChange={(e) => onEndTimeChange(parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-300 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        {/* Duration Info */}
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Selected Duration: {formatTime(endTime - startTime)}
        </div>
      </div>
    </div>
  );
};

export default VideoTrimmer;