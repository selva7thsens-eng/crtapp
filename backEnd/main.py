from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from database import SessionLocal, engine, Base
from fastapi.middleware.cors import CORSMiddleware

from models import (
    ArrestForm,
    BasicInformation,
    AirwayVentilation,
    Circulation,
    VascularAccess,
    Outcome,
    Observation,
    DrugRecord,
    Nurse
)

from schemas import ArrestFormCreate

Base.metadata.create_all(bind=engine)

app = FastAPI()

# ---------------- CORS ----------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://crtapp-gamma.vercel.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# ---------------- DB SESSION ----------------
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


```python
# ---------------- GET SINGLE FORM FULL DETAILS ----------------

@app.get("/arrest-forms/{form_id}")
def get_form_by_id(form_id: int, db: Session = Depends(get_db)):

    form = db.query(ArrestForm).filter(
        ArrestForm.id == form_id
    ).first()

    if not form:
        return {"message": "Form not found"}

    return {
        "id": form.id,

        "headerInformation": {
            "patientName": form.patient_name,
            "nric": form.nric,
            "clinicName": form.clinic_name,
        },

        "basicInformation": {
            "arrestDateTime": form.basic.arrestDateTime if form.basic else None,
            "location": form.basic.location if form.basic else None,

            "doctorInformedBy": form.basic.doctor_informed_by if form.basic else None,
            "doctorAt": form.basic.doctor_at if form.basic else None,
            "doctorArrivedAt": form.basic.doctor_arrived_at if form.basic else None,
            "doctorName": form.basic.doctor_name if form.basic else None,

            "relativesInformedBy": form.basic.relatives_informed_by if form.basic else None,
            "relativesAt": form.basic.relatives_at if form.basic else None,
            "relativesArrivedAt": form.basic.relatives_arrived_at if form.basic else None,
            "relativeName": form.basic.relative_name if form.basic else None,

            "ambulanceCalledBy": form.basic.ambulance_called_by if form.basic else None,
            "ambulanceAt": form.basic.ambulance_at if form.basic else None,
            "ambulanceArrivedAt": form.basic.ambulance_arrived_at if form.basic else None,

            "hdConcludedAt": form.basic.hd_concluded_at if form.basic else None,
            "hdBy": form.basic.hd_by if form.basic else None,
        },

        "airwayVentilation": {
            "respiration": form.airway.respiration if form.airway else None,
            "oxygenAdministered": form.airway.oxygen_administered if form.airway else None,
            "assistVentilationAt": form.airway.assist_ventilation_at if form.airway else None,
            "ventilationBy": form.airway.ventilation_by if form.airway else None,
            "intubatedBy": form.airway.intubated_by if form.airway else None,
            "intubatedTime": form.airway.intubated_time if form.airway else None,
            "tubeSize": form.airway.tube_size if form.airway else None,
        },

        "circulation": {
            "carotidPulse": form.circulation.carotid_pulse if form.circulation else None,
            "bloodPressure": form.circulation.blood_pressure if form.circulation else None,
            "bpTime": form.circulation.bp_time if form.circulation else None,
            "ecgRhythm": form.circulation.ecg_rhythm if form.circulation else None,
            "ecgTime": form.circulation.ecg_time if form.circulation else None,
            "chestCompressionAt": form.circulation.chest_compression_at if form.circulation else None,
            "chestCompressionBy": form.circulation.chest_compression_by if form.circulation else None,
            "aedApplied": form.circulation.aed_applied if form.circulation else None,
            "aedTime": form.circulation.aed_time if form.circulation else None,
        },

        "vascularAccess": {
            "avfAccess": form.vascular.avf_access if form.vascular else None,
            "avfTime": form.vascular.avf_time if form.vascular else None,
            "avfSite": form.vascular.avf_site if form.vascular else None,

            "cvcAccess": form.vascular.cvc_access if form.vascular else None,
            "cvcTime": form.vascular.cvc_time if form.vascular else None,
            "cvcSite": form.vascular.cvc_site if form.vascular else None,

            "ivCannulaTime": form.vascular.iv_cannula_time if form.vascular else None,
            "ivCannulaSite": form.vascular.iv_cannula_site if form.vascular else None,
            "insertedBy": form.vascular.inserted_by if form.vascular else None,
        },

        "outcome": {
            "cprEnded": form.outcome.cpr_ended if form.outcome else None,
            "returnOfCirculation": form.outcome.return_of_circulation if form.outcome else None,

            "rosHr": form.outcome.ros_hr if form.outcome else None,
            "rosBp": form.outcome.ros_bp if form.outcome else None,
            "rosRr": form.outcome.ros_rr if form.outcome else None,

            "emsArrived": form.outcome.ems_arrived if form.outcome else None,
            "emsAt": form.outcome.ems_at if form.outcome else None,

            "cprHandoverTime": form.outcome.cpr_handover_time if form.outcome else None,

            "transferredTo": form.outcome.transferred_to if form.outcome else None,
            "transferredTime": form.outcome.transferred_time if form.outcome else None,
            "escortedBy": form.outcome.escorted_by if form.outcome else None,
        },

        "observations": [
            {
                "time": obs.time,
                "hr": obs.hr,
                "bp": obs.bp,
                "rr": obs.rr,
                "pupils": obs.pupils,
                "ecgRhythm": obs.ecg_rhythm,
                "printedTracing": obs.printed_tracing,
                "notes": obs.notes,
            }
            for obs in form.observations
        ],

        "drugRecords": [
            {
                "time": drug.time,
                "ecgRhythm": drug.ecg_rhythm,
                "adrenaline": drug.adrenaline,
                "atropine": drug.atropine,
                "route": drug.route,
                "administeredBy": drug.administered_by,
            }
            for drug in form.drug_records
        ],

        "nurses": [
            {
                "name": nurse.name,
                "signature": nurse.signature,
            }
            for nurse in form.nurses
        ]
    }
```


