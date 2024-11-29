import cv2
import numpy as np
import torch
from pathlib import Path
from tqdm import tqdm

class VideoProcessor:
    def __init__(self, kaynak_resim_yolu, cikti_dizini):
        self.kaynak_resim = cv2.imread(str(kaynak_resim_yolu))
        self.cikti_dizini = Path(cikti_dizini)
    
    def video_olustur(self, ses_dosyasi):
        # Video oluşturma kodları
        pass