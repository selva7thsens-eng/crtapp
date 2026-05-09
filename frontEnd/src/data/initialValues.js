const initialValues = {
  patientName: "",
  nric: "",
  clinicName: "",

  arrestDateTime: "",
  location: "",

  doctorInformedBy: "",
  doctorAt: "",
  doctorArrivedAt: "",
  doctorName: "",

  relativesInformedBy: "",
  relativesAt: "",
  relativesArrivedAt: "",
  relativeName: "",

  ambulanceCalledBy: "",
  ambulanceAt: "",
  ambulanceArrivedAt: "",

  hdConcludedAt: "",
  hdConcludedBy: "",

  respiration: "",
  oxygenAdministered: "",
  assistVentilationAt: "",
  ventilationBy: "",
  intubatedBy: "",
  intubatedTime: "",
  tubeSize: "",

  carotidPulse: "",
  bloodPressure: "",
  bpTime: "",
  ecgRhythm: "",
  ecgTime: "",
  chestCompressionAt: "",
  chestCompressionBy: "",
  aedApplied: "",
  aedTime: "",

  avfAccess: "",
  avfTime: "",
  avfSite: "",

  cvcAccess: "",
  cvcTime: "",
  cvcSite: "",

  ivCannulaTime: "",
  ivCannulaSite: "",
  insertedBy: "",

  observations: [
    {
      time: "",
      hr: "",
      bp: "",
      rr: "",
      pupils: "",
      ecgRhythm: "",
      printedTracing: "",
    },
  ],

  drugRecords: [
    {
      time: "",
      ecgRhythm: "",
      aedDefibrillation: "",
      adrenaline: "",
      atropine: "",
      calciumGluconate: "",
      nahco3: "",
      otherDrugs: "",
      route: "",
      administeredBy: "",
    },
  ],

  cprEnded: "",
  returnOfCirculation: false,
  rosHr: "",
  rosBp: "",
  rosRr: "",

  emsArrived: false,
  emsAt: "",
  cprHandoverTime: "",

  transferredTo: "",
  transferredTime: "",

  // ✅ FIXED HERE
  nurses: [
    { name: "", time: "" },
    { name: "", time: "" },
    { name: "", time: "" },
  ],
};

export default initialValues;