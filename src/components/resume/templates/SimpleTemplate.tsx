
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

interface SimpleTemplateProps {
  data: ResumeData;
}

export function SimpleTemplate({ data }: SimpleTemplateProps) {
  return (
    <div className="resume-paper font-sans text-gray-800 overflow-hidden">
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-purple-600 mb-1">{data.personalInfo.fullName || "Your Name"}</h1>
        <h2 className="text-xl text-gray-600 mb-2">{data.personalInfo.jobTitle || "Job Title"}</h2>
        
        <div className="flex flex-wrap text-sm gap-x-4 gap-y-1 text-gray-600">
          {data.personalInfo.email && (
            <div className="flex items-center">
              <span className="font-medium mr-1">Email:</span> {data.personalInfo.email}
            </div>
          )}
          {data.personalInfo.phone && (
            <div className="flex items-center">
              <span className="font-medium mr-1">Phone:</span> {data.personalInfo.phone}
            </div>
          )}
          {data.personalInfo.location && (
            <div className="flex items-center">
              <span className="font-medium mr-1">Location:</span> {data.personalInfo.location}
            </div>
          )}
          {data.personalInfo.website && (
            <div className="flex items-center">
              <span className="font-medium mr-1">Website:</span> {data.personalInfo.website}
            </div>
          )}
        </div>
      </header>

      {/* Summary */}
      {data.personalInfo.summary && (
        <section className="resume-section">
          <h3 className="resume-section-title text-purple-600">Professional Summary</h3>
          <p className="text-sm">{data.personalInfo.summary}</p>
        </section>
      )}

      {/* Work Experience */}
      {data.experiences.length > 0 && (
        <section className="resume-section">
          <h3 className="resume-section-title text-purple-600">Work Experience</h3>
          {data.experiences.map((exp) => (
            <div key={exp.id} className="mb-4">
              <div className="flex justify-between items-start mb-1">
                <div>
                  <h4 className="font-semibold">{exp.position}</h4>
                  <h5 className="text-sm">{exp.company}{exp.location ? `, ${exp.location}` : ""}</h5>
                </div>
                <div className="text-sm text-gray-600">
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
          <h3 className="resume-section-title text-purple-600">Education</h3>
          {data.educations.map((edu) => (
            <div key={edu.id} className="mb-4">
              <div className="flex justify-between items-start mb-1">
                <div>
                  <h4 className="font-semibold">{edu.degree} in {edu.field}</h4>
                  <h5 className="text-sm">{edu.institution}{edu.location ? `, ${edu.location}` : ""}</h5>
                </div>
                <div className="text-sm text-gray-600">
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
          <h3 className="resume-section-title text-purple-600">Skills</h3>
          {data.skillsGroups.map((group) => (
            <div key={group.id} className="mb-3">
              {group.name && <h4 className="font-semibold text-sm mb-1">{group.name}</h4>}
              <div className="flex flex-wrap gap-1">
                {group.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="text-xs bg-purple-50 text-purple-600 px-2 py-1 rounded-full"
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
          <h3 className="resume-section-title text-purple-600">Projects</h3>
          {data.projects.map((project) => (
            <div key={project.id} className="mb-4">
              <div className="flex justify-between items-start mb-1">
                <div>
                  <h4 className="font-semibold">{project.name}</h4>
                  {project.role && <h5 className="text-sm">{project.role}</h5>}
                </div>
                {(project.startDate || project.endDate) && (
                  <div className="text-sm text-gray-600">
                    {project.startDate && project.endDate 
                      ? `${project.startDate} - ${project.endDate}`
                      : project.startDate || project.endDate}
                  </div>
                )}
              </div>
              {project.url && (
                <div className="text-xs text-purple-600 mb-1">
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
