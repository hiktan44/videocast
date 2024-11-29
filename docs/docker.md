# Docker Kullanım Kılavuzu

## İçindekiler

1. [Gereksinimler](#gereksinimler)
2. [Hızlı Başlangıç](#hızlı-başlangıç)
3. [Gelişmiş Kullanım](#gelişmiş-kullanım)
4. [Sorun Giderme](#sorun-giderme)

## Gereksinimler

1. Docker Engine
2. NVIDIA Container Toolkit (GPU desteği için)
3. Docker Compose

### NVIDIA Container Toolkit Kurulumu

```bash
# NVIDIA GPU sürücülerini yükleyin
curl -s -L https://nvidia.github.io/nvidia-docker/gpgkey | \
  sudo apt-key add -

# Repository'yi ekleyin
distribution=$(. /etc/os-release;echo $ID$VERSION_ID)
curl -s -L https://nvidia.github.io/nvidia-docker/$distribution/nvidia-docker.list | \
  sudo tee /etc/apt/sources.list.d/nvidia-docker.list

# Paketleri yükleyin
sudo apt-get update
sudo apt-get install -y nvidia-container-toolkit
sudo systemctl restart docker
```

## Hızlı Başlangıç

1. İmajı oluşturun:
```bash
docker-compose build
```

2. Container'ı başlatın:
```bash
docker-compose up -d
```

3. Kullanım:
```bash
# Kaynak dosyaları kopyalayın
cp kaynak.jpg kaynak_resimler/
cp ses.wav ses/

# Video oluşturun
docker-compose run videocast
```

## Gelişmiş Kullanım

### Özel Yapılandırma

```yaml
# docker-compose.override.yml
version: '3.8'

services:
  videocast:
    environment:
      - CUDA_VISIBLE_DEVICES=0  # Belirli GPU kullanımı
      - QUALITY=high            # Video kalitesi
    volumes:
      - ./config.py:/app/config.py  # Özel yapılandırma
```

### Batch İşleme

```bash
# Toplu video oluşturma
docker-compose run videocast python3 src/batch_processor.py
```

### Kaynak Kullanımı Sınırlandırma

```yaml
services:
  videocast:
    deploy:
      resources:
        limits:
          cpus: '4'
          memory: 8G
        reservations:
          devices:
            - driver: nvidia
              count: 1
              capabilities: [gpu]
```

## Sorun Giderme

### GPU Erişim Hataları

Hata:
```
Error: no CUDA-capable device is detected
```

Çözüm:
1. NVIDIA sürücülerini kontrol edin:
```bash
nvidia-smi
```

2. Container GPU erişimini test edin:
```bash
docker run --gpus all nvidia/cuda:11.8.0-base nvidia-smi
```

### Bellek Yetersizliği

Hata:
```
OOM: Out of memory
```

Çözüm:
1. Container bellek limitini artırın:
```yaml
services:
  videocast:
    deploy:
      resources:
        limits:
          memory: 16G
```

### Performans İyileştirme

1. CPU ve bellek kullanımını izleyin:
```bash
docker stats videocast
```

2. GPU kullanımını izleyin:
```bash
nvidia-smi -l 1
```

### Log İnceleme

```bash
# Container loglarını görüntüle
docker-compose logs -f videocast

# Son 100 satır log
docker-compose logs --tail=100 videocast
```