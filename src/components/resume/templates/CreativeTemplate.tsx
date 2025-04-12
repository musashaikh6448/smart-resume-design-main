
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

interface CreativeTemplateProps {
  data: ResumeData;
}

export function CreativeTemplate({ data }: CreativeTemplateProps) {
  return (
    <div className="resume-paper font-sans overflow-hidden bg-gradient-to-br from-purple-50 to-white">
      {/* Header - Creative style with background */}
      <header className="bg-purple-600 text-white p-6 rounded-lg mb-6">
        <h1 className="text-3xl font-bold mb-1">{data.personalInfo.fullName || "Your Name"}</h1>
        <h2 className="text-xl opacity-90 mb-4">{data.personalInfo.jobTitle || "Job Title"}</h2>
        
        <div className="flex flex-wrap text-sm gap-4 opacity-85">
          {data.personalInfo.email && (
            <div className="flex items-center">
              <span>{data.personalInfo.email}</span>
            </div>
          )}
          {data.personalInfo.phone && (
            <div className="flex items-center">
              <span>{data.personalInfo.phone}</span>
            </div>
          )}
          {data.personalInfo.location && (
            <div className="flex items-center">
              <span>{data.personalInfo.location}</span>
            </div>
          )}
          {data.personalInfo.website && (
            <div className="flex items-center">
              <span>{data.personalInfo.website}</span>
            </div>
          )}
        </div>
      </header>

      {/* Summary */}
      {data.personalInfo.summary && (
        <section className="resume-section mb-6 px-6">
          <div className="bg-purple-100 p-4 rounded-lg">
            <h3 className="text-lg font-bold text-purple-600 mb-2">About Me</h3>
            <p className="text-sm">{data.personalInfo.summary}</p>
          </div>
        </section>
      )}

      <div className="px-6">
        {/* Work Experience */}
        {data.experiences.length > 0 && (
          <section className="resume-section mb-6">
            <h3 className="text-lg font-bold text-purple-600 mb-3 flex items-center">
              <span className="bg-purple-600 w-6 h-6 rounded-full mr-2"></span>
              Work Experience
            </h3>
            {data.experiences.map((exp) => (
              <div key={exp.id} className="mb-4 pl-8 border-l-2 border-purple-200 py-1">
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h4 className="font-bold">{exp.position}</h4>
                    <h5 className="text-purple-700">{exp.company}{exp.location ? ` • ${exp.location}` : ""}</h5>
                  </div>
                  <div className="text-sm bg-purple-100 px-2 py-1 rounded text-purple-700">
                    {exp.startDate} - {exp.endDate}
                  </div>
                </div>
                <p className="text-sm mt-2">{exp.description}</p>
              </div>
            ))}
          </section>
        )}

        {/* Education */}
        {data.educations.length > 0 && (
          <section className="resume-section mb-6">
            <h3 className="text-lg font-bold text-purple-600 mb-3 flex items-center">
              <span className="bg-purple-600 w-6 h-6 rounded-full mr-2"></span>
              Education
            </h3>
            {data.educations.map((edu) => (
              <div key={edu.id} className="mb-4 pl-8 border-l-2 border-purple-200 py-1">
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h4 className="font-bold">{edu.degree} in {edu.field}</h4>
                    <h5 className="text-purple-700">{edu.institution}{edu.location ? ` • ${edu.location}` : ""}</h5>
                  </div>
                  <div className="text-sm bg-purple-100 px-2 py-1 rounded text-purple-700">
                    {edu.startDate} - {edu.endDate}
                  </div>
                </div>
                {edu.description && <p className="text-sm mt-2">{edu.description}</p>}
              </div>
            ))}
          </section>
        )}

        {/* Skills */}
        {data.skillsGroups.length > 0 && (
          <section className="resume-section mb-6">
            <h3 className="text-lg font-bold text-purple-600 mb-3 flex items-center">
              <span className="bg-purple-600 w-6 h-6 rounded-full mr-2"></span>
              Skills
            </h3>
            {data.skillsGroups.map((group) => (
              <div key={group.id} className="mb-4">
                {group.name && <h4 className="font-semibold text-sm mb-2 text-purple-700">{group.name}</h4>}
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="text-sm bg-purple-200 text-purple-800 px-3 py-1 rounded-full"
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
          <section className="resume-section mb-6">
            <h3 className="text-lg font-bold text-purple-600 mb-3 flex items-center">
              <span className="bg-purple-600 w-6 h-6 rounded-full mr-2"></span>
              Projects
            </h3>
            {data.projects.map((project) => (
              <div key={project.id} className="mb-4 pl-8 border-l-2 border-purple-200 py-1">
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h4 className="font-bold">{project.name}</h4>
                    {project.role && <h5 className="text-purple-700">{project.role}</h5>}
                  </div>
                  {(project.startDate || project.endDate) && (
                    <div className="text-sm bg-purple-100 px-2 py-1 rounded text-purple-700">
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
                <p className="text-sm mt-2">{project.description}</p>
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  );
}
