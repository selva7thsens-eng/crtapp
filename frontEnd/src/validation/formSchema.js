import { z } from "zod";

export const formSchema = z.object({
  patientName: z.string().min(1, "Patient name required"),

  nric: z.string().min(1, "NRIC required"),

  clinicName: z.string().min(1, "Clinic name required"),

  arrestDateTime: z.string().min(1, "Date and Time required"),

  location: z.string().min(1, "Location required"),

  doctorName: z.string().min(1, "Doctor name required"),

  respiration: z.string().min(1, "Respiration required"),

  carotidPulse: z.string().min(1, "Carotid pulse required"),
});