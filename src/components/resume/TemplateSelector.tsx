
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

export type TemplateType = "simple" | "minimalist" | "professional" | "creative" | "ats";

interface TemplateSelectorProps {
  selectedTemplate: TemplateType;
  onSelectTemplate: (template: TemplateType) => void;
}

export function TemplateSelector({
  selectedTemplate,
  onSelectTemplate,
}: TemplateSelectorProps) {
  const templates = [
    {
      id: "simple",
      name: "Simple",
      description: "Clean and professional resume template with colored section headers.",
    },
    {
      id: "minimalist",
      name: "Minimalist",
      description: "Elegant minimalist design with centered headers and subtle styling.",
    },
    {
      id: "professional",
      name: "Professional",
      description: "Traditional resume layout optimized for formal applications.",
    },
    {
      id: "creative",
      name: "Creative",
      description: "Modern design with bold colors and unique layout.",
    },
    {
      id: "ats",
      name: "ATS-Friendly",
      description: "Optimized for Applicant Tracking Systems with simple formatting.",
    },
  ];

  return (
    <Card>
      <CardContent className="pt-6">
        <h2 className="text-xl font-semibold text-purple-600 mb-4">Choose a Template</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {templates.map((template) => (
            <div
              key={template.id}
              className={`
                border rounded-lg p-4 cursor-pointer transition-all
                ${
                  selectedTemplate === template.id
                    ? "border-purple-500 bg-purple-50 shadow-sm"
                    : "border-gray-200 hover:border-purple-300 hover:bg-gray-50"
                }
              `}
              onClick={() => onSelectTemplate(template.id as TemplateType)}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium">{template.name}</h3>
                {selectedTemplate === template.id && (
                  <CheckCircle2 className="h-5 w-5 text-purple-600" />
                )}
              </div>
              <p className="text-sm text-gray-600">{template.description}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
