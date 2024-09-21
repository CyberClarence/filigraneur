"use client";
import { useEffect } from "react";
import { pdfjs } from "react-pdf";

// pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.6.82/pdf.min.mjs`;

interface WatermarkFormProps {
  watermarkText: string;
  onWatermarkChange: (text: string) => void;
  onApplyWatermark: () => void;
}

export default function WatermarkForm({
  watermarkText,
  onWatermarkChange,
  onApplyWatermark,
}: WatermarkFormProps) {
  useEffect(() => {}, []);
  return (
    <div className="flex flex-col w-full gap-2">
      <input
        type="text"
        value={watermarkText}
        onChange={(e) => onWatermarkChange(e.target.value)}
        className="w-full px-3 py-2  border rounded"
        placeholder="Entrez le texte du filigrane (ex: usage exclusif site.com)"
      />
      <button
        onClick={onApplyWatermark}
        className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Appliquer le filigrane
      </button>
    </div>
  );
}
