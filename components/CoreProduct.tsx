"use client";

import { useState, useRef, useEffect } from "react";
import { saveAs } from "file-saver";
import { applyWatermark as _applyWatermark } from "@/components/Watermarkcanvas";
import WatermarkForm from "@/components/WatermarkForm";
import Preview from "@/components/Preview";

type CoreProductProps = {
  header: React.ReactNode;
  footer: React.ReactNode;
};

export default function CoreProduct({ header, footer }: CoreProductProps) {
  const [file, setFile] = useState<File | null>(null);
  const [watermarkText, setWatermarkText] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (selectedFile: File) => {
    setFile(selectedFile);
  };
  useEffect(() => {
    generateWatermarkPreview();
  }, [file]);

  const handleWatermarkChange = (text: string) => {
    setWatermarkText(text);
  };

  const generateWatermarkPreview = async () => {
    if (!file) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    await _applyWatermark(canvas, file, watermarkText || "demo");
    setPreview(canvas.toDataURL());
  };

  const handleDownload = () => {
    if (preview) {
      saveAs(preview, `${file.name.split(".")[0]}-filigrané.png`);
    }
  };

  return (
    <div className="flex flex-col items-center  h-full w-full p-4 bg-white text-gray-800 mx-auto overflow-auto">
      {header}
      <div className="flex flex-col w-full items-center justify-start h-full overflow-auto">
        <div className="w-full max-w-md items-center justify-start overflow-auto h-full flex flex-col gap-2">
          <input
            type="file"
            accept="image/*,application/pdf"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                handleFileChange(file);
              }
            }}
            ref={fileInputRef}
            className="border border-gray-300 rounded p-2 w-full"
          />
          <WatermarkForm
            watermarkText={watermarkText}
            onWatermarkChange={handleWatermarkChange}
            onApplyWatermark={generateWatermarkPreview}
          />
          <Preview
            preview={preview}
            onDownload={handleDownload}
            onSelectDocumentClick={() => {
              fileInputRef.current?.click();
            }}
          />
        </div>
        <canvas ref={canvasRef} style={{ display: "none" }} />
      </div>
      {footer}
      <script src="/pdfjs/pdf.mjs" type="module" async />
    </div>
  );
}
