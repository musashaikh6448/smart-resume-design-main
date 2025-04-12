
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

export interface SkillsGroup {
  id: string;
  name: string;
  skills: string[];
}

interface SkillsFormProps {
  skillsGroups: SkillsGroup[];
  onAddGroup: () => void;
  onUpdateGroupName: (id: string, name: string) => void;
  onAddSkill: (groupId: string, skill: string) => void;
  onRemoveSkill: (groupId: string, skillIndex: number) => void;
  onDeleteGroup: (id: string) => void;
}

export function SkillsForm({
  skillsGroups,
  onAddGroup,
  onUpdateGroupName,
  onAddSkill,
  onRemoveSkill,
  onDeleteGroup,
}: SkillsFormProps) {
  const [newSkillInputs, setNewSkillInputs] = useState<{ [key: string]: string }>({});

  const handleAddSkill = (groupId: string) => {
    const skill = newSkillInputs[groupId]?.trim();
    if (skill) {
      onAddSkill(groupId, skill);
      setNewSkillInputs({ ...newSkillInputs, [groupId]: "" });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent, groupId: string) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddSkill(groupId);
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-semibold text-purple-600">Skills</CardTitle>
        <Button variant="outline" size="sm" onClick={onAddGroup}>
          Add Skill Category
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {skillsGroups.map((group) => (
          <div key={group.id} className="space-y-4 pb-4 border-b border-gray-200 last:border-0">
            <div className="flex items-end gap-4">
              <div className="flex-1 space-y-2">
                <Label htmlFor={`group-name-${group.id}`}>Category Name</Label>
                <Input
                  id={`group-name-${group.id}`}
                  value={group.name}
                  onChange={(e) => onUpdateGroupName(group.id, e.target.value)}
                  placeholder="Technical Skills"
                />
              </div>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => onDeleteGroup(group.id)}
                className="mb-0.5"
              >
                Remove
              </Button>
            </div>

            <div className="space-y-3">
              <Label>Skills</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {group.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1 py-1.5">
                    {skill}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => onRemoveSkill(group.id, index)}
                    />
                  </Badge>
                ))}
              </div>
              
              <div className="flex items-center gap-2">
                <Input
                  value={newSkillInputs[group.id] || ""}
                  onChange={(e) => 
                    setNewSkillInputs({ ...newSkillInputs, [group.id]: e.target.value })
                  }
                  onKeyPress={(e) => handleKeyPress(e, group.id)}
                  placeholder="Add a skill and press Enter"
                />
                <Button 
                  size="sm" 
                  onClick={() => handleAddSkill(group.id)}
                  type="button"
                >
                  Add
                </Button>
              </div>
            </div>
          </div>
        ))}
        
        {skillsGroups.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p>No skill categories added yet.</p>
            <Button variant="outline" size="sm" onClick={onAddGroup} className="mt-2">
              Add Skill Category
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
