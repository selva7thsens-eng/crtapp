from database import Base
from sqlalchemy import Column, Integer, String, ForeignKey, Boolean
from sqlalchemy.orm import relationship


class ArrestForm(Base):
    __tablename__ = "arrest_forms"

    id = Column(Integer, primary_key=True, index=True)

    # Header
    patient_name = Column(String)
    nric = Column(String)
    clinic_name = Column(String)

    # Relationships
    basic = relationship("BasicInformation", back_populates="form", uselist=False)
    airway = relationship("AirwayVentilation", back_populates="form", uselist=False)
    circulation = relationship("Circulation", back_populates="form", uselist=False)
    vascular = relationship("VascularAccess", back_populates="form", uselist=False)
    outcome = relationship("Outcome", back_populates="form", uselist=False)

    observations = relationship("Observation", back_populates="form")
    drug_records = relationship("DrugRecord", back_populates="form")
    nurses = relationship("Nurse", back_populates="form")

class BasicInformation(Base):
    __tablename__ = "basic_information"

    id = Column(Integer, primary_key=True, index=True)

    form_id = Column(Integer, ForeignKey("arrest_forms.id"))  # ✅ FIX

    arrestDateTime = Column(String)
    location = Column(String)
    doctor_informed_by = Column(String)
    doctor_at = Column(String)
    doctor_arrived_at = Column(String)
    doctor_name = Column(String)

    relatives_informed_by = Column(String)
    relatives_at = Column(String)
    relatives_arrived_at = Column(String)
    relative_name = Column(String)

    ambulance_called_by = Column(String)
    ambulance_at = Column(String)
    ambulance_arrived_at = Column(String)

    hd_concluded_at = Column(String)
    hd_by = Column(String)

    form = relationship("ArrestForm", back_populates="basic")

class AirwayVentilation(Base):
    __tablename__ = "airway_ventilation"

    id = Column(Integer, primary_key=True)
    form_id = Column(Integer, ForeignKey("arrest_forms.id"))

    respiration = Column(String)
    oxygen_administered = Column(String)
    assist_ventilation_at = Column(String)
    ventilation_by = Column(String)
    intubated_by = Column(String)
    intubated_time = Column(String)
    tube_size = Column(String)

    form = relationship("ArrestForm", back_populates="airway")

class Circulation(Base):
    __tablename__ = "circulation"

    id = Column(Integer, primary_key=True)
    form_id = Column(Integer, ForeignKey("arrest_forms.id"))

    carotid_pulse = Column(String)
    blood_pressure = Column(String)
    bp_time = Column(String)
    ecg_rhythm = Column(String)
    ecg_time = Column(String)
    chest_compression_at = Column(String)
    chest_compression_by = Column(String)
    aed_applied = Column(String)
    aed_time = Column(String)

    form = relationship("ArrestForm", back_populates="circulation")

class VascularAccess(Base):
    __tablename__ = "vascular_access"

    id = Column(Integer, primary_key=True)
    form_id = Column(Integer, ForeignKey("arrest_forms.id"))

    avf_access = Column(String)
    avf_time = Column(String)
    avf_site = Column(String)

    cvc_access = Column(String)
    cvc_time = Column(String)
    cvc_site = Column(String)

    iv_cannula_time = Column(String)
    iv_cannula_site = Column(String)
    inserted_by = Column(String)

    form = relationship("ArrestForm", back_populates="vascular")

class Observation(Base):
    __tablename__ = "observations"

    id = Column(Integer, primary_key=True)
    form_id = Column(Integer, ForeignKey("arrest_forms.id"))

    time = Column(String)
    hr = Column(String)
    bp = Column(String)
    rr = Column(String)
    pupils = Column(String)
    ecg_rhythm = Column(String)
    printed_tracing = Column(String)
    notes = Column(String)

    form = relationship("ArrestForm", back_populates="observations")

class DrugRecord(Base):
    __tablename__ = "drug_records"

    id = Column(Integer, primary_key=True)
    form_id = Column(Integer, ForeignKey("arrest_forms.id"))

    time = Column(String)
    ecg_rhythm = Column(String)
    adrenaline = Column(String)
    atropine = Column(String)
    route = Column(String)
    administered_by = Column(String)

    form = relationship("ArrestForm", back_populates="drug_records")

class Outcome(Base):
    __tablename__ = "outcome"

    id = Column(Integer, primary_key=True)
    form_id = Column(Integer, ForeignKey("arrest_forms.id"))

    cpr_ended = Column(String)
    return_of_circulation = Column(Boolean)
    ros_hr = Column(String)
    ros_bp = Column(String)
    ros_rr = Column(String)

    ems_arrived = Column(Boolean)
    ems_at = Column(String)
    cpr_handover_time = Column(String)

    transferred_to = Column(String)
    transferred_time = Column(String)
    escorted_by = Column(String)

    form = relationship("ArrestForm", back_populates="outcome")

class Nurse(Base):
    __tablename__ = "nurses"

    id = Column(Integer, primary_key=True)
    form_id = Column(Integer, ForeignKey("arrest_forms.id"))

    name = Column(String)
    signature = Column(String)

    form = relationship("ArrestForm", back_populates="nurses")