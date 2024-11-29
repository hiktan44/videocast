# VideoCast Kurulum Kılavuzu

## İçindekiler

1. [Sistem Gereksinimleri](#sistem-gereksinimleri)
2. [Python Ortamı Kurulumu](#python-ortamı-kurulumu)
3. [Bağımlılıkların Yüklenmesi](#bağımlılıkların-yüklenmesi)
4. [Hugging Face Kurulumu](#hugging-face-kurulumu)
5. [FFmpeg Kurulumu](#ffmpeg-kurulumu)
6. [Sorun Giderme](#sorun-giderme)

## Sistem Gereksinimleri

### Minimum Gereksinimler:
- 8GB RAM
- 4 çekirdekli CPU
- 10GB boş disk alanı

### Önerilen Gereksinimler:
- 16GB RAM
- 8 çekirdekli CPU
- NVIDIA GPU (4GB+ VRAM)
- 20GB boş disk alanı

### Yazılım Gereksinimleri:
- Python 3.8 veya üzeri
- CUDA 11.0+ (GPU kullanımı için)
- FFmpeg

## Python Ortamı Kurulumu

### Windows için:

1. Miniconda'yı indirin ve kurun:
   - [Miniconda İndirme Sayfası](https://docs.conda.io/en/latest/miniconda.html)

2. Komut istemini açın ve proje ortamını oluşturun:
```bash
conda create --name videocast python=3.8
conda activate videocast
```

### Linux için:

1. Miniconda kurulumu:
```bash
wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh
bash Miniconda3-latest-Linux-x86_64.sh
```

2. Ortam oluşturma:
```bash
conda create --name videocast python=3.8
conda activate videocast
```

## Bağımlılıkların Yüklenmesi

1. Projeyi klonlayın:
```bash
git clone https://github.com/hiktan44/videocast.git
cd videocast
```

2. Gerekli paketleri yükleyin:
```bash
pip install -r requirements.txt
```

3. Torch ve CUDA yüklemesi (GPU kullanıcıları için):
```bash
pip install torch torchvision torchaudio --extra-index-url https://download.pytorch.org/whl/cu116
```

## Hugging Face Kurulumu

1. [Hugging Face](https://huggingface.co/) hesabı oluşturun

2. Access Token oluşturma:
   - Profil > Settings > Access Tokens
   - "New Token" butonuna tıklayın
   - Rol olarak "write" seçin

3. Token'ı kaydedin ve güvenli bir yerde saklayın

## FFmpeg Kurulumu

### Windows:
1. [FFmpeg indirme sayfası](https://www.gyan.dev/ffmpeg/builds/)
2. ffmpeg-release-essentials.zip dosyasını indirin
3. Arşivi açın ve bin klasörünü sistem PATH'ine ekleyin

### Linux (Ubuntu/Debian):
```bash
sudo apt update
sudo apt install ffmpeg
```

### MacOS:
```bash
brew install ffmpeg
```

## Sorun Giderme

### Sık Karşılaşılan Hatalar

1. CUDA hatası:
```
RuntimeError: CUDA error: no CUDA-capable device is detected
```
Çözüm: GPU sürücülerinizi güncelleyin veya CPU moduna geçin.

2. FFmpeg hatası:
```
FileNotFoundError: [WinError 2] FFmpeg bulunamadı
```
Çözüm: FFmpeg'in sistem PATH'ine eklendiğinden emin olun.

3. Bellek hatası:
```
RuntimeError: CUDA out of memory
```
Çözüm: Batch size'ı düşürün veya daha düşük çözünürlük kullanın.

### Yardım ve Destek

Sorunlarınız için:
1. GitHub Issues sayfasını kontrol edin
2. Yeni bir issue açın
3. Detaylı hata mesajını ve sistem bilgilerinizi paylaşın