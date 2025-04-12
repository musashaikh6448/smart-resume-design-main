
import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Trash2 } from "lucide-react";

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  location: string;
  description: string;
}

interface EducationFormProps {
  educations: Education[];
  onAdd: () => void;
  onUpdate: (id: string, field: string, value: string) => void;
  onDelete: (id: string) => void;
}

export function EducationForm({ educations, onAdd, onUpdate, onDelete }: EducationFormProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-semibold text-purple-600">Education</CardTitle>
        <Button variant="outline" size="sm" onClick={onAdd}>
          <PlusCircle className="h-4 w-4 mr-2" />
          Add Education
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {educations.map((education) => (
          <div key={education.id} className="space-y-4 pb-4 border-b border-gray-200 last:border-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`institution-${education.id}`}>Institution</Label>
                <Input
                  id={`institution-${education.id}`}
                  value={education.institution}
                  onChange={(e) => onUpdate(education.id, "institution", e.target.value)}
                  placeholder="Harvard University"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`degree-${education.id}`}>Degree</Label>
                <Input
                  id={`degree-${education.id}`}
                  value={education.degree}
                  onChange={(e) => onUpdate(education.id, "degree", e.target.value)}
                  placeholder="Bachelor of Science"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`field-${education.id}`}>Field of Study</Label>
                <Input
                  id={`field-${education.id}`}
                  value={education.field}
                  onChange={(e) => onUpdate(education.id, "field", e.target.value)}
                  placeholder="Computer Science"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`location-${education.id}`}>Location</Label>
                <Input
                  id={`location-${education.id}`}
                  value={education.location}
                  onChange={(e) => onUpdate(education.id, "location", e.target.value)}
                  placeholder="Cambridge, MA"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`startDate-${education.id}`}>Start Date</Label>
                <Input
                  id={`startDate-${education.id}`}
                  value={education.startDate}
                  onChange={(e) => onUpdate(education.id, "startDate", e.target.value)}
                  placeholder="Sep 2015"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`endDate-${education.id}`}>End Date</Label>
                <Input
                  id={`endDate-${education.id}`}
                  value={education.endDate}
                  onChange={(e) => onUpdate(education.id, "endDate", e.target.value)}
                  placeholder="May 2019"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor={`description-${education.id}`}>Description (Optional)</Label>
              <Textarea
                id={`description-${education.id}`}
                value={education.description}
                onChange={(e) => onUpdate(education.id, "description", e.target.value)}
                placeholder="Relevant coursework, honors, or achievements..."
                rows={3}
              />
            </div>
            <div className="flex justify-end">
              <Button 
                variant="destructive" 
                size="sm" 
                onClick={() => onDelete(education.id)}
                className="flex items-center"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Remove
              </Button>
            </div>
          </div>
        ))}
        
        {educations.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p>No education added yet.</p>
            <Button variant="outline" size="sm" onClick={onAdd} className="mt-2">
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Education
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
