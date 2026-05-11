const initialValues = {
  headerInformation: {
    patientName: "",
    nric: "",
    clinicName: ""
  },
  basicInformation: {
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
  hdBy: ""
},

  airwayVentilation: {
    respiration: "",
    oxygenAdministered: "",
    assistVentilationAt: "",
    ventilationBy: "",
    intubatedBy: "",
    intubatedTime: "",
    tubeSize: ""
  },

  circulation: {
    carotidPulse: "",
    bloodPressure: "",
    bpTime: "",
    ecgRhythm: "",
    ecgTime: "",
    chestCompressionAt: "",
    chestCompressionBy: "",
    aedApplied: "",
    aedTime: ""
  },

  vascularAccess: {
    avfAccess: "",
    avfTime: "",
    avfSite: "",
    cvcAccess: "",
    cvcTime: "",
    cvcSite: "",
    ivCannulaTime: "",
    ivCannulaSite: "",
    insertedBy: ""
  },

  observations: [
    {
      time: "",
      hr: "",
      bp: "",
      rr: "",
      pupils: "",
      ecgRhythm: "",
      printedTracing: "",
       notes: ""
    }
  ],

  drugRecords: [
    {
      time: "",
      ecgRhythm: "",
      adrenaline: "",
      atropine: "",
      route: "",
      administeredBy: ""
    }
  ],

  outcome: {
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
     escortedBy: "" 
  },

  
  nurses: [
    { name: "", signature: "" },
    { name: "", signature: "" },
    { name: "", signature: "" }
  ]
};

export default initialValues;