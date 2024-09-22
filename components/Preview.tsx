"use client";
interface PreviewProps {
  preview: string | null;
  onDownload: () => void;
}

export default function Preview({ preview, onDownload }: PreviewProps) {
  return (
    <div className="mt-4 h-fit max-h-full overflow-auto flex flex-col items-center">
      {preview && (
        <div className="flex flex-col items-center w-full justify-center h-fit">
          <img
            src={preview}
            alt="Watermarked preview"
            className="max-w-full mb-4 border overflow-hidden rounded-lg"
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
