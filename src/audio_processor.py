import soundfile as sf
import numpy as np
from pathlib import Path

class AudioProcessor:
    def __init__(self, ses_dosyasi):
        self.ses_dosyasi = Path(ses_dosyasi)
    
    def ses_isle(self):
        # Ses işleme kodları
        pass