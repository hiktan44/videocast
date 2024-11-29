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

## ⚙️ Yapılandırma

1. Hugging Face erişim anahtarı oluşturun:
   - [Hugging Face Token Ayarları](https://huggingface.co/settings/tokens) sayfasını ziyaret edin
   - Yeni bir token oluşturun

2. Diarization kurulumu:
```bash
python diarization.py -access_token <HUGGING_FACE_TOKEN>
```

## 📁 Proje Yapısı

```
videocast/
├── kaynak_resimler/    # Giriş resimleri (512x512)
├── ses/               # Giriş ses dosyaları
├── diarization/      # Diarization çıktısı
├── cikti/           # Oluşturulan video klipleri
└── docs/            # Dökümantasyon
```

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

Detaylı dokümantasyon [docs/](docs/) klasöründe mevcuttur:
- [Kurulum Kılavuzu](docs/kurulum.md)
- [Yapılandırma Seçenekleri](docs/yapilandirma.md)
- [Sorun Giderme](docs/sorun_giderme.md)

## 📄 Lisans

Bu proje MIT Lisansı altında lisanslanmıştır - detaylar için [LICENSE](LICENSE) dosyasına bakın.

## 🙏 Teşekkürler

- [pyannote.audio](https://github.com/pyannote/pyannote-audio) - ses diarization için
- Hugging Face - AI modelleri ve altyapı desteği için