"use client";

import { useState, useRef } from "react";
import { saveAs } from "file-saver";
import FileUpload from "@/components/FileUpload";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { applyWatermark as _applyWatermark } from "@/components/Watermarkcanvas";
import WatermarkForm from "@/components/WatermarkForm";
import Preview from "@/components/Preview";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [watermarkText, setWatermarkText] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFileChange = (selectedFile: File) => {
    setFile(selectedFile);
    generateWatermarkPreview();
    setPreview(null);
  };

  const handleWatermarkChange = (text: string) => {
    setWatermarkText(text);
  };

  const generateWatermarkPreview = async () => {
    if (!file || !watermarkText) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    await _applyWatermark(canvas, file, watermarkText);
    setPreview(canvas.toDataURL());
  };

  const handleDownload = () => {
    if (preview) {
      saveAs(preview, "watermarked_document.png");
    }
  };

  return (
    <div className="flex flex-col items-center  h-full w-full p-4 bg-white text-gray-800 mx-auto">
      <Header />
      <div className="flex flex-col w-full items-center justify-start h-full  ">
        <div className="w-full max-w-md items-center justify-start ">
          <FileUpload onFileChange={handleFileChange} />
          <WatermarkForm
            watermarkText={watermarkText}
            onWatermarkChange={handleWatermarkChange}
            onApplyWatermark={generateWatermarkPreview}
          />
          <Preview preview={preview} onDownload={handleDownload} />
        </div>
        <canvas ref={canvasRef} style={{ display: "none" }} />
      </div>
      <Footer />
      <script src="/pdfjs/pdf.mjs" type="module" async />
    </div>
  );
}
