import axios from "axios";
const api = axios.create({ 
  baseURL: import.meta.env.VITE_API, 
  timeout: 60000,
  headers: {
    'Accept': 'application/json',
  }
});

export async function uploadResume(file) {
  console.log("Starting upload for file:", file.name, "Size:", file.size, "Type:", file.type);
  
  const form = new FormData();
  form.append("file", file);
  
  try {
    const { data } = await api.post("/api/upload", form, {
      // Don't set Content-Type manually - let axios handle it with boundary
      // headers: { "Content-Type": "multipart/form-data" }, // This was causing the issue!
    });
    console.log("Upload successful:", data);
    return data; // { resume_id }
  } catch (error) {
    console.error("Upload failed:", error);
    console.error("Error response:", error.response?.data);
    console.error("Error status:", error.response?.status);
    throw error;
  }
}

export async function analyzeResume(resume_id, jd_text, job_title) {
  const { data } = await api.post("/api/analyze", {
    resume_id, jd_text, job_title: job_title || null
  });
  return data; // { analysis_id, matched_keywords, missing_keywords, suggestions }
}

export function downloadTailored(analysis_id, format="docx") {
  window.open(`${api.defaults.baseURL}/api/download/${analysis_id}?format=${format}`, "_blank");
}
