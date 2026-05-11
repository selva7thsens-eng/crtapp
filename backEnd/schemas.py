from pydantic import BaseModel
from typing import List, Optional


# ---------------- HEADER ----------------
class HeaderInformation(BaseModel):
    patientName: str
    nric: str
    clinicName: str


# ---------------- BASIC ----------------
class BasicInformation(BaseModel):
    arrestDateTime: Optional[str] = None
    location: Optional[str] = None
    doctorInformedBy: Optional[str] = None
    doctorAt: Optional[str] = None
    doctorArrivedAt: Optional[str] = None
    doctorName: Optional[str] = None
    relativesInformedBy: Optional[str] = None
    relativesAt: Optional[str] = None
    relativesArrivedAt: Optional[str] = None
    relativeName: Optional[str] = None
    ambulanceCalledBy: Optional[str] = None
    ambulanceAt: Optional[str] = None
    ambulanceArrivedAt: Optional[str] = None
    hdConcludedAt: Optional[str] = None
    hdBy: Optional[str] = None


# ---------------- AIRWAY ----------------
class AirwayVentilation(BaseModel):
    respiration: Optional[str] = None
    oxygenAdministered: Optional[str] = None
    assistVentilationAt: Optional[str] = None
    ventilationBy: Optional[str] = None
    intubatedBy: Optional[str] = None
    intubatedTime: Optional[str] = None
    tubeSize: Optional[str] = None


# ---------------- CIRCULATION ----------------
class Circulation(BaseModel):
    carotidPulse: Optional[str] = None
    bloodPressure: Optional[str] = None
    bpTime: Optional[str] = None
    ecgRhythm: Optional[str] = None
    ecgTime: Optional[str] = None
    chestCompressionAt: Optional[str] = None
    chestCompressionBy: Optional[str] = None
    aedApplied: Optional[str] = None
    aedTime: Optional[str] = None


# ---------------- VASCULAR ----------------
class VascularAccess(BaseModel):
    avfAccess: Optional[str] = None
    avfTime: Optional[str] = None
    avfSite: Optional[str] = None
    cvcAccess: Optional[str] = None
    cvcTime: Optional[str] = None
    cvcSite: Optional[str] = None
    ivCannulaTime: Optional[str] = None
    ivCannulaSite: Optional[str] = None
    insertedBy: Optional[str] = None


# ---------------- OBSERVATION ----------------
class Observation(BaseModel):
    time: Optional[str] = None
    hr: Optional[str] = None
    bp: Optional[str] = None
    rr: Optional[str] = None
    pupils: Optional[str] = None
    ecgRhythm: Optional[str] = None
    printedTracing: Optional[str] = None
    notes: Optional[str] = None


# ---------------- DRUG ----------------
class DrugRecord(BaseModel):
    time: Optional[str] = None
    ecgRhythm: Optional[str] = None
    adrenaline: Optional[str] = None
    atropine: Optional[str] = None
    route: Optional[str] = None
    administeredBy: Optional[str] = None


# ---------------- OUTCOME ----------------
class Outcome(BaseModel):
    cprEnded: Optional[str] = None
    returnOfCirculation: Optional[bool] = None
    rosHr: Optional[str] = None
    rosBp: Optional[str] = None
    rosRr: Optional[str] = None
    emsArrived: Optional[bool] = None
    emsAt: Optional[str] = None
    cprHandoverTime: Optional[str] = None
    transferredTo: Optional[str] = None
    transferredTime: Optional[str] = None
    escortedBy: Optional[str] = None


# ---------------- NURSE ----------------
class Nurse(BaseModel):
    name: Optional[str] = None
    signature: Optional[str] = None


# ---------------- MAIN REQUEST ----------------
class ArrestFormCreate(BaseModel):
    headerInformation: HeaderInformation
    basicInformation: BasicInformation
    airwayVentilation: AirwayVentilation
    circulation: Circulation
    vascularAccess: VascularAccess

    observations: List[Observation] = []
    drugRecords: List[DrugRecord] = []
    nurses: List[Nurse] = []

    outcome: Outcome