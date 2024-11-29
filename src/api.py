from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path
import shutil
import uuid
from typing import Dict

app = FastAPI()

# CORS ayarları
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Geçici dosyalar için klasör
TEMP_DIR = Path("temp")
TEMP_DIR.mkdir(exist_ok=True)

# İşlem durumlarını takip etmek için
PROCESSING_TASKS: Dict[str, dict] = {}

@app.post("/upload/image")
async def upload_image(file: UploadFile = File(...)):
    """Kaynak görüntü yükleme endpoint'i"""
    if not file.content_type.startswith("image/"):
        raise HTTPException(400, "Geçersiz dosya formatı")
        
    task_id = str(uuid.uuid4())
    save_path = TEMP_DIR / f"{task_id}_source.jpg"
    
    with save_path.open("wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
        
    PROCESSING_TASKS[task_id] = {
        "status": "image_uploaded",
        "image_path": str(save_path)
    }
    
    return {"task_id": task_id}

@app.post("/upload/audio/{task_id}")
async def upload_audio(task_id: str, file: UploadFile = File(...)):
    """Ses dosyası yükleme endpoint'i"""
    if task_id not in PROCESSING_TASKS:
        raise HTTPException(404, "Task bulunamadı")
        
    if not file.filename.endswith(".wav"):
        raise HTTPException(400, "Sadece WAV formatı desteklenir")
        
    save_path = TEMP_DIR / f"{task_id}_audio.wav"
    
    with save_path.open("wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
        
    PROCESSING_TASKS[task_id].update({
        "status": "audio_uploaded",
        "audio_path": str(save_path)
    })
    
    return {"status": "success"}

@app.post("/process/{task_id}")
async def process_video(task_id: str):
    """Video işleme endpoint'i"""
    if task_id not in PROCESSING_TASKS:
        raise HTTPException(404, "Task bulunamadı")
        
    task = PROCESSING_TASKS[task_id]
    if "audio_path" not in task or "image_path" not in task:
        raise HTTPException(400, "Eksik dosyalar")
        
    # Video işleme başlat
    task["status"] = "processing"
    
    try:
        # TODO: Video işleme kodunu entegre et
        output_path = TEMP_DIR / f"{task_id}_output.mp4"
        
        # İşlem tamamlandı
        task.update({
            "status": "completed",
            "output_path": str(output_path)
        })
        
        return {"status": "success"}
        
    except Exception as e:
        task["status"] = "error"
        raise HTTPException(500, str(e))

@app.get("/status/{task_id}")
async def get_status(task_id: str):
    """Video işleme durumunu kontrol et"""
    if task_id not in PROCESSING_TASKS:
        raise HTTPException(404, "Task bulunamadı")
        
    return PROCESSING_TASKS[task_id]

@app.get("/video/{task_id}")
async def get_video(task_id: str):
    """Oluşturulan videoyu indir"""
    if task_id not in PROCESSING_TASKS:
        raise HTTPException(404, "Task bulunamadı")
        
    task = PROCESSING_TASKS[task_id]
    if task["status"] != "completed":
        raise HTTPException(400, "Video henüz hazır değil")
        
    return {"video_url": f"/download/{task_id}"}
