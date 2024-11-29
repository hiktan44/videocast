# CUDA destekli temel imaj
FROM nvidia/cuda:11.8.0-cudnn8-runtime-ubuntu22.04

# Python ve gerekli paketleri yükle
RUN apt-get update && apt-get install -y \
    python3.8 \
    python3-pip \
    ffmpeg \
    git \
    && rm -rf /var/lib/apt/lists/*

# Çalışma dizini oluştur
WORKDIR /app

# Bağımlılıkları kopyala ve yükle
COPY requirements.txt .
RUN pip3 install -r requirements.txt

# Uygulama kodlarını kopyala
COPY . .

# Gerekli dizinleri oluştur
RUN mkdir -p kaynak_resimler ses diarization cikti

# Giriş noktası
ENTRYPOINT ["python3", "src/video_generator.py"]
