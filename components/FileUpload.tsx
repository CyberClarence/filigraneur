"use client";

interface FileUploadProps {
  onFileChange: (file: File) => void;
}

export default function FileUpload({ onFileChange }: FileUploadProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileChange(file);
    }
  };

  return (
    <div className="mb-4 w-full">
      <input
        type="file"
        accept="image/*,application/pdf"
        onChange={handleFileChange}
        className="border border-gray-300 rounded p-2 w-full"
      />
    </div>
  );
}
