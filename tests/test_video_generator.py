"""Video oluşturma modülü testleri."""

import unittest
import numpy as np
from pathlib import Path
from src.video_generator import VideoGenerator

class TestVideoGenerator(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        """Test ortamını hazırla."""
        cls.config = {
            'huggingface_token': 'test_token',
            'fps': 30,
            'quality': 'low'
        }
        cls.generator = VideoGenerator(cls.config)
        cls.test_image = 'tests/test_data/test_face.jpg'
        cls.test_audio = 'tests/test_data/test_audio.wav'
        
    def test_initialization(self):
        """İşlemci başlatma testi."""
        self.assertIsNotNone(self.generator)
        self.assertEqual(self.generator.config['fps'], 30)
        
    def test_prepare_source_image(self):
        """Kaynak görüntü hazırlama testi."""
        face, landmarks = self.generator.prepare_source_image(self.test_image)
        self.assertIsNotNone(face)
        self.assertIsNotNone(landmarks)
        
    def test_generate_expressions(self):
        """Yüz ifadeleri oluşturma testi."""
        test_segments = [{
            'start': 0.0,
            'end': 1.0,
            'speaker': 'SPEAKER_01'
        }]
        
        landmarks = np.zeros((68, 3))  # Test landmarkları
        expressions = self.generator.generate_expressions(landmarks, test_segments)
        
        self.assertEqual(len(expressions), 1)
        self.assertIn('start_time', expressions[0])
        self.assertIn('end_time', expressions[0])
        
if __name__ == '__main__':
    unittest.main()