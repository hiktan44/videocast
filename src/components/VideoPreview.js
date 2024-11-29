import React, { useRef, useEffect, useState } from 'react';
import VideoControls from './VideoControls';
import VideoTrimmer from './VideoTrimmer';

const VideoPreview = ({ videoFile, effects, onTrimChange }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);

  useEffect(() => {
    if (videoFile) {
      const video = videoRef.current;
      video.src = URL.createObjectURL(videoFile);

      video.onloadedmetadata = () => {
        setDuration(video.duration);
        setEndTime(video.duration);
      };

      video.ontimeupdate = () => {
        setCurrentTime(video.currentTime);
        
        // Loop video within trim points
        if (video.currentTime >= endTime) {
          video.currentTime = startTime;
          if (isPlaying) video.play();
        }
      };
    }

    return () => {
      if (videoFile) {
        URL.revokeObjectURL(videoRef.current.src);
      }
    };
  }, [videoFile, startTime, endTime, isPlaying]);

  useEffect(() => {
    if (!videoRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const applyEffects = () => {
      if (video.paused || video.ended) return;

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      const filters = [];
      if (effects.brightness) filters.push(`brightness(${100 + effects.brightness}%)`);
      if (effects.contrast) filters.push(`contrast(${100 + effects.contrast}%)`);
      if (effects.saturation) filters.push(`saturate(${100 + effects.saturation}%)`);
      if (effects.blur) filters.push(`blur(${effects.blur}px)`);
      if (effects.sharpness) {
        const sharpnessContrast = Math.max(100, 100 + effects.sharpness);
        filters.push(`contrast(${sharpnessContrast}%)`);
      }

      ctx.filter = filters.join(' ');
      ctx.drawImage(canvas, 0, 0);

      requestAnimationFrame(applyEffects);
    };

    if (isPlaying) {
      video.play();
      applyEffects();
    } else {
      video.pause();
    }

    return () => {
      video.pause();
    };
  }, [effects, isPlaying]);

  const handlePlay = () => {
    if (videoRef.current) {
      // If at the end of trim range, reset to start
      if (currentTime >= endTime) {
        videoRef.current.currentTime = startTime;
      }
      setIsPlaying(true);
    }
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleSeek = (time) => {
    if (videoRef.current) {
      // Keep seeking within trim range
      const newTime = Math.max(startTime, Math.min(time, endTime));
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleVolumeChange = (newVolume) => {
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      setVolume(newVolume);
    }
  };

  const handleStartTimeChange = (newStartTime) => {
    setStartTime(newStartTime);
    if (currentTime < newStartTime) {
      handleSeek(newStartTime);
    }
    onTrimChange?.({ startTime: newStartTime, endTime });
  };

  const handleEndTimeChange = (newEndTime) => {
    setEndTime(newEndTime);
    if (currentTime > newEndTime) {
      handleSeek(newEndTime);
    }
    onTrimChange?.({ startTime, endTime: newEndTime });
  };

  return (
    <div className="space-y-4">
      <div className="video-preview relative bg-surface-light dark:bg-surface-dark rounded-lg shadow-md overflow-hidden">
        <h3 className="text-lg font-bold p-4">Video Preview</h3>
        
        <div className="relative aspect-video bg-black">
          <video
            ref={videoRef}
            className="hidden"
            muted={volume === 0}
          />
          <canvas
            ref={canvasRef}
            className="w-full h-full"
          />
          {!videoFile && (
            <div className="absolute inset-0 flex items-center justify-center text-gray-500 dark:text-gray-400">
              No video selected
            </div>
          )}
        </div>

        {videoFile && (
          <VideoControls
            currentTime={currentTime}
            duration={duration}
            isPlaying={isPlaying}
            onPlay={handlePlay}
            onPause={handlePause}
            onSeek={handleSeek}
            volume={volume}
            onVolumeChange={handleVolumeChange}
          />
        )}
      </div>

      {videoFile && (
        <VideoTrimmer
          duration={duration}
          startTime={startTime}
          endTime={endTime}
          onStartTimeChange={handleStartTimeChange}
          onEndTimeChange={handleEndTimeChange}
        />
      )}
    </div>
  );
};

export default VideoPreview;