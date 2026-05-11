import { z } from "zod";


export const formSchema = z.object({
  headerInformation: z.object({
    patientName: z.string().min(1),
    nric: z.string().min(1),
    clinicName: z.string().min(1)
  }),

  basicInformation: z.object({
    arrestDateTime: z.string().optional(),
    location: z.string().optional(),
    doctorInformedBy: z.string().optional(),
    doctorAt: z.string().optional(),
    doctorArrivedAt: z.string().optional(),
    doctorName: z.string().min(1),
    relativesInformedBy: z.string().optional(),
    relativesAt: z.string().optional(),
    relativesArrivedAt: z.string().optional(),
    relativeName: z.string().optional(),
    ambulanceCalledBy: z.string().optional(),
    ambulanceAt: z.string().optional(),
    ambulanceArrivedAt: z.string().optional(),
    hdConcludedAt: z.string().optional(),
    hdBy: z.string().optional(),
  }),

  airwayVentilation: z.object({
    respiration: z.string().optional(),
    oxygenAdministered: z.string().optional(),
    assistVentilationAt: z.string().optional(),
    ventilationBy: z.string().optional(),
    intubatedBy: z.string().optional(),
    intubatedTime: z.string().optional(),
    tubeSize: z.string().optional(),
  }),

  circulation: z.object({
    carotidPulse: z.string().optional(),
    bloodPressure: z.string().optional(),
    bpTime: z.string().optional(),
    ecgRhythm: z.string().optional(),
    ecgTime: z.string().optional(),
    chestCompressionAt: z.string().optional(),
    chestCompressionBy: z.string().optional(),
    aedApplied: z.string().optional(),
    aedTime: z.string().optional(),
  }),

  vascularAccess: z.object({
    avfAccess: z.string().optional(),
    avfTime: z.string().optional(),
    avfSite: z.string().optional(),
    cvcAccess: z.string().optional(),
    cvcTime: z.string().optional(),
    cvcSite: z.string().optional(),
    ivCannulaTime: z.string().optional(),
    ivCannulaSite: z.string().optional(),
    insertedBy: z.string().optional(),
  }),

  observations: z.array(
    z.object({
      time: z.string().optional(),
      hr: z.string().optional(),
      bp: z.string().optional(),
      rr: z.string().optional(),
      pupils: z.string().optional(),
      ecgRhythm: z.string().optional(),
      printedTracing: z.string().optional(),
      notes: z.string().optional(),
    })
  ),

  drugRecords: z.array(
    z.object({
      time: z.string().optional(),
      ecgRhythm: z.string().optional(),
      adrenaline: z.string().optional(),
      atropine: z.string().optional(),
      route: z.string().optional(),
      administeredBy: z.string().optional(),
    })
  ),

  outcome: z.object({
    cprEnded: z.string().optional(),
    returnOfCirculation: z.boolean().optional(),
    rosHr: z.string().optional(),
    rosBp: z.string().optional(),
    rosRr: z.string().optional(),
    emsArrived: z.boolean().optional(),
    emsAt: z.string().optional(),
    cprHandoverTime: z.string().optional(),
    transferredTo: z.string().optional(),
    transferredTime: z.string().optional(),
    escortedBy: z.string().optional(),
  }),

  nurses: z.array(
    z.object({
      name: z.string().optional(),
      signature: z.string().optional(), // IMPORTANT for your signature upload/draw
    })
  ),
});