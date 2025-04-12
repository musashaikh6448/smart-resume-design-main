
import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Trash2 } from "lucide-react";

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  location: string;
  description: string;
}

interface ExperienceFormProps {
  experiences: Experience[];
  onAdd: () => void;
  onUpdate: (id: string, field: string, value: string) => void;
  onDelete: (id: string) => void;
}

export function ExperienceForm({ experiences, onAdd, onUpdate, onDelete }: ExperienceFormProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-semibold text-purple-600">Work Experience</CardTitle>
        <Button variant="outline" size="sm" onClick={onAdd}>
          <PlusCircle className="h-4 w-4 mr-2" />
          Add Experience
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {experiences.map((experience) => (
          <div key={experience.id} className="space-y-4 pb-4 border-b border-gray-200 last:border-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`company-${experience.id}`}>Company</Label>
                <Input
                  id={`company-${experience.id}`}
                  value={experience.company}
                  onChange={(e) => onUpdate(experience.id, "company", e.target.value)}
                  placeholder="Google"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`position-${experience.id}`}>Position</Label>
                <Input
                  id={`position-${experience.id}`}
                  value={experience.position}
                  onChange={(e) => onUpdate(experience.id, "position", e.target.value)}
                  placeholder="Senior Software Engineer"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`startDate-${experience.id}`}>Start Date</Label>
                <Input
                  id={`startDate-${experience.id}`}
                  value={experience.startDate}
                  onChange={(e) => onUpdate(experience.id, "startDate", e.target.value)}
                  placeholder="Jan 2020"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`endDate-${experience.id}`}>End Date</Label>
                <Input
                  id={`endDate-${experience.id}`}
                  value={experience.endDate}
                  onChange={(e) => onUpdate(experience.id, "endDate", e.target.value)}
                  placeholder="Present"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`location-${experience.id}`}>Location</Label>
                <Input
                  id={`location-${experience.id}`}
                  value={experience.location}
                  onChange={(e) => onUpdate(experience.id, "location", e.target.value)}
                  placeholder="Mountain View, CA"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor={`description-${experience.id}`}>Description</Label>
              <Textarea
                id={`description-${experience.id}`}
                value={experience.description}
                onChange={(e) => onUpdate(experience.id, "description", e.target.value)}
                placeholder="Describe your responsibilities and achievements..."
                rows={4}
              />
            </div>
            <div className="flex justify-end">
              <Button 
                variant="destructive" 
                size="sm" 
                onClick={() => onDelete(experience.id)}
                className="flex items-center"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Remove
              </Button>
            </div>
          </div>
        ))}
        
        {experiences.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p>No work experience added yet.</p>
            <Button variant="outline" size="sm" onClick={onAdd} className="mt-2">
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Experience
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
