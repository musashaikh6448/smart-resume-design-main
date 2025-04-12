
import React, { useState, useEffect } from "react";
import { ResumeBuilderLayout } from "@/components/layout/ResumeBuilderLayout";
import { ResumeEditor, ResumeData } from "@/components/resume/ResumeEditor";
import { ResumePreview } from "@/components/resume/ResumePreview";
import { v4 as uuidv4 } from "uuid";
import { getResumeFromLocalStorage, saveResumeToLocalStorage, getResumesFromLocalStorage } from "@/utils/localStorage";

const defaultResumeData: ResumeData = {
  name: "My Resume",
  personalInfo: {
    fullName: "John Doe",
    jobTitle: "Software Engineer",
    email: "john.doe@example.com",
    phone: "(555) 123-4567",
    location: "San Francisco, CA",
    website: "johndoe.com",
    summary: "Experienced software engineer with a passion for creating elegant, efficient, and scalable solutions. Skilled in JavaScript, TypeScript, React, and Node.js.",
  },
  experiences: [
    {
      id: uuidv4(),
      company: "Tech Solutions Inc.",
      position: "Senior Software Engineer",
      startDate: "Jan 2020",
      endDate: "Present",
      location: "San Francisco, CA",
      description: "Led a team of 5 developers to build and maintain a large-scale e-commerce platform. Implemented microservices architecture, reduced load times by 40%, and improved overall performance.",
    },
    {
      id: uuidv4(),
      company: "Digital Innovations",
      position: "Software Developer",
      startDate: "Jun 2017",
      endDate: "Dec 2019",
      location: "New York, NY",
      description: "Developed responsive web applications using React and Redux. Collaborated with design teams to implement UI/UX improvements and new features.",
    },
  ],
  educations: [
    {
      id: uuidv4(),
      institution: "University of California",
      degree: "Bachelor of Science",
      field: "Computer Science",
      startDate: "Sep 2013",
      endDate: "May 2017",
      location: "Berkeley, CA",
      description: "Graduated with honors. Specialized in Software Engineering and Artificial Intelligence.",
    },
  ],
  skillsGroups: [
    {
      id: uuidv4(),
      name: "Technical Skills",
      skills: ["JavaScript", "TypeScript", "React", "Node.js", "Next.js", "GraphQL", "REST APIs", "AWS"],
    },
    {
      id: uuidv4(),
      name: "Soft Skills",
      skills: ["Team Leadership", "Project Management", "Communication", "Problem Solving"],
    },
  ],
  projects: [
    {
      id: uuidv4(),
      name: "E-commerce Platform",
      role: "Lead Developer",
      startDate: "Mar 2021",
      endDate: "Nov 2021",
      url: "github.com/johndoe/ecommerce",
      description: "Built a full-stack e-commerce platform using React, Node.js, and MongoDB. Implemented JWT authentication, payment processing with Stripe, and a responsive design.",
    },
  ],
  selectedTemplate: "simple",
};

const Index = () => {
  const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData);
  const [currentResumeId, setCurrentResumeId] = useState<string>("");

  // On initial load, check if we have any resumes in localStorage
  useEffect(() => {
    const resumes = getResumesFromLocalStorage();
    
    if (resumes.length > 0) {
      // Load the most recently modified resume
      const sortedResumes = resumes.sort((a, b) => b.lastModified - a.lastModified);
      setResumeData(sortedResumes[0].data);
      setCurrentResumeId(sortedResumes[0].id);
    } else {
      // Create a new resume with the default data
      const newId = `resume_${Date.now()}`;
      saveResumeToLocalStorage(newId, defaultResumeData);
      setCurrentResumeId(newId);
    }
  }, []);

  const updateResumeData = (data: Partial<ResumeData>) => {
    setResumeData((prev) => {
      const updated = { ...prev, ...data };
      
      // Auto-save on update if we have a current resume ID
      if (currentResumeId) {
        saveResumeToLocalStorage(currentResumeId, updated);
      }
      
      return updated;
    });
  };

  return (
    <ResumeBuilderLayout
      editor={<ResumeEditor resumeData={resumeData} updateResumeData={updateResumeData} />}
      preview={<ResumePreview resumeData={resumeData} currentResumeId={currentResumeId} />}
      resumeData={resumeData}
      currentResumeId={currentResumeId}
      setCurrentResumeId={setCurrentResumeId}
      updateResumeData={updateResumeData}
    />
  );
};

export default Index;
