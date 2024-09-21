"use client";
interface PreviewProps {
  preview: string | null;
  onDownload: () => void;
}

export default function Preview({ preview, onDownload }: PreviewProps) {
  return (
    <div className="mt-4">
      {preview && (
        <div className="flex flex-col items-center w-full h-full justify-center rounded-lg overflow-hidden">
          <img
            src={preview}
            alt="Watermarked preview"
            className="max-w-full mb-4"
          />
          <button
            onClick={onDownload}
            className="bg-green-500 text-white rounded px-4 py-2"
          >
            Télécharger
          </button>
        </div>
      )}
    </div>
  );
}
