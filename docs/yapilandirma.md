# VideoCast Yapılandırma Seçenekleri

## Yapılandırma Dosyası

VideoCast'in tüm yapılandırma seçenekleri `config.py` dosyasında bulunur. Bu dosyayı düzenleyerek veya çalışma zamanında yeni ayarlar ekleyerek davranışı özelleştirebilirsiniz.

## Temel Ayarlar

### 1. Video Ayarları

```python
VIDEO_AYARLARI = {
    'fps': 30,                    # Saniyedeki kare sayısı
    'cozunurluk': (512, 512),    # Video çözünürlüğü
    'kalite': 'orta',            # Video kalitesi (düşük, orta, yüksek)
    'codec': 'libx264',          # Video codec
    'bitrate': '2000k',          # Video bit hızı
    'format': 'mp4'              # Çıktı formatı
}
```

### 2. Ses Ayarları

```python
SES_AYARLARI = {
    'ornekleme_hizi': 16000,     # Örnekleme hızı
    'kanal_sayisi': 1,           # Ses kanal sayısı
    'bit_derinligi': 16,         # Bit derinliği
    'codec': 'aac',              # Ses codec
    'bitrate': '192k'            # Ses bit hızı
}
```

### 3. Model Ayarları

```python
MODEL_AYARLARI = {
    'device': 'cuda',            # İşlem cihazı (cuda veya cpu)
    'model_tipi': 'hızlı',      # Model tipi (hızlı, dengeli, kaliteli)
    'batch_boyutu': 4,           # Toplu işleme boyutu
    'optimization': True,        # Model optimizasyonu
    'half_precision': False      # Yarım hassasiyet hesaplama
}
```

## Gelişmiş Ayarlar

### 1. Yüz İşleme Ayarları

```python
YUZ_AYARLARI = {
    'algilama_esigi': 0.7,       # Yüz algılama hassasiyeti
    'landmark_tipi': '3d',       # Landmark tipi (2d veya 3d)
    'yumusatma': True,           # Hareket yumuşatma
    'stabilizasyon': True,       # Yüz stabilizasyonu
    'interpolasyon': 'cubic'     # Interpolasyon metodu
}
```

### 2. Arka Plan Ayarları

```python
ARKAPLAN_AYARLARI = {
    'mod': 'orijinal',           # Arka plan modu
    'bulanik_guc': 15,          # Bulanıklık seviyesi
    'maske_tipi': 'yumusak',     # Maskeleme tipi
    'kenar_yumusatma': True,     # Kenar yumuşatma
    'renk_uyumu': True          # Renk uyumu optimizasyonu
}
```

### 3. Efekt Ayarları

```python
EFEKT_AYARLARI = {
    'parlaklik': 1.0,           # Parlaklık seviyesi
    'kontrast': 1.0,            # Kontrast seviyesi
    'doygunluk': 1.0,           # Renk doygunluğu
    'keskinlik': 1.0,           # Keskinlik seviyesi
    'gamma': 1.0,               # Gamma düzeltmesi
    'renk_sicakligi': 0         # Renk sıcaklığı ayarı
}
```

### 4. Çıktı Ayarları

```python
CIKTI_AYARLARI = {
    'watermark': False,          # Filigran ekleme
    'metadata': True,            # Metadata ekleme
    'thumbnail': True,           # Küçük resim oluşturma
    'on_izleme': True,          # Ön izleme oluşturma
    'sikistrima_seviyesi': 'orta'# Sıkıştırma seviyesi
}
```

## Özel Ayarlar

### 1. Çoklu GPU Desteği

```python
GPU_AYARLARI = {
    'multi_gpu': False,          # Çoklu GPU kullanımı
    'gpu_listesi': [0, 1],      # Kullanılacak GPU'lar
    'yuk_dagitimi': 'dinamik'    # Yük dağıtım stratejisi
}
```

### 2. Önbellekleme Ayarları

```python
ONBELLEK_AYARLARI = {
    'onbellek_aktif': True,      # Önbellekleme kullanımı
    'max_boyut': '5GB',         # Maksimum önbellek boyutu
    'temizleme_esigi': 0.8,     # Temizleme eşiği
    'oncelik': 'hiz'            # Önbellek stratejisi
}
```

## Ayarların Kullanımı

```python
from videocast.config import *

# Mevcut ayarları güncelle
VIDEO_AYARLARI.update({
    'fps': 60,
    'cozunurluk': (1024, 1024)
})

# Yeni ayarlar ekle
OZEL_AYARLAR = {
    'debug_mode': True,
    'log_level': 'DEBUG'
}
```
