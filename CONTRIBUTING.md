# Katkıda Bulunma Kılavuzu

VideoCast'e katkıda bulunmak istediğiniz için teşekkür ederiz! 🙏

## Nasıl Katkıda Bulunabilirsiniz?

### 1. Sorunları Bildirin

- GitHub Issues bölümünü kullanın
- Net ve detaylı açıklamalar yapın
- Hata mesajlarını ve çıktıları ekleyin
- Sistem bilgilerinizi paylaşın

### 2. Pull Request Gönderin

1. Projeyi forklayın
2. Yeni bir branch oluşturun
3. Değişikliklerinizi yapın
4. Testleri çalıştırın
5. Pull request gönderin

### 3. Kod Standartları

- PEP 8 standartlarına uyun
- Docstring kullanın
- Type hinting ekleyin
- Testler yazın

### 4. Commit Mesajları

```
feat: Yeni özellik ekle
fix: Hata düzeltmesi
docs: Dokümantasyon güncellemesi
test: Test ekleme/güncelleme
refactor: Kod iyileştirmesi
```

## Geliştirme Ortamı

1. Ortamı hazırlayın:
```bash
conda create -n videocast-dev python=3.8
conda activate videocast-dev
pip install -r requirements-dev.txt
```

2. Testleri çalıştırın:
```bash
pytest tests/
```

3. Kod stilini kontrol edin:
```bash
flake8 src/
black src/
isort src/
```

## Test Kılavuzu

1. Unit testler ekleyin
2. Integration testler yazın
3. Test kapsamını kontrol edin:
```bash
pytest --cov=src tests/
```

## Dokümantasyon

1. Yeni özellikler için dokümantasyon ekleyin
2. Örnekler oluşturun
3. API dokümantasyonunu güncelleyin

## Sürüm Süreci

1. Sürüm numarasını güncelleyin (semantic versioning)
2. CHANGELOG.md dosyasını güncelleyin
3. Release notes hazırlayın

## İletişim

- GitHub Issues
- Pull Requests
- Discussions

Katkılarınız için teşekkür ederiz! 👍