from fastapi import APIRouter, UploadFile, File
from pathlib import Path

router = APIRouter()

UPLOAD_DIR = Path("uploads")
UPLOAD_DIR.mkdir(exist_ok=True)


@router.post("/resumes")
async def upload_resume(resume: UploadFile = File(...)):
    file_path = UPLOAD_DIR / "resume.pdf"

    with open(file_path, "wb") as f:
        while chunk := await resume.read(1024 * 1024):
            f.write(chunk)
    print(f"Resume saved to {file_path}")
    return {
        "message": "Resume saved successfully",
        "path": str(file_path)
    }
