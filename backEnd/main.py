from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from database import SessionLocal, engine, Base
from fastapi.middleware.cors import CORSMiddleware


from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session
from io import BytesIO
from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas


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

 

@app.get("/arrest-forms/{form_id}/pdf")
def download_pdf(form_id: int, db: Session = Depends(get_db)):

    form = db.query(ArrestForm).filter(ArrestForm.id == form_id).first()

    if not form:
        return {"message": "Form not found"}

    buffer = BytesIO()
    pdf = canvas.Canvas(buffer, pagesize=A4)

    width, height = A4
    y = height - 50

    def write(text, step=16):
        nonlocal y
        if y < 50:
            pdf.showPage()
            y = height - 50
        pdf.drawString(50, y, str(text))
        y -= step

    # ================= HEADER =================
    write("CARDIOPULMONARY ARREST REPORT")
    write(f"Form ID: {form.id}")
    write(f"Patient Name: {form.patient_name}")
    write(f"NRIC: {form.nric}")
    write(f"Clinic: {form.clinic_name}")
    write("--------------------------------------------------")

    # ================= BASIC INFORMATION =================
    write("BASIC INFORMATION")

    if form.basic:
        write(f"Arrest DateTime: {form.basic.arrestDateTime}")
        write(f"Location: {form.basic.location}")

        write(f"Doctor Informed By: {form.basic.doctor_informed_by}")
        write(f"Doctor At: {form.basic.doctor_at}")
        write(f"Doctor Arrived At: {form.basic.doctor_arrived_at}")
        write(f"Doctor Name: {form.basic.doctor_name}")

        write(f"Relatives Informed By: {form.basic.relatives_informed_by}")
        write(f"Relatives At: {form.basic.relatives_at}")
        write(f"Relatives Arrived At: {form.basic.relatives_arrived_at}")
        write(f"Relative Name: {form.basic.relative_name}")

        write(f"Ambulance Called By: {form.basic.ambulance_called_by}")
        write(f"Ambulance At: {form.basic.ambulance_at}")
        write(f"Ambulance Arrived At: {form.basic.ambulance_arrived_at}")

        write(f"HD Concluded At: {form.basic.hd_concluded_at}")
        write(f"HD By: {form.basic.hd_by}")

    write("--------------------------------------------------")

    # ================= AIRWAY =================
    write("AIRWAY / VENTILATION")

    if form.airway:
        write(f"Respiration: {form.airway.respiration}")
        write(f"Oxygen Administered: {form.airway.oxygen_administered}")
        write(f"Assist Ventilation At: {form.airway.assist_ventilation_at}")
        write(f"Ventilation By: {form.airway.ventilation_by}")
        write(f"Intubated By: {form.airway.intubated_by}")
        write(f"Intubated Time: {form.airway.intubated_time}")
        write(f"Tube Size: {form.airway.tube_size}")

    write("--------------------------------------------------")

    # ================= CIRCULATION =================
    write("CIRCULATION")

    if form.circulation:
        write(f"Carotid Pulse: {form.circulation.carotid_pulse}")
        write(f"Blood Pressure: {form.circulation.blood_pressure}")
        write(f"BP Time: {form.circulation.bp_time}")
        write(f"ECG Rhythm: {form.circulation.ecg_rhythm}")
        write(f"ECG Time: {form.circulation.ecg_time}")
        write(f"Chest Compression At: {form.circulation.chest_compression_at}")
        write(f"Chest Compression By: {form.circulation.chest_compression_by}")
        write(f"AED Applied: {form.circulation.aed_applied}")
        write(f"AED Time: {form.circulation.aed_time}")

    write("--------------------------------------------------")

    # ================= VASCULAR ACCESS =================
    write("VASCULAR ACCESS")

    if form.vascular:
        write(f"AVF Access: {form.vascular.avf_access}")
        write(f"AVF Time: {form.vascular.avf_time}")
        write(f"AVF Site: {form.vascular.avf_site}")

        write(f"CVC Access: {form.vascular.cvc_access}")
        write(f"CVC Time: {form.vascular.cvc_time}")
        write(f"CVC Site: {form.vascular.cvc_site}")

        write(f"IV Cannula Time: {form.vascular.iv_cannula_time}")
        write(f"IV Site: {form.vascular.iv_cannula_site}")
        write(f"Inserted By: {form.vascular.inserted_by}")

    write("--------------------------------------------------")

    # ================= OBSERVATIONS =================
    write("OBSERVATIONS")

    for obs in form.observations:
        write(
            f"{obs.time} | HR:{obs.hr} | BP:{obs.bp} | RR:{obs.rr} | "
            f"PUPILS:{obs.pupils} | ECG:{obs.ecg_rhythm} | "
            f"Tracing:{obs.printed_tracing} | Notes:{obs.notes}"
        )

    write("--------------------------------------------------")

    # ================= DRUG RECORDS =================
    write("DRUG RECORDS")

    for drug in form.drug_records:
        write(
            f"{drug.time} | ECG:{drug.ecg_rhythm} | "
            f"AED:{drug.aed_defibrillation} | "
            f"ADRENALINE:{drug.adrenaline} | "
            f"ATROPINE:{drug.atropine} | "
            f"CA GLUCONATE:{drug.ca_gluconate} | "
            f"NAHCO3:{drug.na_hco3} | "
            f"OTHER:{drug.other_drugs} | "
            f"ROUTE:{drug.route}"
        )
        write(f"Administered By: {drug.administered_by}")

    write("--------------------------------------------------")

    # ================= OUTCOME =================
    write("OUTCOME")

    if form.outcome:
        write(f"CPR Ended: {form.outcome.cpr_ended}")
        write(f"Return Of Circulation: {form.outcome.return_of_circulation}")
        write(f"ROS HR: {form.outcome.ros_hr}")
        write(f"ROS BP: {form.outcome.ros_bp}")
        write(f"ROS RR: {form.outcome.ros_rr}")

        write(f"EMS Arrived: {form.outcome.ems_arrived}")
        write(f"EMS At: {form.outcome.ems_at}")

        write(f"CPR Handover Time: {form.outcome.cpr_handover_time}")

        write(f"Transferred To: {form.outcome.transferred_to}")
        write(f"Transferred Time: {form.outcome.transferred_time}")
        write(f"Escorted By: {form.outcome.escorted_by}")

    write("--------------------------------------------------")

    # ================= NURSES =================
    write("NURSES SIGNATURES")

    for nurse in form.nurses:
        write(f"{nurse.name} - {nurse.signature}")

    pdf.showPage()
    pdf.save()

    buffer.seek(0)

    return StreamingResponse(
        buffer,
        media_type="application/pdf",
        headers={
            "Content-Disposition": f"attachment; filename=arrest_report_{form_id}.pdf"
        }
    )