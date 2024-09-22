"use client";
interface PreviewProps {
  preview: string | null;
  onDownload: () => void;
  onSelectDocumentClick: () => void;
}

export default function Preview({
  preview,
  onDownload,
  onSelectDocumentClick,
}: PreviewProps) {
  return (
    <div className="mt-2 h-full max-h-full overflow-auto flex flex-col items-center gap-2 w-full">
      {preview && (
        <button
          onClick={onDownload}
          className="bg-green-500 text-white rounded px-4 py-2"
        >
          Télécharger
        </button>
      )}

      <div className="h-full overflow-auto border rounded-lg w-full">
        {preview ? (
          <img
            src={preview}
            alt="Watermarked preview"
            className="max-w-full mb-4 "
          />
        ) : (
          <div
            className="flex items-center justify-center h-full w-full"
            onClick={onSelectDocumentClick}
          >
            <p className="text-gray-500">Selectionnez un document</p>
          </div>
        )}
      </div>
    </div>
  );
}
