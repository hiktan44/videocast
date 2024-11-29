import React from 'react';

const VideoEffects = ({ effects, onEffectChange }) => {
  const availableEffects = [
    {
      id: 'brightness',
      name: 'Brightness',
      min: -100,
      max: 100,
      default: 0,
    },
    {
      id: 'contrast',
      name: 'Contrast',
      min: -100,
      max: 100,
      default: 0,
    },
    {
      id: 'saturation',
      name: 'Saturation',
      min: -100,
      max: 100,
      default: 0,
    },
    {
      id: 'blur',
      name: 'Blur',
      min: 0,
      max: 20,
      default: 0,
    },
    {
      id: 'sharpness',
      name: 'Sharpness',
      min: -100,
      max: 100,
      default: 0,
    }
  ];

  const handleEffectChange = (effectId, value) => {
    onEffectChange({
      ...effects,
      [effectId]: value
    });
  };

  return (
    <div className="video-effects p-4">
      <h3 className="text-lg font-bold mb-4">Video Effects</h3>
      
      {availableEffects.map((effect) => (
        <div key={effect.id} className="mb-4">
          <label className="block text-sm font-medium mb-2">
            {effect.name}: {effects[effect.id] || effect.default}
          </label>
          <input
            type="range"
            min={effect.min}
            max={effect.max}
            value={effects[effect.id] || effect.default}
            onChange={(e) => handleEffectChange(effect.id, parseInt(e.target.value))}
            className="w-full"
          />
        </div>
      ))}

      {/* Reset Button */}
      <button
        onClick={() => {
          const defaultEffects = {};
          availableEffects.forEach(effect => {
            defaultEffects[effect.id] = effect.default;
          });
          onEffectChange(defaultEffects);
        }}
        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
      >
        Reset Effects
      </button>
    </div>
  );
};

export default VideoEffects;