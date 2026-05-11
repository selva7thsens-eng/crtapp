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


# ---------------- GET ALL FORMS ----------------
@app.get("/arrest-forms")
def get_forms(db: Session = Depends(get_db)):
    return db.query(ArrestForm).order_by(ArrestForm.id.desc()).all()


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

