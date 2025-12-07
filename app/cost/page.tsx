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
// Convert JSON to array
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
 


  // hospital modal
  const [showClearHospitalConfirm, setShowClearHospitalConfirm] = useState(false); 
// dropdown state
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // confirmation for clearing procedure
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  useEffect(() => {
    setProcedures(procedureData.map((item) => ({ ...item, visible: false })));
    setHospitals(hospitalsData.map((item) => ({ ...item, visible: false })));

    const saved = localStorage.getItem("procedureData");
    if (saved) setSavedProcedure(JSON.parse(saved));

    const savedHosp = localStorage.getItem("selectedHospital");
    if (savedHosp) setSelectedHospital(JSON.parse(savedHosp));
  }, []);

  const handleprocedureSearch = () => {
    if (!procedureSearch) return;
    handleCardClick(procedureSearch);
  };

  const handleHospitalSearch = () => {
    const term = hospitalSearch.trim().toLowerCase();
    const listTerms = hospitals.some((h) => h.name.toLowerCase().includes(term));

    if (!(listTerms && term.length > 0)) {
      setError("Invalid Location. Try typing 'dallas'");
      setshowErrorPopup(true);
      return;
    }

    setHospitals((prev) =>
      prev.map((hosp) => ({ ...hosp, visible: hosp.name.toLowerCase().includes(term) && term.length > 0 }))
    );
  };

  const handleCardClick = (name: string) => {
    if (name === "Arm Fractures") {
      router.push("./cost/armfractureform"); 
      console.log("Clicked card:", name);
    } else if (name === "Skull Fractures") {
      router.push("./cost/skullfractureform")
      console.log("Clicked card:", name);
    } else if (name === "Phalanges Fractures") {
      router.push("./cost/fingerfractureform");
      console.log("Clicked card:", name);
    } else if (name === "Rib Fractures") {
      router.push("./cost/ribfractureform");
      console.log("Clicked card: ", name)
    }  };

  // Safety check before deleting procedure 
  const handleClearProcedure = () => {
    setShowClearConfirm(true);
  };

  // Open hospital confirmation
  const handleClearHospital = () => {
    setShowClearHospitalConfirm(true);
  };

  return (
    <div className="font-sans grid items-center justify-items-center min-h-screen p-4 pb-20 gap-16 sm:p-20 bg-[#D5EBE3]">
      <main className="grid grid-cols-[1fr_1fr] gap-8 items-start justify-items-center bg-white-100 p-5 min-h-screen">

        {/* procedure search*/}
        <section className="relative bg-sky-100 rounded-xl w-[750px] h-[650px] flex flex-col">

          <div className="absolute -top-0.000001 -left-0.00000001">
            <div className="relative">
              <Circle size={30} strokeWidth={2} className="text-black" />
              <span className="absolute inset-0 flex items-center justify-center text-black font-semibold">1</span>
            </div>
          </div>

          <h2 className="text-xl font-semibold text-center px-2 py-2">STEP 1: Search Procedure</h2>

          {/* dropdown */}
          <div className="relative ml-9 mb-6 w-[690px]">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="border p-2 rounded w-full text-left bg-white flex justify-between items-center"
            >
              {procedureSearch || "Select a procedure to estimate your cost..."}
              <span className="ml-2">▾</span>
            </button>

            {dropdownOpen && (
              <div className="absolute w-full bg-white border rounded mt-1 z-20 shadow-lg max-h-64 overflow-y-auto">
                {procedureData.map((proced) => (
                  <div
                    key={proced.id}
                    className="p-3 flex justify-between items-center hover:bg-gray-100 cursor-pointer"
                  >
                    <span
                      className="text-black"
                      onClick={() => {
                        setprocedureSearch(proced.name);
                        setDropdownOpen(false);
                        handleCardClick(proced.name);
                      }}
                    >
                      {proced.name}
                    </span>
                    <Info
                      size={22}
                      className="text-sky-800 hover:text-sky-900 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        setInfoMessage(proced.info);
                        setShowInfo(true);
                      }}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* display saved procedure */}
          {savedProcedure && (
            <div className="bg-blue-50 border-3 border-blue-500 ml-7 p-4 rounded w-[690px] mt-10">
              <h3 className="font-bold text-lg text-black mb-2">Selected Procedure:</h3>
              <div className="flex justify-between items-center">
                <h3 className="font-medium text-lg text-black mb-2">
                  {savedProcedure.procedureType}
                </h3>
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
                  onClick={handleClearProcedure}
                  className="text-red-500 hover:text-red-800 font-bold"
                >
                  Clear Procedure
                </button>
              </div>
            </div>
          )}

          {/* procedure options list */}
          <div className="flex flex-col gap-3 mt-4">
            {procedure.map(
              (proced) =>
                proced.visible && (
                  <div
                    key={proced.id}
                    onClick={() => handleCardClick(proced.name)}
                    className="bg-white p-3 border rounded cursor-pointer hover:bg-gray-100 w-[690px] ml-9 flex justify-between"
                  >
                    <strong>{proced.name}</strong>
                    <Info
                      size={24}
                      className="text-sky-800 hover:text-sky-950 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        setInfoMessage(proced.info);
                        setShowInfo(true);
                      }}
                    />
                  </div>
                )
            )}
          </div>
        </section>

        <div className="flex flex-col gap-8 self-start">

          {/* Hospital Search */}
          <section className="relative bg-sky-100 p-6 rounded-xl w-[330px] flex flex-col gap-4">
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

            {/* hospital selected */}
            {selectedHospital && (
              <div className="bg-blue-50 border-2 border-blue-500 p-3 rounded">
                <h3 className="font-bold">Selected Hospital:</h3>
                <p className="text-black text-lg">{selectedHospital.name}</p>
                <button
                  className="text-red-500 font-bold mt-2"
                  onClick={handleClearHospital}
                >
                  Clear Hospital
                </button>
              </div>
            )}

            {/* hospital options */}
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

          {/* Compute Cost */}
          <section className="relative bg-sky-100 p-6 rounded-xl w-[330px] flex flex-col gap-4">
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

            {/* procedure confirmation */}
            {showClearConfirm && (
              <div style={{
                position: 'fixed', 
                top: 0, 
                left: 0, 
                right: 0, 
                bottom: 0,
                backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex',
                justifyContent: 'center', alignItems: 'center', zIndex: 1000
              }}>
                <div style={{
                  backgroundColor: 'white', 
                  padding: '2rem', 
                  borderRadius: '8px',
                  maxWidth: '400px', 
                  textAlign: 'center'
                }}>
                  <h3 className="text-lg font-semibold mb-4">Confirm Clear Procedure</h3>
                  <p className="mb-6">Are you sure you want to clear the selected procedure?</p>
                  <div style={{ 
                    display: 'flex', 
                    gap: '1rem', 
                    justifyContent: 'center' 
                    }}>
                    <button 
                    onClick={() => 
                    setShowClearConfirm(false)} 
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancel</button>
                    <button 
                    onClick={() => {
                      localStorage.removeItem("procedureData");
                      setSavedProcedure(null);
                      setShowClearConfirm(false);
                    }} 
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Confirm</button>
                  </div>
                </div>
              </div>
            )}

            {/* hospital confirmation */}
            {showClearHospitalConfirm && (
              <div style={{
                position: 'fixed', 
                top: 0, 
                left: 0, 
                right: 0, 
                bottom: 0,
                backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex',
                justifyContent: 'center', alignItems: 'center', zIndex: 1000
              }}>
                <div style={{
                  backgroundColor: 'white', 
                  padding: '2rem', 
                  borderRadius: '8px',
                  maxWidth: '400px', 
                  textAlign: 'center'
                }}>
                  <h3 className="text-lg font-semibold mb-4">Confirm Clear Hospital</h3>
                  <p className="mb-6">Are you sure you want to clear the selected hospital?</p>
                  <div style={{ 
                    display: 'flex', 
                    gap: '1rem', 
                    justifyContent: 'center' 
                    }}>
                    <button 
                    onClick={() => 
                    setShowClearHospitalConfirm(false)} 
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancel</button>

                    <button 
                    onClick={() => {
                      setSelectedHospital(null);
                      localStorage.removeItem("selectedHospital");
                      setHospitals((prev) => 
                        prev.map((h) => 
                          ({ ...h, visible: false })));
                      setHospitalSearch("");
                      setShowClearHospitalConfirm(false);
                    }} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Confirm</button>
                  </div>
                </div>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
