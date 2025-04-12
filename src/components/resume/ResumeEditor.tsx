
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { PersonalInfoForm } from "./PersonalInfoForm";
import { ExperienceForm, Experience } from "./ExperienceForm";
import { EducationForm, Education } from "./EducationForm";
import { SkillsForm, SkillsGroup } from "./SkillsForm";
import { ProjectsForm, Project } from "./ProjectsForm";
import { TemplateSelector, TemplateType } from "./TemplateSelector";

export interface ResumeData {
  name?: string;
  personalInfo: {
    fullName: string;
    jobTitle: string;
    email: string;
    phone: string;
    location: string;
    website: string;
    summary: string;
  };
  experiences: Experience[];
  educations: Education[];
  skillsGroups: SkillsGroup[];
  projects: Project[];
  selectedTemplate: TemplateType;
}

interface ResumeEditorProps {
  resumeData: ResumeData;
  updateResumeData: (data: Partial<ResumeData>) => void;
}

export function ResumeEditor({ resumeData, updateResumeData }: ResumeEditorProps) {
  const handlePersonalInfoChange = (field: string, value: string) => {
    updateResumeData({
      personalInfo: { ...resumeData.personalInfo, [field]: value },
    });
  };

  const handleAddExperience = () => {
    const newExperience: Experience = {
      id: uuidv4(),
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      location: "",
      description: "",
    };
    
    updateResumeData({
      experiences: [...resumeData.experiences, newExperience],
    });
  };

  const handleUpdateExperience = (id: string, field: string, value: string) => {
    updateResumeData({
      experiences: resumeData.experiences.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      ),
    });
  };

  const handleDeleteExperience = (id: string) => {
    updateResumeData({
      experiences: resumeData.experiences.filter((exp) => exp.id !== id),
    });
  };

  const handleAddEducation = () => {
    const newEducation: Education = {
      id: uuidv4(),
      institution: "",
      degree: "",
      field: "",
      startDate: "",
      endDate: "",
      location: "",
      description: "",
    };
    
    updateResumeData({
      educations: [...resumeData.educations, newEducation],
    });
  };

  const handleUpdateEducation = (id: string, field: string, value: string) => {
    updateResumeData({
      educations: resumeData.educations.map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu
      ),
    });
  };

  const handleDeleteEducation = (id: string) => {
    updateResumeData({
      educations: resumeData.educations.filter((edu) => edu.id !== id),
    });
  };

  const handleAddSkillsGroup = () => {
    const newSkillsGroup: SkillsGroup = {
      id: uuidv4(),
      name: "",
      skills: [],
    };
    
    updateResumeData({
      skillsGroups: [...resumeData.skillsGroups, newSkillsGroup],
    });
  };

  const handleUpdateSkillsGroupName = (id: string, name: string) => {
    updateResumeData({
      skillsGroups: resumeData.skillsGroups.map((group) =>
        group.id === id ? { ...group, name } : group
      ),
    });
  };

  const handleAddSkill = (groupId: string, skill: string) => {
    updateResumeData({
      skillsGroups: resumeData.skillsGroups.map((group) =>
        group.id === groupId
          ? { ...group, skills: [...group.skills, skill] }
          : group
      ),
    });
  };

  const handleRemoveSkill = (groupId: string, skillIndex: number) => {
    updateResumeData({
      skillsGroups: resumeData.skillsGroups.map((group) =>
        group.id === groupId
          ? {
              ...group,
              skills: group.skills.filter((_, index) => index !== skillIndex),
            }
          : group
      ),
    });
  };

  const handleDeleteSkillsGroup = (id: string) => {
    updateResumeData({
      skillsGroups: resumeData.skillsGroups.filter((group) => group.id !== id),
    });
  };

  const handleAddProject = () => {
    const newProject: Project = {
      id: uuidv4(),
      name: "",
      role: "",
      startDate: "",
      endDate: "",
      url: "",
      description: "",
    };
    
    updateResumeData({
      projects: [...resumeData.projects, newProject],
    });
  };

  const handleUpdateProject = (id: string, field: string, value: string) => {
    updateResumeData({
      projects: resumeData.projects.map((project) =>
        project.id === id ? { ...project, [field]: value } : project
      ),
    });
  };

  const handleDeleteProject = (id: string) => {
    updateResumeData({
      projects: resumeData.projects.filter((project) => project.id !== id),
    });
  };

  const handleSelectTemplate = (template: TemplateType) => {
    updateResumeData({ selectedTemplate: template });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <TemplateSelector
        selectedTemplate={resumeData.selectedTemplate}
        onSelectTemplate={handleSelectTemplate}
      />
      
      <Tabs defaultValue="personal" className="w-full">
        <Card>
          <TabsList className="grid grid-cols-5 w-full">
            <TabsTrigger value="personal">Personal</TabsTrigger>
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
          </TabsList>
        </Card>
        
        <TabsContent value="personal" className="mt-4">
          <PersonalInfoForm
            personalInfo={resumeData.personalInfo}
            onChange={handlePersonalInfoChange}
          />
        </TabsContent>
        
        <TabsContent value="experience" className="mt-4">
          <ExperienceForm
            experiences={resumeData.experiences}
            onAdd={handleAddExperience}
            onUpdate={handleUpdateExperience}
            onDelete={handleDeleteExperience}
          />
        </TabsContent>
        
        <TabsContent value="education" className="mt-4">
          <EducationForm
            educations={resumeData.educations}
            onAdd={handleAddEducation}
            onUpdate={handleUpdateEducation}
            onDelete={handleDeleteEducation}
          />
        </TabsContent>
        
        <TabsContent value="skills" className="mt-4">
          <SkillsForm
            skillsGroups={resumeData.skillsGroups}
            onAddGroup={handleAddSkillsGroup}
            onUpdateGroupName={handleUpdateSkillsGroupName}
            onAddSkill={handleAddSkill}
            onRemoveSkill={handleRemoveSkill}
            onDeleteGroup={handleDeleteSkillsGroup}
          />
        </TabsContent>
        
        <TabsContent value="projects" className="mt-4">
          <ProjectsForm
            projects={resumeData.projects}
            onAdd={handleAddProject}
            onUpdate={handleUpdateProject}
            onDelete={handleDeleteProject}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
