import { useState } from "react";
import { uploadResume } from "../lib/api";
import toast from "react-hot-toast";
import { DocumentArrowUpIcon, CheckCircleIcon } from "@heroicons/react/24/outline";

export default function UploadPanel({ onUploaded }) {
  const [file, setFile] = useState(null);
  const [busy, setBusy] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    if (!file) return toast.error("Choose a PDF/DOCX/TXT file");
    
    console.log("UploadPanel: Starting upload for file:", file.name);
    setBusy(true);
    
    try {
      const res = await uploadResume(file);
      console.log("UploadPanel: Upload successful, resume ID:", res.resume_id);
      onUploaded(res.resume_id);
      setUploaded(true);
      setUploadedFileName(file.name);
      toast.success("Resume uploaded and parsed successfully!");
    } catch (error) {
      console.error("UploadPanel: Upload failed:", error);
      const errorMessage = error?.response?.data?.detail || error?.message || "Upload failed";
      toast.error(`Upload failed: ${errorMessage}`);
    } finally { 
      setBusy(false); 
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    if (selectedFile) {
      setUploaded(false);
      setUploadedFileName("");
    }
  };

  return (
    <section className="bg-white rounded-xl shadow-card p-5">
      <div className="flex items-center gap-2 mb-3">
        <DocumentArrowUpIcon className="h-5 w-5 text-brandBlue" />
        <h2 className="text-[15px] font-semibold">Upload Resume</h2>
        {uploaded && <CheckCircleIcon className="h-5 w-5 text-green-500" />}
      </div>
      
      {uploaded && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md">
          <p className="text-sm text-green-800">
            ✅ <strong>{uploadedFileName}</strong> uploaded successfully!
          </p>
          <p className="text-xs text-green-600 mt-1">
            Your resume has been parsed and is ready for analysis.
          </p>
        </div>
      )}
      
      <form onSubmit={submit} className="space-y-3">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-brandBlue transition-colors">
          <input
            type="file"
            accept=".pdf,.docx,.txt"
            onChange={handleFileChange}
            className="hidden"
            id="file-upload"
          />
          <label htmlFor="file-upload" className="cursor-pointer">
            <DocumentArrowUpIcon className="mx-auto h-8 w-8 text-gray-400 mb-2" />
            <p className="text-sm text-gray-600">
              {file ? file.name : "Click to select a resume file"}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Supports PDF, DOCX, and TXT files
            </p>
          </label>
        </div>
        
        <button
          type="submit"
          disabled={busy || !file}
          className="w-full bg-brandBlue text-white px-4 py-2 rounded-md text-sm font-semibold
                     hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed
                     flex items-center justify-center gap-2"
        >
          {busy ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              Uploading & Parsing...
            </>
          ) : (
            <>
              <DocumentArrowUpIcon className="h-4 w-4" />
              Upload Resume
            </>
          )}
        </button>
      </form>
    </section>
  );
}
