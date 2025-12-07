"use client";
import React from "react";
import { CircleX } from "lucide-react";

interface InformationPopProp {
  message: string;
  onClose: () => void;
}

export default function InformationPop({ message, onClose }: InformationPopProp) {
  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 backdrop-blur-sm">

      {/* main container */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-[90%] max-w-xl p-6 animate-fadeIn scale-animation">

        {/* close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 hover:scale-110 transition-transform"
        >
          <CircleX size={28} className="text-gray-600 hover:text-black" />
        </button>

        {/* title */}
        <h2 className="text-2xl font-semibold mb-4 text-gray-900">
          Additional Information
        </h2>

     
        <div className="max-h-[60vh] overflow-y-auto pr-2">

          <p className="text-lg leading-relaxed text-gray-800 whitespace-pre-line">
            {message}
          </p>

        </div>
      </div>
    </div>
  );
}