# ---------------- CREATE FORM ----------------
@app.post("/arrest-forms")
def create_form(data: ArrestFormCreate, db: Session = Depends(get_db)):

    # ---------------- MAIN TABLE ----------------
    form = ArrestForm(
        patient_name=data.headerInformation.patientName,
        nric=data.headerInformation.nric,
        clinic_name=data.headerInformation.clinicName,
    )

    db.add(form)
    db.flush()

    # ---------------- BASIC INFORMATION ----------------
    basic = BasicInformation(
        form_id=form.id,

        arrestDateTime=data.basicInformation.arrestDateTime,
        location=data.basicInformation.location,

        doctor_informed_by=data.basicInformation.doctorInformedBy,
        doctor_at=data.basicInformation.doctorAt,
        doctor_arrived_at=data.basicInformation.doctorArrivedAt,
        doctor_name=data.basicInformation.doctorName,

        relatives_informed_by=data.basicInformation.relativesInformedBy,
        relatives_at=data.basicInformation.relativesAt,
        relatives_arrived_at=data.basicInformation.relativesArrivedAt,
        relative_name=data.basicInformation.relativeName,

        ambulance_called_by=data.basicInformation.ambulanceCalledBy,
        ambulance_at=data.basicInformation.ambulanceAt,
        ambulance_arrived_at=data.basicInformation.ambulanceArrivedAt,

        hd_concluded_at=data.basicInformation.hdConcludedAt,
        hd_by=data.basicInformation.hdBy,
    )

    # ---------------- AIRWAY ----------------
    airway = AirwayVentilation(
        form_id=form.id,

        respiration=data.airwayVentilation.respiration,
        oxygen_administered=data.airwayVentilation.oxygenAdministered,
        assist_ventilation_at=data.airwayVentilation.assistVentilationAt,
        ventilation_by=data.airwayVentilation.ventilationBy,
        intubated_by=data.airwayVentilation.intubatedBy,
        intubated_time=data.airwayVentilation.intubatedTime,
        tube_size=data.airwayVentilation.tubeSize,
    )

    # ---------------- CIRCULATION ----------------
    circulation = Circulation(
        form_id=form.id,

        carotid_pulse=data.circulation.carotidPulse,
        blood_pressure=data.circulation.bloodPressure,
        bp_time=data.circulation.bpTime,
        ecg_rhythm=data.circulation.ecgRhythm,
        ecg_time=data.circulation.ecgTime,
        chest_compression_at=data.circulation.chestCompressionAt,
        chest_compression_by=data.circulation.chestCompressionBy,
        aed_applied=data.circulation.aedApplied,
        aed_time=data.circulation.aedTime,
    )

    # ---------------- VASCULAR ----------------
    vascular = VascularAccess(
        form_id=form.id,

        avf_access=data.vascularAccess.avfAccess,
        avf_time=data.vascularAccess.avfTime,
        avf_site=data.vascularAccess.avfSite,

        cvc_access=data.vascularAccess.cvcAccess,
        cvc_time=data.vascularAccess.cvcTime,
        cvc_site=data.vascularAccess.cvcSite,

        iv_cannula_time=data.vascularAccess.ivCannulaTime,
        iv_cannula_site=data.vascularAccess.ivCannulaSite,
        inserted_by=data.vascularAccess.insertedBy,
    )

    # ---------------- OUTCOME ----------------
    outcome = Outcome(
        form_id=form.id,

        cpr_ended=data.outcome.cprEnded,
        return_of_circulation=data.outcome.returnOfCirculation,

        ros_hr=data.outcome.rosHr,
        ros_bp=data.outcome.rosBp,
        ros_rr=data.outcome.rosRr,

        ems_arrived=data.outcome.emsArrived,
        ems_at=data.outcome.emsAt,

        cpr_handover_time=data.outcome.cprHandoverTime,

        transferred_to=data.outcome.transferredTo,
        transferred_time=data.outcome.transferredTime,
        escorted_by=data.outcome.escortedBy,
    )

    db.add_all([
        basic,
        airway,
        circulation,
        vascular,
        outcome
    ])

    # ---------------- OBSERVATIONS ----------------
    for obs in (data.observations or []):
        observation = Observation(
            form_id=form.id,

            time=obs.time,
            hr=obs.hr,
            bp=obs.bp,
            rr=obs.rr,
            pupils=obs.pupils,
            ecg_rhythm=obs.ecgRhythm,
            printed_tracing=obs.printedTracing,
            notes=obs.notes,
        )

        db.add(observation)

    # ---------------- DRUG RECORDS ----------------
    for drug in (data.drugRecords or []):

        drug_record = DrugRecord(
            form_id=form.id,

            time=drug.time,
            ecg_rhythm=drug.ecgRhythm,
            adrenaline=drug.adrenaline,
            atropine=drug.atropine,
            route=drug.route,
            administered_by=drug.administeredBy,
        )

        db.add(drug_record)

    # ---------------- NURSES ----------------
    for nurse in (data.nurses or []):

        nurse_data = Nurse(
            form_id=form.id,

            name=nurse.name,
            signature=nurse.signature,
        )

        db.add(nurse_data)

    # ---------------- SAVE ----------------
    db.commit()

    return {
        "message": "Form saved successfully",
        "id": form.id
    }

