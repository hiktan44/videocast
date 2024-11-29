import React, { useRef, useEffect } from 'react';

const VideoPreview = ({ videoFile, effects }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (videoFile) {
      const video = videoRef.current;
      video.src = URL.createObjectURL(videoFile);
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

      ctx.filter = filters.join(' ');
      ctx.drawImage(canvas, 0, 0);

      requestAnimationFrame(applyEffects);
    };

    video.addEventListener('play', applyEffects);

    return () => {
      video.removeEventListener('play', applyEffects);
    };
  }, [effects]);

  return (
    <div className="video-preview relative">
      <video
        ref={videoRef}
        className="hidden"
        autoPlay
        loop
        muted
      />
      <canvas
        ref={canvasRef}
        className="w-full h-full rounded-lg shadow-lg"
      />
    </div>
  );
};

export default VideoPreview;