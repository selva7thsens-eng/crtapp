import {useState, useEffect, useRef} from 'react';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { FiDownload, FiPrinter } from "react-icons/fi";
import {
  HeartPulse,
  Activity,
  Stethoscope,
  Syringe,
  ClipboardList,
  Pill,
  FileHeart,
  PenSquare,
} from "lucide-react";

function ReportFormPreview({ setPage }) {
  const [data, setData] = useState(null);
 const printRef = useRef();

  useEffect(() => {
    const fetchFormDetails = async () => {
      try {
        const res = await fetch(
          "https://crtapp-backend-q4xk.onrender.com/arrest-forms/1"
        );

        const result = await res.json();
        setData(result);
      } catch (err) {
        console.log("API Error:", err);
      }
    };

    fetchFormDetails();
  }, []);

    // 🖨 PRINT FUNCTION
  const handlePrint = () => {
    window.print();
  };

 const downloadPDF = () => {
  window.open(
    `https://crtapp-backend-q4xk.onrender.com/arrest-forms/1/pdf`,
    "_blank"
  );
};

  return (
    <div className=" inset-0 bg-gray-100/40 backdrop-blur-sm z-50">
      <div className="w-full bg-[#eef6ff] rounded-lg shadow-2xl overflow-y-auto max-h-[100vh] border border-gray-300">

        {/* HEADER */}
        <div className="sticky top-0 bg-sky-700 text-white px-4 py-4 flex justify-between items-center z-20">
          <h2 className="text-2xl font-bold tracking-wide flex items-center gap-2">
            <HeartPulse size={28} />
            CARDIOPULMONARY ARREST REPORT
          </h2>

          <div className="flex gap-3">

  {/* PRINT */}
  <button
    onClick={() => window.print()}
    className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-xl"
  >
    <FiPrinter /> Print
  </button>

  {/* PDF DOWNLOAD */}
  <button
    onClick={downloadPDF}
    className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-xl"
  >
    <FiDownload /> PDF
  </button>

  {/* CLOSE */}
  <button
    onClick={() => setPage("form")}
    className="bg-red-500 px-4 py-2 rounded-xl"
  >
    Close
  </button>

</div>
        </div>

        {!data ? (
          <div className="p-10 text-center text-gray-800 font-semibold">
            Loading...
          </div>
        ) : (

        <div id="pdf-content" className="pdf-safe bg-white text-black">
            {/* HEADER INFO */}
            <div className="bg-white rounded-lg border border-gray-300 shadow-sm overflow-hidden">
              <div className="bg-gray-100 px-2 py-2 flex items-center gap-2 border-b border-gray-300">
                <ClipboardList className="text-gray-800" />
                <h3 className="font-bold text-sky-800">
                  Header Information
                </h3>
              </div>

              <div className="p-2 grid md:grid-cols-3 gap-3 text-black">
                <p><span className="font-semibold">Patient Name:</span> {data.headerInformation?.patientName}</p>
                <p><span className="font-semibold">NRIC:</span> {data.headerInformation?.nric}</p>
                <p><span className="font-semibold">Clinic:</span> {data.headerInformation?.clinicName}</p>
              </div>
            </div>

            {/* BASIC INFORMATION */}
            <div className="bg-white rounded-lg border border-gray-300 shadow-sm overflow-hidden">
              <div className="bg-gray-100 px-2 py-2 flex items-center gap-2 border-b border-gray-300">
                <Activity className="text-gray-800" />
                <h3 className="font-bold text-sky-800">
                  Basic Information
                </h3>
              </div>

              <div className="p-3 grid md:grid-cols-3 gap-3 text-black">
                <p><span className="font-semibold">Date & Time:</span> {data.basicInformation?.arrestDateTime}</p>
                <p><span className="font-semibold">Location:</span> {data.basicInformation?.location}</p>

                <p><span className="font-semibold">Doctor Informed By:</span> {data.basicInformation?.doctorInformedBy}</p>
                <p><span className="font-semibold">Doctor At:</span> {data.basicInformation?.doctorAt}</p>

                <p><span className="font-semibold">Doctor Arrived At:</span> {data.basicInformation?.doctorArrivedAt}</p>
                <p><span className="font-semibold">Doctor Name:</span> {data.basicInformation?.doctorName}</p>

                <p><span className="font-semibold">Relatives Informed By:</span> {data.basicInformation?.relativesInformedBy}</p>
                <p><span className="font-semibold">Relatives At:</span> {data.basicInformation?.relativesAt}</p>

                <p><span className="font-semibold">Relatives Arrived:</span> {data.basicInformation?.relativesArrivedAt}</p>
                <p><span className="font-semibold">Relative Name:</span> {data.basicInformation?.relativeName}</p>

                <p><span className="font-semibold">Ambulance Called By:</span> {data.basicInformation?.ambulanceCalledBy}</p>
                <p><span className="font-semibold">Ambulance At:</span> {data.basicInformation?.ambulanceAt}</p>

                <p><span className="font-semibold">Ambulance Arrived:</span> {data.basicInformation?.ambulanceArrivedAt}</p>
                <p><span className="font-semibold">HD Concluded At:</span> {data.basicInformation?.hdConcludedAt}</p>

                <p><span className="font-semibold">HD By:</span> {data.basicInformation?.hdBy}</p>
              </div>
            </div>

            {/* AIRWAY + CIRCULATION */}
            <div className="grid lg:grid-cols-2 gap-6">

              {/* AIRWAY */}
              <div className="bg-white rounded-lg border border-gray-300 shadow-sm overflow-hidden">
                <div className="bg-gray-100 px-2 py-2 flex items-center gap-2 border-b border-gray-300">
                  <Stethoscope className="text-gray-800" />
                  <h3 className="font-bold text-sky-800">
                    Airway Ventilation
                  </h3>
                </div>

                <div className="p-3 grid md:grid-cols-2 gap-2 text-black">
                  <p><span className="font-semibold">Respiration:</span> {data.airwayVentilation?.respiration}</p>
                  <p><span className="font-semibold">Oxygen Administered:</span> {data.airwayVentilation?.oxygenAdministered}</p>
                  <p><span className="font-semibold">Assist Ventilation At:</span> {data.airwayVentilation?.assistVentilationAt}</p>
                  <p><span className="font-semibold">Ventilation By:</span> {data.airwayVentilation?.ventilationBy}</p>
                  <p><span className="font-semibold">Intubated By:</span> {data.airwayVentilation?.intubatedBy}</p>
                  <p><span className="font-semibold">Intubated Time:</span> {data.airwayVentilation?.intubatedTime}</p>
                  <p><span className="font-semibold">Tube Size:</span> {data.airwayVentilation?.tubeSize}</p>
                </div>
              </div>

              {/* CIRCULATION */}
              <div className="bg-white rounded-lg border border-gray-300 shadow-sm overflow-hidden">
                <div className="bg-gray-100 px-2 py-2 flex items-center gap-2 border-b border-gray-300">
                  <HeartPulse className="text-gray-800" />
                  <h3 className="font-bold text-sky-800">
                    Circulation
                  </h3>
                </div>

                <div className="p-3 grid md:grid-cols-2 gap-2 text-black">
                  <p><span className="font-semibold">Carotid Pulse:</span> {data.circulation?.carotidPulse}</p>
                  <p><span className="font-semibold">Blood Pressure:</span> {data.circulation?.bloodPressure}</p>
                  <p><span className="font-semibold">BP Time:</span> {data.circulation?.bpTime}</p>
                  <p><span className="font-semibold">ECG Rhythm:</span> {data.circulation?.ecgRhythm}</p>
                  <p><span className="font-semibold">ECG Time:</span> {data.circulation?.ecgTime}</p>
                  <p><span className="font-semibold">Chest Compression At:</span> {data.circulation?.chestCompressionAt}</p>
                  <p><span className="font-semibold">Chest Compression By:</span> {data.circulation?.chestCompressionBy}</p>
                  <p><span className="font-semibold">AED Applied:</span> {data.circulation?.aedApplied}</p>
                  <p><span className="font-semibold">AED Time:</span> {data.circulation?.aedTime}</p>
                </div>
              </div>
            </div>

            {/* VASCULAR ACCESS */}
            <div className="bg-white rounded-lg border border-gray-300 shadow-sm overflow-hidden">
              <div className="bg-gray-100 px-3 py-3 flex items-center gap-2 border-b border-gray-300">
                <Syringe className="text-gray-800" />
                <h3 className="font-bold text-sky-800">
                  Vascular Access
                </h3>
              </div>

              <div className="p-2 grid md:grid-cols-3 gap-2 text-black">
                <p><span className="font-semibold">AVF Access:</span> {data.vascularAccess?.avfAccess}</p>
                <p><span className="font-semibold">AVF Time:</span> {data.vascularAccess?.avfTime}</p>

                <p><span className="font-semibold">AVF Site:</span> {data.vascularAccess?.avfSite}</p>
                <p><span className="font-semibold">CVC Access:</span> {data.vascularAccess?.cvcAccess}</p>

                <p><span className="font-semibold">CVC Time:</span> {data.vascularAccess?.cvcTime}</p>
                <p><span className="font-semibold">CVC Site:</span> {data.vascularAccess?.cvcSite}</p>

                <p><span className="font-semibold">IV Cannula Time:</span> {data.vascularAccess?.ivCannulaTime}</p>
                <p><span className="font-semibold">IV Site:</span> {data.vascularAccess?.ivCannulaSite}</p>

                <p><span className="font-semibold">Inserted By:</span> {data.vascularAccess?.insertedBy}</p>
              </div>
            </div>

            {/* OBSERVATIONS */}
            <div className="bg-white rounded-lg border border-gray-300 shadow-sm overflow-hidden">
              <div className="bg-gray-100 px-2 py-2 flex items-center gap-2 border-b border-gray-300">
                <FileHeart className="text-gray-800" />
                <h3 className="font-bold text-sky-800">
                  Observations
                </h3>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-sky-50 text-sky-600">
                      <th className="border border-gray-300 p-2">Time</th>
                      <th className="border border-gray-300 p-2">HR</th>
                      <th className="border border-gray-300 p-2">BP</th>
                      <th className="border border-gray-300 p-2">RR</th>
                      <th className="border border-gray-300 p-2">Pubils</th>
                      <th className="border border-gray-300 p-2">ECG</th>
                      <th className="border border-gray-300 p-2">Tracking</th>
                      <th className="border border-gray-300 p-2">Notes</th>
                    </tr>
                  </thead>

                  <tbody>
                    {data.observations?.map((o, i) => (
                      <tr key={i} className="text-center text-black">
                        <td className="border border-sky-100 p-2">{o.time}</td>
                        <td className="border border-sky-100 p-2">{o.hr}</td>
                        <td className="border border-sky-100 p-2">{o.bp}</td>
                        <td className="border border-sky-100 p-2">{o.rr}</td>
                        <td className="border border-sky-100 p-2">{o.pupils}</td>
                        <td className="border border-sky-100 p-2">{o.ecgRhythm}</td>
                        <td className="border border-sky-100 p-2">{o.printedTracing}</td>
                        <td className="border border-sky-100 p-2">{o.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* DRUG RECORDS */}
            <div className="bg-white rounded-lg border border-gray-300 shadow-sm overflow-hidden">
              <div className="bg-gray-100 px-2 py-2 flex items-center gap-2 border-b border-gray-300">
                <Pill className="text-gray-800" />
                <h3 className="font-bold text-sky-800">
                  Drug Records
                </h3>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-sky-50 text-sky-800">
                      <th className="border border-gray-300 p-2">Time</th>
                      <th className="border border-gray-300 p-2">ECG Rhythm</th>
                      <th className="border border-gray-300 p-2">AED Defibrillation</th>
                      <th className="border border-gray-300 p-2">Adrenaline</th>
                      <th className="border border-gray-300 p-2">Ca Gluconate</th>
                      <th className="border border-gray-300 p-2">NaHCO3</th>
                      <th className="border border-gray-300 p-2">Other Drugs</th>
                      <th className="border border-gray-300 p-2">Route</th>
                       <th className="border border-gray-300 p-2">Administered By</th>
                    </tr>
                  </thead>

                  <tbody>
                    {data.drugRecords?.map((d, i) => (
                      <tr key={i} className="p-2 text-center text-black">
                        <td className="border border-sky-100 p-2">{d.time}</td>
                        <td className="border border-sky-100 p-2">{d.ecgRhythm}</td>
                        <td className="border border-sky-100 p-2">{d.aedDefibrillation}</td>
                        <td className="border border-sky-100 p-2">{d.adrenaline}</td>
                        <td className="border border-sky-100 p-2">{d.atropine}</td>
                        <td className="border border-sky-100 p-2">{d.caGluconate}</td>
                        <td className="border border-sky-100 p-2">{d.naHCO3}</td>
                        <td className="border border-sky-100 p-2">{d.otherDrugs}</td>
                        <td className="border border-sky-100 p-2">{d.route}</td>
                        <td className="border border-sky-100 p-2">{d.administeredBy}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* OUTCOME */}
            <div className="bg-white rounded-lg border border-gray-300 shadow-sm overflow-hidden">
              <div className="bg-gray-100 px-2 py-2 flex items-center gap-2 border-b border-gray-300">
                <ClipboardList className="text-gray-800" />
                <h3 className="font-bold text-sky-800">
                  Outcome
                </h3>
              </div>

              <div className="p-2 grid md:grid-cols-3 gap-2 text-black">
                <p><span className="font-semibold">CPR Ended:</span> {data.outcome?.cprEnded}</p>
                <p><span className="font-semibold">ROSC:</span> {data.outcome?.returnOfCirculation ? "Yes" : "No"}</p>

                <p><span className="font-semibold">EMS Arrived:</span> {data.outcome?.emsArrived ? "Yes" : "No"}</p>
                <p><span className="font-semibold">EMS At:</span> {data.outcome?.emsAt}</p>

                <p><span className="font-semibold">Transferred To:</span> {data.outcome?.transferredTo}</p>
                <p><span className="font-semibold">Transferred Time:</span> {data.outcome?.transferredTime}</p>

                <p><span className="font-semibold">Escorted By:</span> {data.outcome?.escortedBy}</p>
              </div>
            </div>

            {/* NURSES */}
            <div className="bg-white rounded-2xl border border-gray-300 shadow-sm overflow-hidden">
              <div className="bg-gray-100 px-2 py-2 flex items-center gap-2 border-b border-gray-300">
                <PenSquare className="text-gray-800" />
                <h3 className="font-bold text-sky-800">
                  Nurses Signatures
                </h3>
              </div>

              <div className="p-3 grid md:grid-cols-3 gap-4">
                {data.nurses?.map((n, i) => (
                  <div
                    key={i}
                    className="border border-gray-300 rounded-xl p-4 bg-sky-50 text-center"
                  >
                    <p className="font-semibold text-sky-800">{n.name}</p>
                    <p className="text-slate-600 mt-8">{n.signature}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}

export default ReportFormPreview;