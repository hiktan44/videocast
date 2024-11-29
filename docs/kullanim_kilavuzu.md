# VideoCast Kullanım Kılavuzu

## İçindekiler

1. [Başlangıç](#başlangıç)
2. [Temel Kullanım](#temel-kullanım)
3. [Gelişmiş Özellikler](#gelişmiş-özellikler)
4. [Sorun Giderme](#sorun-giderme)

## Başlangıç

### Ortam Hazırlığı

```bash
# Virtual environment oluştur
conda create --name videocast python=3.8
conda activate videocast

# Projeyi klonla
git clone https://github.com/hiktan44/videocast.git
cd videocast

# Bağımlılıkları yükle
pip install -r requirements.txt
```

### Hugging Face Kurulumu

1. [Hugging Face](https://huggingface.co) hesabı oluşturun
2. Settings -> Access Tokens -> New Token
3. Token'ı config.py dosyasına ekleyin

## Temel Kullanım

### 1. Kaynak Dosyaların Hazırlanması

- Kaynak resim gereksinimleri:
  - 512x512 piksel boyutunda
  - Yüz, resmin %50-70'ini kaplamalı
  - İyi aydınlatılmış, net bir yüz görüntüsü

- Ses dosyası gereksinimleri:
  - WAV formatında
  - 16kHz örnekleme hızı
  - Tek kanal (mono)

### 2. Video Oluşturma

```python
from videocast.video_generator import VideoGenerator

# Yapılandırma
config = {
    'huggingface_token': 'YOUR_TOKEN',
    'fps': 30,
    'quality': 'high'
}

# Generator oluştur
generator = VideoGenerator(config)

# Video oluştur
generator.generate_video(
    source_image='kaynak_resimler/profil.jpg',
    audio_file='ses/konusma.wav',
    output_path='cikti/video.mp4'
)
```

## Gelişmiş Özellikler

### 1. Çoklu Poz Desteği

Birden fazla kaynak resimle daha doğal görünen videolar oluşturabilirsiniz:

```python
config['multi_pose'] = True
generator = VideoGenerator(config)

# Farklı pozları tanımla
poses = [
    'kaynak_resimler/on.jpg',
    'kaynak_resimler/sol.jpg',
    'kaynak_resimler/sag.jpg'
]

generator.generate_video(
    source_images=poses,
    audio_file='ses/konusma.wav',
    output_path='cikti/multi_pose.mp4'
)
```

### 2. Arka Plan Özelleştirme

```python
# Bulanık arka plan
config['background'] = {
    'mode': 'blur',
    'strength': 15
}

# Özel arka plan
config['background'] = {
    'mode': 'custom',
    'image': 'arkaplanlar/ofis.jpg'
}
```

### 3. Video Efektleri

```python
config['effects'] = {
    'brightness': 1.2,
    'contrast': 1.1,
    'saturation': 1.3
}
```

## Sorun Giderme

### Sık Karşılaşılan Hatalar

1. CUDA Hataları:
```
RuntimeError: CUDA error: no CUDA-capable device is detected
```
Çözüm: GPU sürücülerinizi güncelleyin veya CPU moduna geçin

2. Bellek Yetersizliği:
```
RuntimeError: CUDA out of memory
```
Çözüm: Batch size'ı düşürün veya düşük kalite ayarını kullanın

3. FFmpeg Hataları:
```
FileNotFoundError: FFmpeg not found
```
Çözüm: FFmpeg'in sistem yoluna eklendiğinden emin olun

### Performans İyileştirmeleri

1. GPU Kullanımı:
```python
config['device'] = 'cuda'  # veya 'cpu'
```

2. Batch İşleme:
```python
config['batch_size'] = 4  # Varsayılan: 8
```

3. Kalite/Hız Dengesi:
```python
config['quality'] = 'medium'  # low, medium, high
```
