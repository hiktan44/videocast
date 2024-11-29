import React, { useRef, useEffect, useState } from 'react';
import VideoControls from './VideoControls';

const VideoPreview = ({ videoFile, effects }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    if (videoFile) {
      const video = videoRef.current;
      video.src = URL.createObjectURL(videoFile);

      video.onloadedmetadata = () => {
        setDuration(video.duration);
      };

      video.ontimeupdate = () => {
        setCurrentTime(video.currentTime);
      };
    }
  }, [videoFile]);

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

      // Apply filters based on effects
      const filters = [];
      if (effects.brightness) filters.push(`brightness(${100 + effects.brightness}%)`);
      if (effects.contrast) filters.push(`contrast(${100 + effects.contrast}%)`);
      if (effects.saturation) filters.push(`saturate(${100 + effects.saturation}%)`);
      if (effects.blur) filters.push(`blur(${effects.blur}px)`);
      if (effects.sharpness) {
        // Simulate sharpness using contrast
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
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleSeek = (time) => {
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleVolumeChange = (newVolume) => {
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      setVolume(newVolume);
    }
  };

  return (
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
  );
};

export default VideoPreview;