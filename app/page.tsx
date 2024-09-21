"use client";

import { useState, useRef, useEffect } from "react";
import { saveAs } from "file-saver";
import FileUpload from "./FileUpload";
import WatermarkForm from "./WatermarkForm";
import Preview from "./Preview";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [watermarkText, setWatermarkText] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (!file) return;
    applyWatermark();
    setPreview(null);
  }, [file]);

  const handleFileChange = (selectedFile: File) => {
    setFile(selectedFile);
    applyWatermark();
    setPreview(null);
  };

  const handleWatermarkChange = (text: string) => {
    setWatermarkText(text);
  };

  const applyWatermark = async () => {
    if (!file || !watermarkText) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (file.type === "application/pdf") {
      const pdf = await import("pdfjs-dist");
      pdf.GlobalWorkerOptions.workerSrc = `/pdf.min.mjs`;

      const arrayBuffer = await file.arrayBuffer();
      const pdfDocument = await pdf.getDocument({ data: arrayBuffer }).promise;

      const scale = 1.5;
      let totalHeight = 0;

      for (let pageNum = 1; pageNum <= pdfDocument.numPages; pageNum++) {
        const page = await pdfDocument.getPage(pageNum);
        const viewport = page.getViewport({ scale });

        if (pageNum === 1) {
          canvas.width = viewport.width;
        }
        totalHeight += viewport.height;
      }

      canvas.height = totalHeight;
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      let yOffset = 0;
      for (let pageNum = 1; pageNum <= pdfDocument.numPages; pageNum++) {
        const page = await pdfDocument.getPage(pageNum);
        const viewport = page.getViewport({ scale });

        await page.render({
          canvasContext: ctx,
          viewport: viewport,
          transform: [1, 0, 0, 1, 0, yOffset],
        }).promise;

        addWatermark(ctx, viewport.width, viewport.height, yOffset);
        yOffset += viewport.height;
      }

      setPreview(canvas.toDataURL());
    } else {
      const img = new Image();
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        addWatermark(ctx, canvas.width, canvas.height);
      };
      img.src = URL.createObjectURL(file);
    }
  };

  const addWatermark = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    yOffset: number = 0
  ) => {
    ctx.save();

    // Set watermark style
    // use a beautiful font that is available on all OS
    ctx.font = "28px 'Merriweather'";
    ctx.fillStyle = "rgba(200, 0, 0, 0.7)";

    // Rotate canvas
    ctx.translate(width / 2, height / 2 + yOffset);
    ctx.rotate(-Math.PI / 4);
    ctx.translate(-width / 2, -height / 2 - yOffset);

    // Calculate spacing
    const textWidth = ctx.measureText(watermarkText).width;
    const spacingX = textWidth * 1.25;
    const spacingY = 100;

    // Draw watermark repeatedly
    for (let x = -width; x < width * 2; x += spacingX) {
      for (let y = -height + yOffset; y < height * 2 + yOffset; y += spacingY) {
        ctx.fillText(watermarkText, x, y);
      }
    }

    ctx.restore();

    setPreview(canvasRef.current?.toDataURL() || null);
  };

  const handleDownload = () => {
    if (preview) {
      saveAs(preview, "watermarked_document.png");
    }
  };
  useEffect(() => {
    // make canva white
    const { current: canvas } = canvasRef;
    if (!canvas) return;
  }, []);

  return (
    <div className="flex flex-col items-center justify-between min-h-screen w-full p-4 bg-white text-gray-800 mx-auto">
      <div className="flex flex-col items-center w-full">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-3 text-gray-900 text-center flex items-center">
          <svg className="w-8 h-8 mr-2" viewBox="0 0 3 2">
            <rect width="1" height="2" fill="#002395" />
            <rect width="1" height="2" x="1" fill="#FFFFFF" />
            <rect width="1" height="2" x="2" fill="#ED2939" />
          </svg>
          Filigraneur.fr
        </h1>
        <h2 className="text-lg sm:text-xl mb-6 sm:mb-8 text-gray-600 text-center flex items-center">
          <span>
            <a
              href="https://github.com/cyberclarence/filigraneur"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Open-source
            </a>
          </span>
          et sécurisé
        </h2>
        <div className="w-full max-w-md items-start">
          <FileUpload onFileChange={handleFileChange} />
          <WatermarkForm
            watermarkText={watermarkText}
            onWatermarkChange={handleWatermarkChange}
            onApplyWatermark={applyWatermark}
          />
          <Preview preview={preview} onDownload={handleDownload} />
        </div>
        <canvas ref={canvasRef} style={{ display: "none" }} />
      </div>
      <footer className="mt-8 text-center text-sm text-gray-600">
        Fait avec ❤️ par CyberClarence |{" "}
        <a
          href="https://cyber-clarence.fr"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          cyber-clarence.fr
        </a>
      </footer>
    </div>
  );
}
