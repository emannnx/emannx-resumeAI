import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SkillsSectionProps {
  skills: string[];
  onChange: (skills: string[]) => void;
}

const SkillsSection = ({ skills, onChange }: SkillsSectionProps) => {
  const [skillInput, setSkillInput] = useState("");

  const handleAdd = () => {
    if (skillInput.trim()) {
      onChange([...skills, skillInput.trim()]);
      setSkillInput("");
    }
  };

  const handleRemove = (index: number) => {
    onChange(skills.filter((_, i) => i !== index));
  };

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4 text-foreground">Skills</h2>
      <div className="space-y-4">
        <div className="flex gap-2">
          <Input
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleAdd()}
            placeholder="Add a skill"
          />
          <Button onClick={handleAdd}>Add</Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm flex items-center gap-2"
            >
              {skill}
              <button
                onClick={() => handleRemove(index)}
                className="text-primary hover:text-primary/70"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default SkillsSection;
