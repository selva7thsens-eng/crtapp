from pydantic import BaseModel

class ArrestFormCreate(BaseModel):
    patient_name: str
    nric: str
    clinic_name: str
    location: str | None = None