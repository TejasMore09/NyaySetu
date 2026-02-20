import React, { useState, useRef } from "react";
import { Button } from "./Button";

interface UploadBoxProps {
  onResult: (data: any) => void;
  onLoading: (state: boolean) => void;
  onError: (msg: string) => void;
  loading: boolean;
}

export default function UploadBox({
  onResult,
  onLoading,
  onError,
  loading,
}: UploadBoxProps) {
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type !== "application/pdf") {
        onError("Please upload a PDF file.");
        return;
      }
      setFile(selectedFile);
      onError("");
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      onLoading(true);
      onError("");

      const res = await fetch(
        "http://127.0.0.1:8000/api/analyze/",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!res.ok) {
        throw new Error("Upload failed");
      }

      const data = await res.json();
      onResult(data);
    } catch (err) {
      console.error(err);
      onError("Failed to analyze file. Please check if the backend server is running.");
    } finally {
      onLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div 
        onClick={() => fileInputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-xl p-12 transition-all cursor-pointer group
          ${file 
            ? 'border-emerald-200 bg-emerald-50/30' 
            : 'border-slate-200 hover:border-slate-300 bg-slate-50/50 hover:bg-slate-50'}`}
      >
        <input
          type="file"
          accept=".pdf"
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileChange}
        />
        
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors
            ${file ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400 group-hover:text-slate-500'}`}>
            {file ? (
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            )}
          </div>
          
          <div className="text-center">
            <p className="text-lg font-semibold text-slate-900">
              {file ? file.name : 'Click to upload contract'}
            </p>
            <p className="text-sm text-slate-500 mt-1">
              {file ? `${(file.size / 1024 / 1024).toFixed(2)} MB` : 'Drop your PDF here or browse files'}
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <Button 
          onClick={handleUpload}
          disabled={!file || loading}
          isLoading={loading}
          size="lg"
          className="w-full md:w-64 shadow-lg shadow-slate-200"
        >
          {loading ? 'Analyzing Intelligence...' : 'Analyze Contract'}
        </Button>
      </div>
    </div>
  );
}
