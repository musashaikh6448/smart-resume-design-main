
import React from "react";
import { Experience } from "../ExperienceForm";
import { Education } from "../EducationForm";
import { SkillsGroup } from "../SkillsForm";
import { Project } from "../ProjectsForm";

interface ResumeData {
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
}

interface ProfessionalTemplateProps {
  data: ResumeData;
}

export function ProfessionalTemplate({ data }: ProfessionalTemplateProps) {
  return (
    <div className="resume-paper font-sans text-gray-800 overflow-hidden">
      {/* Header */}
      <header className="border-b-2 border-gray-700 pb-4 mb-6">
        <h1 className="text-3xl font-bold uppercase mb-1">{data.personalInfo.fullName || "Your Name"}</h1>
        <h2 className="text-xl text-gray-700 mb-3">{data.personalInfo.jobTitle || "Job Title"}</h2>
        
        <div className="flex flex-wrap text-sm gap-4 text-gray-600">
          {data.personalInfo.email && (
            <div className="flex items-center">
              <span className="font-semibold mr-1">Email:</span> {data.personalInfo.email}
            </div>
          )}
          {data.personalInfo.phone && (
            <div className="flex items-center">
              <span className="font-semibold mr-1">Phone:</span> {data.personalInfo.phone}
            </div>
          )}
          {data.personalInfo.location && (
            <div className="flex items-center">
              <span className="font-semibold mr-1">Location:</span> {data.personalInfo.location}
            </div>
          )}
          {data.personalInfo.website && (
            <div className="flex items-center">
              <span className="font-semibold mr-1">Website:</span> {data.personalInfo.website}
            </div>
          )}
        </div>
      </header>

      {/* Summary */}
      {data.personalInfo.summary && (
        <section className="resume-section">
          <h3 className="text-lg font-bold uppercase border-b border-gray-300 mb-3 pb-1">Professional Summary</h3>
          <p className="text-sm">{data.personalInfo.summary}</p>
        </section>
      )}

      {/* Work Experience */}
      {data.experiences.length > 0 && (
        <section className="resume-section">
          <h3 className="text-lg font-bold uppercase border-b border-gray-300 mb-3 pb-1">Work Experience</h3>
          {data.experiences.map((exp) => (
            <div key={exp.id} className="mb-4">
              <div className="flex justify-between items-start mb-1">
                <div>
                  <h4 className="font-bold">{exp.position}</h4>
                  <h5 className="text-gray-700">{exp.company}{exp.location ? `, ${exp.location}` : ""}</h5>
                </div>
                <div className="text-sm text-gray-600 font-semibold">
                  {exp.startDate} - {exp.endDate}
                </div>
              </div>
              <p className="text-sm">{exp.description}</p>
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {data.educations.length > 0 && (
        <section className="resume-section">
          <h3 className="text-lg font-bold uppercase border-b border-gray-300 mb-3 pb-1">Education</h3>
          {data.educations.map((edu) => (
            <div key={edu.id} className="mb-4">
              <div className="flex justify-between items-start mb-1">
                <div>
                  <h4 className="font-bold">{edu.degree} in {edu.field}</h4>
                  <h5 className="text-gray-700">{edu.institution}{edu.location ? `, ${edu.location}` : ""}</h5>
                </div>
                <div className="text-sm text-gray-600 font-semibold">
                  {edu.startDate} - {edu.endDate}
                </div>
              </div>
              {edu.description && <p className="text-sm">{edu.description}</p>}
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {data.skillsGroups.length > 0 && (
        <section className="resume-section">
          <h3 className="text-lg font-bold uppercase border-b border-gray-300 mb-3 pb-1">Skills</h3>
          {data.skillsGroups.map((group) => (
            <div key={group.id} className="mb-3">
              {group.name && <h4 className="font-semibold text-sm mb-1">{group.name}</h4>}
              <div className="flex flex-wrap gap-1 mb-2">
                {group.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="text-sm bg-gray-100 px-2 py-1 rounded"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Projects */}
      {data.projects.length > 0 && (
        <section className="resume-section">
          <h3 className="text-lg font-bold uppercase border-b border-gray-300 mb-3 pb-1">Projects</h3>
          {data.projects.map((project) => (
            <div key={project.id} className="mb-4">
              <div className="flex justify-between items-start mb-1">
                <div>
                  <h4 className="font-bold">{project.name}</h4>
                  {project.role && <h5 className="text-gray-700">{project.role}</h5>}
                </div>
                {(project.startDate || project.endDate) && (
                  <div className="text-sm text-gray-600 font-semibold">
                    {project.startDate && project.endDate 
                      ? `${project.startDate} - ${project.endDate}`
                      : project.startDate || project.endDate}
                  </div>
                )}
              </div>
              {project.url && (
                <div className="text-xs text-gray-700 mb-1">
                  <a href={project.url} target="_blank" rel="noopener noreferrer">
                    {project.url}
                  </a>
                </div>
              )}
              <p className="text-sm">{project.description}</p>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}
