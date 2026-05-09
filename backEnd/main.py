from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from database import SessionLocal, engine, Base
from models import ArrestForm
from schemas import ArrestFormCreate
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

Base.metadata.create_all(bind=engine)

app = FastAPI()



app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# Rename this class
class ArrestFormRequest(BaseModel):
    patient_name: str
    nric: str
    clinic_name: str

@app.get("/arrest-forms")
def get_forms(db: Session = Depends(get_db)):
    forms = db.query(ArrestForm).order_by(ArrestForm.id.desc()).all()
    return forms
    
@app.post("/arrest-form")
def create_form(
    data: ArrestFormRequest,
    db: Session = Depends(get_db)
):
    form = ArrestForm(**data.dict())

    db.add(form)
    db.commit()
    db.refresh(form)

    return {
        "message": "Data saved successfully",
        "id": form.id,
        "data": data
    }



@app.post('/submit-form')
def submit_form(data: ArrestFormCreate, db: Session = Depends(get_db)):

    # This now correctly uses SQLAlchemy model
    form = ArrestForm(**data.dict())

    db.add(form)
    db.commit()
    db.refresh(form)

    return {
        "message": "saved",
        "id": form.id
    }