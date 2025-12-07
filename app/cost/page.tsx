"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import procedureDatajson from "./data.json";
import hospitalsDatajson from "./data2.json";
import ReportPopup from "./ReportPopup";
import { Circle, Info } from "lucide-react";
import ErrorPopup from "./ErrorPopup";
import InformationPop from "./InformationPop";

interface Item {
  id: number;
  name: string;
  info: string;
}

const procedureData = procedureDatajson as Item[];
const hospitalsData = hospitalsDatajson as Item[];

export default function Cost() {
  const router = useRouter();

  const [procedure, setProcedures] = useState<Array<Item & { visible: boolean }>>([]);
  const [hospitals, setHospitals] = useState<Array<Item & { visible: boolean }>>([]);

  const [procedureSearch, setprocedureSearch] = useState("");
  const [hospitalSearch, setHospitalSearch] = useState("");

  const [showReport, setshowReport] = useState(false);
  const [showErrorPopup, setshowErrorPopup] = useState(false);
  const [messageError, setError] = useState("");
  const [showInfo, setShowInfo] = useState(false);
  const [infoMessage, setInfoMessage] = useState("");

  const [savedProcedure, setSavedProcedure] = useState<any>(null);
  const [selectedHospital, setSelectedHospital] = useState<any>(null);

  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    setProcedures(
      procedureData.map((item) => ({ ...item, visible: false }))
    );

    setHospitals(
      hospitalsData.map((item) => ({ ...item, visible: false }))
    );

    const saved = localStorage.getItem("procedureData");
    if (saved) setSavedProcedure(JSON.parse(saved));

    const savedHosp = localStorage.getItem("selectedHospital");
    if (savedHosp) setSelectedHospital(JSON.parse(savedHosp));
  }, []);

  const handleHospitalSearch = () => {
    const term = hospitalSearch.trim().toLowerCase();
    const listTerms = hospitals.some((h) => h.name.toLowerCase().includes(term));

    if (!(listTerms && term.length > 0)) {
      setError("Invalid Location. Try typing 'dallas'");
      setshowErrorPopup(true);
      return;
    }

    setHospitals((prev) =>
      prev.map((hosp) => ({
        ...hosp,
        visible: hosp.name.toLowerCase().includes(term),
      }))
    );
  };

  // Navigation handler based on card name
  const handleCardClick = (name: string) => {
    if (name === "Arm Fractures") {
      router.push("./cost/armfractureform"); 
      console.log("Clicked card:", name);
    } else if (name === "Skull Fractures") {
      router.push("./cost/skullfractureform");
      console.log("Clicked card:", name);
    } else if (name === "Phalanges Fractures") {
      router.push("./cost/fingerfractureform");
      console.log("Clicked card:", name);
    } else if (name === "Rib Fractures") {
      router.push("./cost/ribfractureform");
      console.log("Clicked card: ", name);
    }
  };

  return (
    <div className="font-sans grid items-center justify-items-center min-h-screen p-4 pb-20 gap-16 sm:p-20 bg-[#D5EBE3]">
      <main className="grid grid-cols-[750px_350px] gap-8 items-start bg-[#D5EBE3] p-5 min-h-screen">
        {/*Step 1 */}
        <section className="relative bg-sky-100 rounded-xl w-full h-[650px] flex flex-col">
          <div className="absolute top-0 left-0">
            <div className="relative">
              <Circle size={30} strokeWidth={2} className="text-black" />
              <span className="absolute inset-0 flex items-center justify-center text-black font-semibold">1</span>
            </div>
          </div>

          <h2 className="text-xl font-semibold text-center px-2 py-2">STEP 1: Search Procedure</h2>

          {/* dropdown */}
          <div className="relative w-[690px] ml-9">
            <button
              className="w-full border p-2 rounded text-left bg-white"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              {procedureSearch || "Select a procedure"}
            </button>

            {dropdownOpen && (
              <ul className="absolute w-full max-h-60 overflow-y-auto border mt-1 bg-white rounded shadow-lg z-10">
                {procedure.map((p) => (
                  <li
                    key={p.id}
                    className="flex justify-between items-center p-2 cursor-pointer hover:bg-gray-100"
                  >
                    <span
                      onClick={() => {
                        setprocedureSearch(p.name);
                        handleCardClick(p.name);
                        setDropdownOpen(false);
                      }}
                    >
                      {p.name}
                    </span>
                    <span
                      className="ml-2 text-sky-800 hover:text-sky-950"
                      onClick={(e) => {
                        e.stopPropagation();
                        setInfoMessage(p.info);
                        setShowInfo(true);
                      }}
                    >
                      <Info />
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* saved procedure card */}
          {savedProcedure && (
            <div className="bg-blue-50 border-3 border-blue-500 ml-7 p-4 rounded w-[690px] mt-10">
              <h3 className="font-bold text-lg text-black mb-2">Selected Procedure:</h3>
              <div className="flex justify-between items-center">
                <h3 className="font-medium text-lg text-black mb-2">{savedProcedure.procedureType}</h3>
                <div className="text-sm text-gray-700 mt-2">
                  {Object.entries(savedProcedure.selections).map(([key, values]) => {
                    const valuesArr = values as string[];
                    if (!valuesArr.length) return null;
                    return (
                      <p key={key}>
                        <strong className="capitalize">{key}:</strong> {valuesArr.join(", ")}
                      </p>
                    );
                  })}
                </div>
                <button
                  onClick={() => {
                    localStorage.removeItem("procedureData");
                    setSavedProcedure(null);
                  }}
                  className="text-red-500 hover:text-red-800 font-bold"
                >
                  Clear Procedure
                </button>
              </div>
            </div>
          )}
        </section>

        
        <div className="flex flex-col gap-8">
          {/* Step 2: Hospital search */}
          <section className="relative bg-sky-100 p-6 rounded-xl w-full flex flex-col gap-4">
            <div className="absolute top-0 left-0">
              <div className="relative">
                <Circle size={30} strokeWidth={2} className="text-black" />
                <span className="absolute inset-0 flex items-center justify-center text-black font-semibold">2</span>
              </div>
            </div>

            <h2 className="text-xl font-semibold text-center">STEP 2: Search Hospital</h2>

            <input
              type="text"
              placeholder="Type: ..."
              value={hospitalSearch}
              onChange={(e) => setHospitalSearch(e.target.value)}
              className="border p-2 rounded text-black"
            />

            <button
              onClick={handleHospitalSearch}
              className="bg-sky-950 text-white px-4 py-2 rounded hover:-translate-y-0.5 transition-all duration-200"
            >
              Search
            </button>

            {selectedHospital && (
              <div className="bg-blue-50 border-2 border-blue-500 p-3 rounded mt-4">
                <h3 className="font-bold">Selected Hospital:</h3>
                <p className="text-black text-lg">{selectedHospital.name}</p>
                <button
                  className="text-red-500 font-bold mt-2"
                  onClick={() => {
                    setSelectedHospital(null);
                    localStorage.removeItem("selectedHospital");
                    setHospitals((prev) => prev.map((h) => ({ ...h, visible: false })));
                    setHospitalSearch("");
                  }}
                >
                  Clear Hospital
                </button>
              </div>
            )}

            <div className="flex flex-col gap-3 mt-4">
              {hospitals
                .filter((h) => h.visible && !selectedHospital)
                .map((hospital) => (
                  <div
                    key={hospital.id}
                    className="bg-white p-3 border rounded cursor-pointer hover:bg-gray-100"
                    onClick={() => {
                      setSelectedHospital(hospital);
                      localStorage.setItem("selectedHospital", JSON.stringify(hospital));
                      setHospitals((prev) => prev.map((h) => ({ ...h, visible: false })));
                      setHospitalSearch("");
                    }}
                  >
                    <strong>{hospital.name}</strong>
                  </div>
                ))}
            </div>
          </section>

          {/* Step 3: Computed Cost */}
          <section className="relative bg-sky-100 p-6 rounded-xl w-full flex flex-col gap-4">
            <div className="absolute top-0 left-0">
              <div className="relative">
                <Circle size={30} strokeWidth={2} className="text-black" />
                <span className="absolute inset-0 flex items-center justify-center text-black font-semibold">3</span>
              </div>
            </div>

            <h2 className="text-xl font-semibold text-center">STEP 3: Computed Cost</h2>

            <button
              onClick={() => setshowReport(true)}
              className="bg-sky-950 text-white px-4 py-2 rounded hover:-translate-y-0.5 transition-all duration-200"
            >
              Calculate
            </button>

            {showReport && <ReportPopup onClose={() => setshowReport(false)} />}
            {showErrorPopup && <ErrorPopup message={messageError} onClose={() => setshowErrorPopup(false)} />}
            {showInfo && <InformationPop message={infoMessage} onClose={() => setShowInfo(false)} />}
          </section>
        </div>
      </main>
    </div>
  );
}
