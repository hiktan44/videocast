# Ses İşleme Örneği

Bu örnek, farklı ses işleme senaryolarını göstermektedir.

## 1. Basit Ses İşleme

```python
from videocast.speech_processor import SpeechProcessor

# İşlemci oluştur
processor = SpeechProcessor('YOUR_TOKEN')

# Tek ses dosyası işle
results = processor.process_audio('input.wav', 'output/')
```

## 2. Toplu Ses İşleme

```python
from pathlib import Path

# Ses dosyalarını bul
sesler = Path('sesler').glob('*.wav')

# Tüm sesleri işle
for ses in sesler:
    processor.process_audio(str(ses), 'cikti/')
```

## 3. Özel Parametrelerle İşleme

```python
# Gelişmiş ayarlar
ayarlar = {
    'min_duration': 0.5,  # Minimum segment süresi
    'sample_rate': 16000,  # Örnekleme hızı
    'channels': 1         # Kanal sayısı
}

# İşleme
processor.process_audio('input.wav', 'output/', **ayarlar)
```