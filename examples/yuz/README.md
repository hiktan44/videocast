# Yüz İşleme Örnekleri

## 1. Temel Yüz İşleme

```python
from videocast.face_processor import FaceProcessor

# İşlemci oluştur
processor = FaceProcessor()

# Yüz noktalarını bul
image = cv2.imread('yuz.jpg')
landmarks = processor.detect_landmarks(image)

# Yüzü hizala
aligned = processor.align_face(image, landmarks)
```

## 2. Çoklu Poz Oluşturma

```python
# Farklı ifadeler oluştur
ifadeler = {
    'gulme': {'smile': 0.8},
    'ciddi': {'smile': 0.0},
    'saskin': {'surprise': 0.7}
}

# Her ifade için frame oluştur
for isim, params in ifadeler.items():
    frame = processor.create_frame(face, landmarks, params)
    cv2.imwrite(f'{isim}.jpg', frame)
```

## 3. Özel Efektler

```python
# Yumuşak geçişli ifadeler
def yumusak_gecis(baslangic, bitis, adim=10):
    for i in range(adim):
        oran = i / (adim - 1)
        params = {
            'smile': baslangic['smile'] * (1-oran) + bitis['smile'] * oran
        }
        frame = processor.create_frame(face, landmarks, params)
        yield frame
```