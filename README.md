# VideoCast 🎥

An AI-powered video generation toolkit that turns static images into talking avatars.

## ✨ Özellikler

- 🎭 Avatar Oluşturma: Durağan görüntülerden gerçekçi konuşan avatarlar
- 🗣️ Ses İşleme: Pyannote.audio kullanarak gelişmiş ses analizi
- 🎬 Video Sentezi: Özelleştirilebilir ayarlarla yüksek kaliteli video üretimi
- 🔄 Çoklu Poz Desteği: Farklı yüz pozları ile video oluşturma
- 🎨 Arka Plan Özelleştirme: Esnek arka plan seçenekleri

## 📋 Gereksinimler

- Python 3.8+
- CUDA uyumlu GPU (önerilen)
- FFmpeg
- Hugging Face hesabı ve erişim anahtarı

## 🚀 Kurulum

1. Python ortamını hazırlayın:
```bash
conda create --name videocast
conda activate videocast
```

2. Repository'yi klonlayın:
```bash
git clone https://github.com/hiktan44/videocast.git
cd videocast
```

3. Bağımlılıkları yükleyin:
```bash
pip install -r requirements.txt
pip install .
```

4. FFmpeg kurulumu:
- Linux için: `sudo apt-get install ffmpeg`
- Windows için: FFmpeg'i resmi sitesinden indirip sistem yoluna ekleyin

## 🎮 Kullanım

1. Kaynak resimleri hazırlayın:
   - 512x512 piksel kareler
   - Yüz, resmin %50-70'ini kaplamalı
   - `kaynak_resimler/` klasörüne yerleştirin

2. Ses dosyasını hazırlayın:
   - WAV formatına dönüştürün
   - `ses/input_audio.wav` konumuna yerleştirin

3. Video oluşturun:
```bash
python generate_videos.py
python combine_videos.py
```

## 🔧 Gelişmiş Ayarlar

- `-mode full`: Sessizlik sırasında hafif kafa hareketleri ekler
- `-background custom`: Özel arka plan kullanımı
- `-quality high`: Daha yüksek kaliteli çıktı üretir

## 📚 Dokümantasyon

Detaylı dokümantasyon [docs/](docs/) klasöründe mevcuttur.