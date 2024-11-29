# Arka Plan Özelleştirme Örnekleri

## 1. Bulanık Arka Plan

```python
from videocast.video_generator import VideoGenerator

# Bulanık arka plan ayarları
config = {
    'huggingface_token': 'YOUR_TOKEN',
    'background_mode': 'blur',
    'blur_strength': 15  # Bulanıklık seviyesi
}

generator = VideoGenerator(config)
generator.generate_video(
    source_image='kaynak.jpg',
    audio_file='ses.wav',
    output_path='video_blur.mp4'
)
```

## 2. Özel Arka Plan Görüntüsü

```python
# Özel arka plan ayarları
config = {
    'huggingface_token': 'YOUR_TOKEN',
    'background_mode': 'custom',
    'background_image': 'arkaplan.jpg'
}

generator = VideoGenerator(config)
generator.generate_video(
    source_image='kaynak.jpg',
    audio_file='ses.wav',
    output_path='video_custom_bg.mp4'
)
```

## 3. Yeşil Perde (Chroma Key)

```python
config = {
    'huggingface_token': 'YOUR_TOKEN',
    'background_mode': 'chroma',
    'chroma_color': [0, 255, 0],  # Yeşil
    'chroma_threshold': 50        # Hassasiyet
}

generator = VideoGenerator(config)
generator.generate_video(
    source_image='kaynak.jpg',
    audio_file='ses.wav',
    output_path='video_chroma.mp4'
)
```

## 4. Video Arka Plan

```python
config = {
    'huggingface_token': 'YOUR_TOKEN',
    'background_mode': 'video',
    'background_video': 'arkaplan.mp4'
}

generator = VideoGenerator(config)
generator.generate_video(
    source_image='kaynak.jpg',
    audio_file='ses.wav',
    output_path='video_dynamic_bg.mp4'
)
```