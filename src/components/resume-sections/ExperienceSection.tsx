import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2 } from "lucide-react";

interface Experience {
  title: string;
  company: string;
  duration: string;
  description: string;
}

interface ExperienceSectionProps {
  experiences: Experience[];
  onChange: (experiences: Experience[]) => void;
}

const ExperienceSection = ({ experiences, onChange }: ExperienceSectionProps) => {
  const handleAdd = () => {
    onChange([...experiences, { title: "", company: "", duration: "", description: "" }]);
  };

  const handleRemove = (index: number) => {
    onChange(experiences.filter((_, i) => i !== index));
  };

  const handleChange = (index: number, field: keyof Experience, value: string) => {
    const updated = experiences.map((exp, i) =>
      i === index ? { ...exp, [field]: value } : exp
    );
    onChange(updated);
  };

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-foreground">Work Experience</h2>
        <Button onClick={handleAdd} size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add Experience
        </Button>
      </div>
      <div className="space-y-6">
        {experiences.map((exp, index) => (
          <div key={index} className="p-4 border border-border rounded-lg space-y-4">
            <div className="flex justify-between items-start">
              <h3 className="text-sm font-medium text-foreground">Experience {index + 1}</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleRemove(index)}
                disabled={experiences.length === 1}
              >
                <Trash2 className="w-4 h-4 text-destructive" />
              </Button>
            </div>
            <div className="grid gap-4">
              <div>
                <Label>Job Title</Label>
                <Input
                  value={exp.title}
                  onChange={(e) => handleChange(index, "title", e.target.value)}
                  placeholder="Senior Software Engineer"
                />
              </div>
              <div>
                <Label>Company</Label>
                <Input
                  value={exp.company}
                  onChange={(e) => handleChange(index, "company", e.target.value)}
                  placeholder="Tech Corp"
                />
              </div>
              <div>
                <Label>Duration</Label>
                <Input
                  value={exp.duration}
                  onChange={(e) => handleChange(index, "duration", e.target.value)}
                  placeholder="Jan 2020 - Present"
                />
              </div>
              <div>
                <Label>Description</Label>
                <Textarea
                  value={exp.description}
                  onChange={(e) => handleChange(index, "description", e.target.value)}
                  placeholder="Describe your responsibilities and achievements..."
                  rows={3}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default ExperienceSection;
