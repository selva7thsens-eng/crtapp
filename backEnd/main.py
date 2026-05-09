from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from database import SessionLocal, engine, Base
from models import ArrestForm
from schemas import ArrestFormCreate
from fastapi.middleware.cors import CORSMiddleware

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://crtapp-gamma.vercel.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/arrest-forms")
def get_forms(db: Session = Depends(get_db)):
    forms = db.query(ArrestForm).order_by(ArrestForm.id.desc()).all()
    return forms

@app.post("/arrest-form")
def create_form(
    data: ArrestFormCreate,
    db: Session = Depends(get_db)
):
    form = ArrestForm(**data.dict())

    db.add(form)
    db.commit()
    db.refresh(form)

    return {
        "message": "Data saved successfully",
        "id": form.id
    }