"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import procedureDatajson from "./data.json";
import hospitalsDatajson from "./data2.json";
import ReportPopup from "./ReportPopup";

interface Item {
  id: number;
  name: string;
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
  
  // Load JSON data
  useEffect(() => {
    setProcedures(procedureData.map((item) => ({
       ...item, 
       visible: false })));

    setHospitals(hospitalsData.map((item) => ({ //added hospitals
       ...item, 
       visible: false }))); 
  }, []);

  // hard coded data: user types broken bone for options to appear
  const handleprocedureSearch = () => {
    const shouldShow = procedureSearch.trim().toLowerCase() === "broken bone";
    setProcedures((prev) =>
      prev.map((inj) => ({
        ...inj,
        visible: shouldShow,
      }))
    );
  };

  // hard-coded data: user types dallas for options to appear
  const handleHospitalSearch = () => {
    const term = hospitalSearch.trim().toLowerCase();
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
    } else if (name === "Phalanges Fractures (Broken Finger(s))") {
      router.push("./cost/fingerfractureform");
      console.log("Clicked card:", name);
    } else if (name === "Rib Fractures") {
      router.push("./cost/ribfractureform");
      console.log("Clicked card: ", name)
    }

    
  };


  return (
    <div className="font-sans grid items-center justify-items-center min-h-screen p-4 pb-20 gap-16 sm:p-20 bg-gray-100">

      <main className="grid grid-cols-[1fr_1fr] gap-8 items-start justify-items-center bg-gray-100 p-6 min-h-screen">

        {/* procedure search */}
        <section className="bg-sky-100 rounded-xl w-200 flex flex-col h-150 justify-self-start self-start"> 
          <h2 className="text-xl font-semibold text-center px-4 py-4">Search Procedure</h2>
          <input
            type="text"
            placeholder="Type: broken bone"
            value={procedureSearch}
            onChange={(e) => setprocedureSearch(e.target.value)}
            className="border p-2 rounded text-black ml-9 mb-6 w-180"
          />
          <button
            onClick={handleprocedureSearch}
            className="bg-sky-950 text-white px-4 py-2 rounded 
            container hover:-translate-y-0.5 transition-all duration-200 ml-9 w-180" 
          >
            Search
          </button>

          <div className="flex flex-col gap-3 mt-4">
            {procedure.map(
              (proced) =>
                proced.visible && (
                  <div
                    key={proced.id}
                    className="bg-white p-3 border rounded cursor-pointer hover:bg-gray-100"
                    onClick={() => handleCardClick(proced.name)}
                  >
                    <strong>{proced.name}</strong>
                  </div>
                )
            )}
          </div>
        </section>
          <div className="flex flex-col gap-8 self-start">
            
        {/*hospital search */}
        <section className="bg-sky-100 p-6 rounded-xl w-130 flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-center">Search Hospital</h2>
          <input
            type="text"
            placeholder="Type: dallas"
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
                    className="bg-white p-3 border rounded"
                  >
                    <strong>{hospital.name}</strong>
                  </div>
                )
            )}
        
          </div>
        </section>
      
      {/*Computed Cost, so total cost computed from procedure of chosen hospital (work in progress)*/}
        <section className="bg-sky-100 p-6 rounded-xl w-130 flex flex-col gap-4 h-50">
          <h2 className="text-xl font-semibold text-center">Computed Cost</h2>

          <button onClick={() => setshowReport(true)}
           
            className="bg-sky-950 text-white px-4 py-2 rounded container 
            hover:-translate-y-0.5 transition-all duration-200">
            Calculate 
            
          </button>
          {showReport && <ReportPopup onClose={()=>setshowReport(false)}/>}
        </section>
        </div>
      </main>
    </div>
  ); 
}

