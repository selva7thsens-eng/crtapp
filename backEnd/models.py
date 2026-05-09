from sqlalchemy import Column, Integer, String
from database import Base

class ArrestForm(Base):
    __tablename__ = "arrest_forms"

    id = Column(Integer, primary_key=True, index=True)
    patient_name = Column(String)
    nric = Column(String)
    clinic_name = Column(String)