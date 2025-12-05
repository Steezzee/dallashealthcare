"use client"
import React from 'react'
import { CircleX } from 'lucide-react';

interface InformationPopProp{
    message:string;
    onClose: () => void;
};
//main report pop up
export default function InformationPop({ message, onClose }: InformationPopProp) {
    return(
    // background/homepage
        <div className="fixed inset-0 z-[999] bg-transparent bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
            <div className="mt-10 flex flex-col gap-5 text-black">
            <button className="relative top-3" onClick={onClose}><CircleX size={25}/></button> 
            <div className="-mt-8 flex flex-col gap-5 text-black 
                  max-h-[90vh] overflow-y-auto p-6 bg-white rounded-xl shadow-xl">
{/*Main title*/}
            

{/*Formatting for each section of the computed cost price */}          
<section>							
<p className="text-xl font-semibold mb-3">{message}</p>
</section>

</div>
</div>
</div>
    )}
