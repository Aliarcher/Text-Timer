from fastapi import FastAPI
from starlette.responses import JSONResponse
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import openpyxl
from openpyxl import Workbook
from typing import List



app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins, change this to specific origins in production
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods
    allow_headers=["*"],  # Allow all headers
)

class Word(BaseModel):
    id: str
    text: str

class WordData(BaseModel):
    words: List[Word]
    totalTime: float

class result(BaseModel):
    message: str    

@app.post("/save-word-data",response_model=result)
async def save_word_data(word_data: WordData):
    # Create a new workbook and select the active worksheet
    wb = Workbook()
    ws = wb.active

    # Add headers
    ws.append(["ID", "Word"])

    # Add word data to worksheet
    for word in word_data.words:
        ws.append([word.id, word.text])

    # Add total time to worksheet
    ws.append(["Total Time", word_data.totalTime])

    # Save the workbook
    wb.save("words.xlsx")

    return JSONResponse(content={"message": "Excel file created successfully"},status_code=200)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)