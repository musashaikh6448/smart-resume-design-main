
import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Trash2 } from "lucide-react";

export interface Project {
  id: string;
  name: string;
  role: string;
  startDate: string;
  endDate: string;
  url: string;
  description: string;
}

interface ProjectsFormProps {
  projects: Project[];
  onAdd: () => void;
  onUpdate: (id: string, field: string, value: string) => void;
  onDelete: (id: string) => void;
}

export function ProjectsForm({ projects, onAdd, onUpdate, onDelete }: ProjectsFormProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-semibold text-purple-600">Projects</CardTitle>
        <Button variant="outline" size="sm" onClick={onAdd}>
          <PlusCircle className="h-4 w-4 mr-2" />
          Add Project
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {projects.map((project) => (
          <div key={project.id} className="space-y-4 pb-4 border-b border-gray-200 last:border-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`name-${project.id}`}>Project Name</Label>
                <Input
                  id={`name-${project.id}`}
                  value={project.name}
                  onChange={(e) => onUpdate(project.id, "name", e.target.value)}
                  placeholder="E-commerce Website"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`role-${project.id}`}>Your Role</Label>
                <Input
                  id={`role-${project.id}`}
                  value={project.role}
                  onChange={(e) => onUpdate(project.id, "role", e.target.value)}
                  placeholder="Frontend Developer"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`startDate-${project.id}`}>Start Date</Label>
                <Input
                  id={`startDate-${project.id}`}
                  value={project.startDate}
                  onChange={(e) => onUpdate(project.id, "startDate", e.target.value)}
                  placeholder="Jan 2020"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`endDate-${project.id}`}>End Date</Label>
                <Input
                  id={`endDate-${project.id}`}
                  value={project.endDate}
                  onChange={(e) => onUpdate(project.id, "endDate", e.target.value)}
                  placeholder="Jun 2020"
                />
              </div>
              <div className="md:col-span-2 space-y-2">
                <Label htmlFor={`url-${project.id}`}>Project URL (Optional)</Label>
                <Input
                  id={`url-${project.id}`}
                  value={project.url}
                  onChange={(e) => onUpdate(project.id, "url", e.target.value)}
                  placeholder="https://github.com/username/project"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor={`description-${project.id}`}>Description</Label>
              <Textarea
                id={`description-${project.id}`}
                value={project.description}
                onChange={(e) => onUpdate(project.id, "description", e.target.value)}
                placeholder="Describe the project, your contributions, and technologies used..."
                rows={4}
              />
            </div>
            <div className="flex justify-end">
              <Button 
                variant="destructive" 
                size="sm" 
                onClick={() => onDelete(project.id)}
                className="flex items-center"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Remove
              </Button>
            </div>
          </div>
        ))}
        
        {projects.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p>No projects added yet.</p>
            <Button variant="outline" size="sm" onClick={onAdd} className="mt-2">
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Project
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
