
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

interface ATSTemplateProps {
  data: ResumeData;
}

export function ATSTemplate({ data }: ATSTemplateProps) {
  return (
    <div className="resume-paper font-sans text-black overflow-hidden" style={{ fontFamily: 'Arial, sans-serif' }}>
      {/* Header - ATS-friendly with clear structure */}
      <header className="mb-6">
        <h1 className="text-2xl font-bold mb-1">{data.personalInfo.fullName || "Your Name"}</h1>
        <h2 className="text-lg font-normal mb-2">{data.personalInfo.jobTitle || "Job Title"}</h2>
        
        <div className="text-sm">
          {data.personalInfo.email && <div>{data.personalInfo.email}</div>}
          {data.personalInfo.phone && <div>{data.personalInfo.phone}</div>}
          {data.personalInfo.location && <div>{data.personalInfo.location}</div>}
          {data.personalInfo.website && <div>{data.personalInfo.website}</div>}
        </div>
      </header>

      {/* Summary */}
      {data.personalInfo.summary && (
        <section className="mb-6">
          <h3 className="text-lg font-bold border-b border-gray-400 mb-2 pb-1">Professional Summary</h3>
          <p>{data.personalInfo.summary}</p>
        </section>
      )}

      {/* Work Experience */}
      {data.experiences.length > 0 && (
        <section className="mb-6">
          <h3 className="text-lg font-bold border-b border-gray-400 mb-2 pb-1">Work Experience</h3>
          {data.experiences.map((exp) => (
            <div key={exp.id} className="mb-4">
              <h4 className="font-bold">{exp.position}</h4>
              <h5>{exp.company}, {exp.location}</h5>
              <div className="mb-1">{exp.startDate} - {exp.endDate}</div>
              <p>{exp.description}</p>
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {data.educations.length > 0 && (
        <section className="mb-6">
          <h3 className="text-lg font-bold border-b border-gray-400 mb-2 pb-1">Education</h3>
          {data.educations.map((edu) => (
            <div key={edu.id} className="mb-4">
              <h4 className="font-bold">{edu.degree} in {edu.field}</h4>
              <h5>{edu.institution}, {edu.location}</h5>
              <div className="mb-1">{edu.startDate} - {edu.endDate}</div>
              {edu.description && <p>{edu.description}</p>}
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {data.skillsGroups.length > 0 && (
        <section className="mb-6">
          <h3 className="text-lg font-bold border-b border-gray-400 mb-2 pb-1">Skills</h3>
          {data.skillsGroups.map((group) => (
            <div key={group.id} className="mb-3">
              {group.name && <h4 className="font-bold mb-1">{group.name}</h4>}
              <ul className="list-disc pl-5">
                {group.skills.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}

      {/* Projects */}
      {data.projects.length > 0 && (
        <section className="mb-6">
          <h3 className="text-lg font-bold border-b border-gray-400 mb-2 pb-1">Projects</h3>
          {data.projects.map((project) => (
            <div key={project.id} className="mb-4">
              <h4 className="font-bold">{project.name}</h4>
              {project.role && <h5>{project.role}</h5>}
              {(project.startDate || project.endDate) && (
                <div className="mb-1">
                  {project.startDate && project.endDate 
                    ? `${project.startDate} - ${project.endDate}`
                    : project.startDate || project.endDate}
                </div>
              )}
              {project.url && <div>{project.url}</div>}
              <p>{project.description}</p>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}
