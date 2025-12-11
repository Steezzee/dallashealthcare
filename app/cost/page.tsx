"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import procedureDatajson from "./data.json";
import hospitalsDatajson from "./data2.json";

import { Circle, Info } from "lucide-react";
import ErrorPopup from "./ErrorPopup";
import InformationPop from "./InformationPop";

// Procedure popup modals
import ShowSkullModal from "./ShowSkullModal";
import ShowArmModal from "./ShowArmModal";
import ShowRibModal from "./ShowRibModal";
import ShowFingerModal from "./ShowFingerModal";

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

  const [procedureSearch, setProcedureSearch] = useState("");
  const [hospitalSearch, setHospitalSearch] = useState("");

  const [savedProcedure, setSavedProcedure] = useState<any>(null);
  const [selectedHospital, setSelectedHospital] = useState<any>(null);

  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [messageError, setMessageError] = useState("");

  const [showInfo, setShowInfo] = useState(false);
  const [infoMessage, setInfoMessage] = useState("");

  // dropdown state
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // confirmation for clearing procedure and hospital
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [showClearHospitalConfirm, setShowClearHospitalConfirm] = useState(false);

  // procedure modals
  const [showSkullModal, setShowSkullModal] = useState(false);
  const [showArmModal, setShowArmModal] = useState(false);
  const [showRibModal, setShowRibModal] = useState(false);
  const [showFingerModal, setShowFingerModal] = useState(false);

  useEffect(() => {
    setProcedures(procedureData.map((item) => ({ ...item, visible: false })));
    setHospitals(hospitalsData.map((item) => ({ ...item, visible: false })));

    const saved = localStorage.getItem("procedureData");
    if (saved) setSavedProcedure(JSON.parse(saved));

    const savedHosp = localStorage.getItem("selectedHospital");
    if (savedHosp) setSelectedHospital(JSON.parse(savedHosp));
  }, []);

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

  // search hospital
  const handleHospitalSearch = () => {
    const term = hospitalSearch.trim().toLowerCase();
    const found = hospitals.some((h) => h.name.toLowerCase().includes(term));

    if (!found || term.length === 0) {
      setMessageError("Invalid Location. Try typing 'dallas'");
      setShowErrorPopup(true);
      return;
    }

    setHospitals((prev) =>
      prev.map((h) => ({ ...h, visible: h.name.toLowerCase().includes(term) && term.length > 0 }))
    );
  };

  // clear procedure
  const confirmClearProcedure = () => {
    localStorage.removeItem("procedureData");
    setSavedProcedure(null);
    setProcedureSearch("");
    setShowSkullModal(false);
    setShowArmModal(false);
    setShowRibModal(false);
    setShowFingerModal(false);
    setShowClearConfirm(false);
  };

  // clear hospital
  const confirmClearHospital = () => {
    localStorage.removeItem("selectedHospital");
    setSelectedHospital(null);
    setHospitalSearch("");
    setHospitals((prev) => prev.map((h) => ({ ...h, visible: false })));
    setShowClearHospitalConfirm(false);
  };

  // calculate button, ensure user cant get a report til they complete form
  const handleCalculate = () => {
    if (!savedProcedure) {
      setMessageError("Please select and complete a procedure first!");
      setShowErrorPopup(true);
      return;
    }

    // report pop up based on proced chosen
    switch (savedProcedure.procedureType) {
      case "Skull Fracture":
        setShowSkullModal(true);
        break;
      case "Arm Fracture":
        setShowArmModal(true);
        break;
      case "Rib Fracture":
        setShowRibModal(true);
        break;
      case "Phalanges Fracture":
        setShowFingerModal(true);
        break;
      default:
        break;
    }
  };

  return (
    <div className="font-sans grid items-center justify-items-center min-h-screen p-4 pb-20 gap-16 sm:p-20 bg-[#D5EBE3]">
      <main className="grid grid-cols-[1fr_1fr] gap-8 items-start justify-items-center bg-white-100 p-5 min-h-screen">

        {/* procedure search */}
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
                      onClick={() => {
                        setProcedureSearch(proced.name);
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

          {/*  display saved procedure */}
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
                <button onClick={() => setShowClearConfirm(true)} className="text-red-500 hover:text-red-800 font-bold">
                  Clear Procedure
                </button>
              </div>
            </div>
          )}
        </section>

        
        <div className="flex flex-col gap-8 self-start">

          {/* hospitla */}
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
                <button onClick={() => setShowClearHospitalConfirm(true)} className="text-red-500 hover:text-red-800 font-bold">
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

          {/*Compute Cost  */}
          <section className="relative bg-sky-100 p-6 rounded-xl w-[330px] flex flex-col gap-4 mt-4">
            <div className="absolute top-0 left-0">
              <div className="relative">
                <Circle size={30} strokeWidth={2} className="text-black" />
                <span className="absolute inset-0 flex items-center justify-center text-black font-semibold">3</span>
              </div>
            </div>

            <h2 className="text-xl font-semibold text-center">STEP 3: Compute Cost</h2>

            <button
              onClick={handleCalculate}
              className="bg-sky-950 text-white px-4 py-2 rounded hover:-translate-y-0.5 transition-all duration-200 mt-4"
            >
              Calculate
            </button>
          </section>

        </div>
      </main>

      
      {showSkullModal && <ShowSkullModal onClose={() => setShowSkullModal(false)} />}
      {showArmModal && <ShowArmModal onClose={() => setShowArmModal(false)} />}
      {showRibModal && <ShowRibModal onClose={() => setShowRibModal(false)} />}
      {showFingerModal && <ShowFingerModal onClose={() => setShowFingerModal(false)} />}

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
              onClick={confirmClearProcedure} 
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* confirm clear hopsital pop up */}
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
            <div className="flex justify-center gap-4">
              <button onClick={() => setShowClearHospitalConfirm(false)} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
                Cancel
              </button>
              <button onClick={confirmClearHospital} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* error and info pop ups */}
      {showErrorPopup && <ErrorPopup message={messageError} onClose={() => setShowErrorPopup(false)} />}
      {showInfo && <InformationPop message={infoMessage} onClose={() => setShowInfo(false)} />}
    </div>
  );
}
