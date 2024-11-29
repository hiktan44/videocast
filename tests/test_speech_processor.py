"""Ses işleme modülü testleri."""

import unittest
import numpy as np
from pathlib import Path
from src.speech_processor import SpeechProcessor

class TestSpeechProcessor(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        """Test ortamını hazırla."""
        cls.test_audio = 'tests/test_data/test_audio.wav'
        cls.test_token = 'test_token'
        cls.processor = SpeechProcessor(cls.test_token)
    
    def test_initialization(self):
        """İşlemci başlatma testi."""
        self.assertIsNotNone(self.processor)
        
    def test_process_audio(self):
        """Ses işleme testi."""
        # TODO: Mock audio processing
        pass
        
    def test_invalid_audio(self):
        """Geçersiz ses dosyası testi."""
        with self.assertRaises(FileNotFoundError):
            self.processor.process_audio('invalid.wav', 'output/')
            
if __name__ == '__main__':
    unittest.main()