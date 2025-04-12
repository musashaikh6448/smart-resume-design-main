
import React, { ReactNode, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, FileText, Save, Plus, List, Trash2 } from "lucide-react";
import { saveResumeToLocalStorage, getResumesFromLocalStorage } from "@/utils/localStorage";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { ResumeData } from "@/components/resume/ResumeEditor";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ResumeBuilderLayoutProps {
  editor: ReactNode;
  preview: ReactNode;
  resumeData: ResumeData;
  currentResumeId: string;
  setCurrentResumeId: (id: string) => void;
  updateResumeData: (data: Partial<ResumeData>) => void;
}

export function ResumeBuilderLayout({ 
  editor, 
  preview, 
  resumeData, 
  currentResumeId,
  setCurrentResumeId,
  updateResumeData
}: ResumeBuilderLayoutProps) {
  const [savedResumes, setSavedResumes] = useState<{id: string, name: string}[]>([]);
  const [newResumeName, setNewResumeName] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const resumes = getResumesFromLocalStorage();
    setSavedResumes(resumes.map(resume => ({ id: resume.id, name: resume.name })));
  }, []);

  const handleSaveResume = () => {
    if (currentResumeId) {
      saveResumeToLocalStorage(currentResumeId, resumeData);
      toast.success("Resume saved successfully");
      
      // Refresh the list
      const resumes = getResumesFromLocalStorage();
      setSavedResumes(resumes.map(resume => ({ id: resume.id, name: resume.name })));
    }
  };

  const handleCreateNewResume = () => {
    setIsDialogOpen(true);
  };

  const handleConfirmNewResume = () => {
    const id = `resume_${Date.now()}`;
    const name = newResumeName || "Untitled Resume";
    
    saveResumeToLocalStorage(id, {
      ...resumeData,
      name: name
    });
    
    setCurrentResumeId(id);
    setNewResumeName("");
    setIsDialogOpen(false);
    
    // Refresh the list
    const resumes = getResumesFromLocalStorage();
    setSavedResumes(resumes.map(resume => ({ id: resume.id, name: resume.name })));
    
    toast.success("New resume created");
  };

  const handleLoadResume = (id: string) => {
    const resumes = getResumesFromLocalStorage();
    const resume = resumes.find(r => r.id === id);
    
    if (resume) {
      updateResumeData(resume.data);
      setCurrentResumeId(id);
      toast.success(`Loaded: ${resume.name}`);
    }
  };

  const handleDeleteResume = (id: string) => {
    const resumes = getResumesFromLocalStorage();
    const updatedResumes = resumes.filter(resume => resume.id !== id);
    
    localStorage.setItem('resumes', JSON.stringify(updatedResumes));
    
    // If we deleted the current resume, load another one or create a blank one
    if (id === currentResumeId) {
      if (updatedResumes.length > 0) {
        updateResumeData(updatedResumes[0].data);
        setCurrentResumeId(updatedResumes[0].id);
      } else {
        // Create a new blank resume
        const newId = `resume_${Date.now()}`;
        saveResumeToLocalStorage(newId, resumeData);
        setCurrentResumeId(newId);
      }
    }
    
    // Refresh the list
    setSavedResumes(updatedResumes.map(resume => ({ id: resume.id, name: resume.name })));
    toast.success("Resume deleted");
  };

  return (
    <div className="flex flex-col h-screen">
      <header className="border-b bg-white shadow-sm py-4 px-6 flex justify-between items-center">
        <div className="flex items-center">
          <FileText className="h-6 w-6 text-purple-500 mr-2" />
          <h1 className="text-xl font-semibold">Resume Builder</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleCreateNewResume}>
            <Plus className="h-4 w-4 mr-2" />
            New
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <List className="h-4 w-4 mr-2" />
                My Resumes
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Saved Resumes</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {savedResumes.length === 0 ? (
                <DropdownMenuItem disabled>No saved resumes</DropdownMenuItem>
              ) : (
                savedResumes.map((resume) => (
                  <DropdownMenuItem key={resume.id} className="flex justify-between items-center">
                    <span 
                      className="flex-1 cursor-pointer" 
                      onClick={() => handleLoadResume(resume.id)}
                    >
                      {resume.name}
                    </span>
                    <Trash2 
                      className="h-4 w-4 text-red-500 cursor-pointer" 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteResume(resume.id);
                      }}
                    />
                  </DropdownMenuItem>
                ))
              )}
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button variant="outline" size="sm" onClick={handleSaveResume}>
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>
        </div>
      </header>
      <div className="flex flex-1 overflow-hidden">
        <div className="w-1/2 overflow-auto p-6 border-r">{editor}</div>
        <div className="w-1/2 overflow-auto bg-gray-50 p-6">{preview}</div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Resume</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="resumeName">Resume Name</Label>
              <Input 
                id="resumeName" 
                placeholder="e.g., Software Developer Resume" 
                value={newResumeName}
                onChange={(e) => setNewResumeName(e.target.value)}
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleConfirmNewResume}>
                Create
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
