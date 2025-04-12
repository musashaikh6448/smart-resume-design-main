
import { ResumeData } from "@/components/resume/ResumeEditor";

interface SavedResume {
  id: string;
  name: string;
  data: ResumeData;
  lastModified: number;
}

export const saveResumeToLocalStorage = (id: string, data: ResumeData) => {
  try {
    const existingResumesJSON = localStorage.getItem('resumes');
    let existingResumes: SavedResume[] = [];
    
    if (existingResumesJSON) {
      existingResumes = JSON.parse(existingResumesJSON);
    }
    
    // Find if this resume already exists
    const existingResumeIndex = existingResumes.findIndex(resume => resume.id === id);
    
    const updatedResume: SavedResume = {
      id,
      name: data.name || "Untitled Resume",
      data,
      lastModified: Date.now()
    };
    
    if (existingResumeIndex !== -1) {
      // Update existing resume
      existingResumes[existingResumeIndex] = updatedResume;
    } else {
      // Add new resume
      existingResumes.push(updatedResume);
    }
    
    // Save back to localStorage
    localStorage.setItem('resumes', JSON.stringify(existingResumes));
    
    return true;
  } catch (error) {
    console.error("Error saving resume to localStorage:", error);
    return false;
  }
};

export const getResumesFromLocalStorage = (): SavedResume[] => {
  try {
    const resumesJSON = localStorage.getItem('resumes');
    return resumesJSON ? JSON.parse(resumesJSON) : [];
  } catch (error) {
    console.error("Error retrieving resumes from localStorage:", error);
    return [];
  }
};

export const getResumeFromLocalStorage = (id: string): SavedResume | null => {
  try {
    const resumes = getResumesFromLocalStorage();
    return resumes.find(resume => resume.id === id) || null;
  } catch (error) {
    console.error("Error retrieving resume from localStorage:", error);
    return null;
  }
};

export const deleteResumeFromLocalStorage = (id: string): boolean => {
  try {
    const resumes = getResumesFromLocalStorage();
    const updatedResumes = resumes.filter(resume => resume.id !== id);
    localStorage.setItem('resumes', JSON.stringify(updatedResumes));
    return true;
  } catch (error) {
    console.error("Error deleting resume from localStorage:", error);
    return false;
  }
};

export const exportResumeAsJSON = (id: string): string | null => {
  const resume = getResumeFromLocalStorage(id);
  if (!resume) return null;
  
  try {
    return JSON.stringify(resume, null, 2);
  } catch (error) {
    console.error("Error exporting resume as JSON:", error);
    return null;
  }
};

export const importResumeFromJSON = (jsonString: string): SavedResume | null => {
  try {
    const resumeData = JSON.parse(jsonString) as SavedResume;
    
    // Validate the data has the required structure
    if (!resumeData.id || !resumeData.data) {
      throw new Error("Invalid resume data structure");
    }
    
    // Add a new ID to ensure it doesn't overwrite existing ones
    const newId = `resume_${Date.now()}`;
    const newResumeData = {
      ...resumeData,
      id: newId,
      lastModified: Date.now()
    };
    
    // Save to localStorage
    const resumes = getResumesFromLocalStorage();
    resumes.push(newResumeData);
    localStorage.setItem('resumes', JSON.stringify(resumes));
    
    return newResumeData;
  } catch (error) {
    console.error("Error importing resume from JSON:", error);
    return null;
  }
};
