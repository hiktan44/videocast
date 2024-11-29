"""Yüz işleme modülü testleri."""

import unittest
import numpy as np
import cv2
from src.face_processor import FaceProcessor

class TestFaceProcessor(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        """Test ortamını hazırla."""
        cls.test_image = 'tests/test_data/test_face.jpg'
        cls.processor = FaceProcessor()
    
    def test_initialization(self):
        """İşlemci başlatma testi."""
        self.assertIsNotNone(self.processor)
        
    def test_detect_landmarks(self):
        """Yüz noktaları tespiti testi."""
        image = cv2.imread(self.test_image)
        landmarks = self.processor.detect_landmarks(image)
        self.assertEqual(landmarks.shape[0], 68)  # 68 nokta kontrolü
        
    def test_align_face(self):
        """Yüz hizalama testi."""
        image = cv2.imread(self.test_image)
        aligned = self.processor.align_face(image)
        self.assertEqual(aligned.shape, image.shape)
        
if __name__ == '__main__':
    unittest.main()