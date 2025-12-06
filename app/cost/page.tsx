"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import procedureDatajson from "./data.json";
import hospitalsDatajson from "./data2.json";
import ReportPopup from "./ReportPopup";
import {Circle} from "lucide-react";
import ErrorPopup from "./ErrorPopup";
import {Info} from "lucide-react";
import InformationPop from "./InformationPop";



interface Item {
  id: number;
  name: string;
  info: string;
}
//convert json to array
const procedureData = procedureDatajson as Item[];
const hospitalsData = hospitalsDatajson as Item[]

export default function Cost() {
  const router = useRouter();
  const [procedure, setProcedures] = useState<Array<Item & { visible: boolean }>>([]);
  const [hospitals, setHospitals] = useState<Array<Item & { visible: boolean }>>([]);
  const [procedureSearch, setprocedureSearch] = useState("");
  const [hospitalSearch, setHospitalSearch] = useState("");
  const [showReport, setshowReport] = useState(false)
  const [showErrorPopup, setshowErrorPopup] = useState(false);
  const[messageError, setError] = useState("");
  const [showInfo, setShowInfo] = useState(false);
  const [infoMessage, setInfoMessage] = useState("");
  const [savedProcedure, setSavedProcedure] = useState<any>(null);

 // const handleClose = () => {setshowErrorPopup(false);};
  
  
  // Load JSON data
  useEffect(() => {
    setProcedures(procedureData.map((item) => ({
       ...item, 
       visible: false })));

    setHospitals(hospitalsData.map((item) => ({ //added hospitals
       ...item, 
       visible: false }))); 

    const saved = localStorage.getItem("procedureData");
    if (saved) {
      setSavedProcedure(JSON.parse(saved));
    }
  }, []);

  // hard coded data: user types broken bone for options to appear
  const handleprocedureSearch = () => {
    const shouldShow = procedureSearch.trim().toLowerCase() === "fracture";
     if(!shouldShow){
      setError("Invalid procedure. Try typing 'fracture'");
      setshowErrorPopup(true);
      return;
    }
    setProcedures((prev) =>
      prev.map((inj) => ({
        ...inj,
        visible: shouldShow,
      }
  ))
    );
  
  };

  

  // hard-coded data: user types dallas for options to appear
  const handleHospitalSearch = () => {
    const term = hospitalSearch.trim().toLowerCase();
    const listTerms = hospitals.some(h=> h.name.toLowerCase().includes(term));
    if(!listTerms && term.length>0){
      setError("Invalid Location. Try typing 'dallas'");
      setshowErrorPopup(true);
      return;
    }
    setHospitals((prev) =>
      prev.map((hosp) => ({...hosp,
        visible: hosp.name.toLowerCase().includes(term) && term.length > 0,
      }))
    );
  };

  
   // Navigation handler based on card name
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
    }
  
    
  };


  return (
    <div className="font-sans grid items-center justify-items-center min-h-screen p-4 pb-20 gap-16 sm:p-20 bg-white-100">

      <main className="grid grid-cols-[1fr_1fr] gap-8 items-start justify-items-center bg-white-100 p-5 min-h-screen">

        {/* procedure search */}
        <section className="relative bg-sky-100 rounded-xl w-[750px] h-[650px] flex flex-col">
 
          <div className="absolute -top-0.000001 -left-0.00000001">
            <div className= "relative">
              <Circle size={30} strokeWidth={2} className="text-black"/>
              <span className="absolute inset-0 flex items-center justify-center text-black font-semibold">
                1
              </span>
            </div>
          </div>
          <h2 className="text-xl font-semibold text-center px-2 py-2">Search Procedure</h2>
          <input
            type="text"
            placeholder="Type: ..."
            value={procedureSearch}
            onChange={(e) => setprocedureSearch(e.target.value)}
            className="border p-2 rounded text-black ml-9 mb-6 w-[690px]"
          />
          <button
            onClick={handleprocedureSearch}
            className="bg-sky-950 text-white px-4 py-2 rounded 
            container hover:-translate-y-0.5 transition-all duration-200 ml-9 w-[690px]" 
          >
            Search
          </button>

          {/* conditional card for selected procedure */}

          {savedProcedure && (
            <div className="bg-blue-50 border-3 border-blue-500 m1-9 p-4 rounded w-[690px] mt-10 items-center">
              <h3 className="font-bold text-lg text-black mb-2">
                  Selected Procedure:
                </h3>
              <div className="flex justify-between items-center">
                <h3 className="font-medium text-lg text-black mb-2">
                  {savedProcedure.procedureType}
                </h3>
                <div className="text-sm text-gray-700 mt-2">
                  {Object.entries(savedProcedure.selections).map(([key, values]) => {
                    const valuesArr = values as string[];
                    if (valuesArr.length === 0) return null; // no selections
                    if (valuesArr.length > 0) {
                      return (
                        <p key={key}>
                          <strong className="capitalize">{key}:</strong> {valuesArr.join(', ')}
                        </p>
                      );
                    }
                      return null;
                  })}
                </div>
              <button onClick={() => {
                localStorage.removeItem('procedureData');
                setSavedProcedure(null);
              }}
              className="text-red-500 hover:text-red-800 font-bold">
                Clear Procedure
              </button>
              </div>
            </div>
          )}

          <div className="flex flex-col gap-3 mt-4">
            {procedure.map(
              (proced) =>
                proced.visible && (
                  <div
                    key={proced.id}
                    className="bg-white p-3 border rounded cursor-pointer hover:bg-gray-100 w-[690px] ml-9"
                    onClick={() => handleCardClick(proced.name)}
                  >
                    <strong>{proced.name}</strong>
                    <Info 
                    size={24}
                    className = "text-sky-800 hover:text-sky-950 cursor-pointer"
                    onClick={(e) =>  {
                      e.stopPropagation(); // stops from card clicking to forms yet
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
            
        {/*hospital search */}
        <section className="relative bg-sky-100 p-6 rounded-xl w-[330px] flex flex-col gap-4">
          <div className="absolute top-0 left-0">
            <div className= "relative">
              <Circle size={30} strokeWidth={2} className="text-black"/>
              <span className="absolute inset-0 flex items-center justify-center text-black font-semibold">
                2
              </span>
            </div>
          </div>
          <h2 className="text-xl font-semibold text-center">Search Hospital</h2>
          <input
            type="text"
            placeholder="Type: ..."
            value={hospitalSearch}
            onChange={(e) => setHospitalSearch(e.target.value)}
            className="border p-2 rounded text-black"
          /> 
          <button
            onClick={handleHospitalSearch}
            className="bg-sky-950 text-white px-4 py-2 rounded
            container hover:-translate-y-0.5 transition-all duration-200"
          >
            Search
          </button>
            
          <div className="flex flex-col gap-3 mt-4">
            {hospitals.map(
              (hospital) =>
                hospital.visible && (
                  <div
                    key={hospital.id}
                    className="bg-white p-3 border rounded cursor-pointer hover:bg-gray-100"
                  >
                    <strong>{hospital.name}</strong>
                  </div>
                )
            )}
        
          </div>
        </section>
      
      {/*Computed Cost, so total cost computed from procedure of chosen hospital*/}
        <section className="relative bg-sky-100 p-6 rounded-xl w-[330px] flex flex-col gap-4">
          <div className="absolute -top-0 -left-0">
            <div className= "relative">
              <Circle size={30} strokeWidth={2} className="text-black"/>
              <span className="absolute inset-0 flex items-center justify-center text-black font-semibold">
                3
              </span>
            </div>
          </div>
          <h2 className="text-xl font-semibold text-center">Computed Cost</h2>

          <button onClick={() => setshowReport(true)}
           
            className="bg-sky-950 text-white px-4 py-2 rounded container 
            hover:-translate-y-0.5 transition-all duration-200">
            Calculate 
            
          </button>
          
          {showReport && <ReportPopup onClose={()=>setshowReport(false)}/>}

          {showErrorPopup &&( <ErrorPopup message={messageError} onClose={()=>setshowErrorPopup(false)}/>)}
          {showInfo && (<InformationPop message={infoMessage}onClose={() => setShowInfo(false)}/>)}
        </section>
        </div>
      </main>
    </div>
  ); 
}