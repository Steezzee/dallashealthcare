import React from 'react'
import { CircleX } from 'lucide-react';

//exit button function
interface setShowFingerModalProp{
    onClose: () => void;
};
//main report pop up
export default function ShowFingerModal({onClose}: setShowFingerModalProp){
    return(
    // background/homepage
        <div className="fixed inset-0 bg-transparent bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-[9999]">
            <div className="mt-10 flex flex-col gap-5 text-black">
            <button className="relative top-4 left-140" onClick={onClose}><CircleX size={30}/></button> 
            <div className="-mt-5 flex flex-col gap-5 text-black 
                  max-h-[90vh] overflow-y-auto p-6 bg-white rounded-xl shadow-xl">
{/*Main title*/}
                <h1 className="text-2xl font-bold text-center">ESTIMATED COST FOR PHALANGES PROCEDURE</h1>

{/*Formatting for each section of the computed cost price */}          
<section>							
<h2 className="text-xl font-semibold mb-3">Initital Cost</h2>
<div className="space-y-2">
              <div className="flex justify-between">ER Visit<span></span></div>
              <div className="flex justify-between">X-rays<span></span></div>
              <div className="flex justify-between">Casting<span></span></div>
              <div className="border-t pt-2 flex justify-between font-bold">
                Total Cost<span>$3,000</span>
              </div>
            </div>
</section>

<section>
<h2 className="text-xl font-semibold mb-3">Insurance Plan Details</h2>
             <div className="space-y-2">
              <div className="flex justify-between">Annual Deductible:<span>$2,400</span></div>
              <div className="flex justify-between">Coinsurance:<span>20%</span></div>
              <div className="text-sm flex justify-between">(plan pays 80%)</div>
              <div className="flex justify-between">ER Copay:<span>$200</span></div>
              <div className="flex justify-between">Annual Out-of-pocket Max:<span>$4,350</span></div>
            </div>
</section>

<section>
 <h2 className="text-xl font-semibold">ER-Copay</h2>
            <p className="mb-3">The copay is paid upfront as a fixed fee.</p>
            <div className="flex justify-between font-medium mb-2">
              ER Copay:<span>$210</span>
            </div>
            <div className="flex justify-between mb-2">
              Remaining Bill:<span>$5,700</span>
            </div>
</section>

<section>
<h2 className="text-xl font-semibold mb-3">Deductibles</h2>
            <div className="space-y-2">
              <div className="flex justify-between">Remaining Bill:<span>$3,700</span></div>
              <div className="flex justify-between">Deductible:<span>− $1,500</span></div>
              <div className="border-t pt-2 flex justify-between font-medium">
                 Remaining Bill:<span>$2,200</span>
              </div>
            </div>
</section>

<section>
<h2 className="text-xl font-semibold mb-3">Total Out-of-Pocket Cost</h2>
            <div className="space-y-2">
              <div className="flex justify-between">Copay:<span>$300</span></div>
              <div className="flex justify-between">Deductible:<span>$1,500</span></div>
              <div className="flex justify-between">Coinsurance:<span>$150</span></div>
              <div className="border-t pt-2 text-lg font-bold flex justify-between">
                 Total Cost:<span>$1,240</span>
              </div>
            </div>                                                                  
 </section>
            </div>
            </div>
            </div>
       
    )
     
}

