
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

interface MinimalistTemplateProps {
  data: ResumeData;
}

export function MinimalistTemplate({ data }: MinimalistTemplateProps) {
  return (
    <div className="resume-paper font-sans text-gray-800 overflow-hidden">
      {/* Header */}
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-1">{data.personalInfo.fullName || "Your Name"}</h1>
        <h2 className="text-xl text-gray-600 mb-4">{data.personalInfo.jobTitle || "Job Title"}</h2>
        
        <div className="flex flex-wrap justify-center text-sm gap-x-6 gap-y-1 text-gray-600">
          {data.personalInfo.email && <div>{data.personalInfo.email}</div>}
          {data.personalInfo.phone && <div>{data.personalInfo.phone}</div>}
          {data.personalInfo.location && <div>{data.personalInfo.location}</div>}
          {data.personalInfo.website && <div>{data.personalInfo.website}</div>}
        </div>
      </header>

      {/* Summary */}
      {data.personalInfo.summary && (
        <section className="resume-section">
          <h3 className="resume-section-title text-center">Professional Summary</h3>
          <p className="text-sm text-center">{data.personalInfo.summary}</p>
        </section>
      )}

      {/* Work Experience */}
      {data.experiences.length > 0 && (
        <section className="resume-section">
          <h3 className="resume-section-title text-center">Experience</h3>
          {data.experiences.map((exp) => (
            <div key={exp.id} className="mb-5">
              <div className="mb-1 text-center">
                <h4 className="font-semibold">{exp.position}</h4>
                <h5 className="text-sm">{exp.company}{exp.location ? ` • ${exp.location}` : ""}</h5>
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
          <h3 className="resume-section-title text-center">Education</h3>
          {data.educations.map((edu) => (
            <div key={edu.id} className="mb-5">
              <div className="mb-1 text-center">
                <h4 className="font-semibold">{edu.degree} in {edu.field}</h4>
                <h5 className="text-sm">{edu.institution}{edu.location ? ` • ${edu.location}` : ""}</h5>
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
          <h3 className="resume-section-title text-center">Skills</h3>
          {data.skillsGroups.map((group) => (
            <div key={group.id} className="mb-3">
              {group.name && <h4 className="font-semibold text-sm mb-1 text-center">{group.name}</h4>}
              <div className="flex flex-wrap justify-center gap-2">
                {group.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="text-xs border border-gray-300 px-3 py-1 rounded-full"
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
          <h3 className="resume-section-title text-center">Projects</h3>
          {data.projects.map((project) => (
            <div key={project.id} className="mb-5">
              <div className="mb-1 text-center">
                <h4 className="font-semibold">{project.name}</h4>
                {project.role && <h5 className="text-sm">{project.role}</h5>}
                {(project.startDate || project.endDate) && (
                  <div className="text-sm text-gray-600">
                    {project.startDate && project.endDate 
                      ? `${project.startDate} - ${project.endDate}`
                      : project.startDate || project.endDate}
                  </div>
                )}
              </div>
              {project.url && (
                <div className="text-xs text-center mb-1">
                  <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-gray-600">
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
