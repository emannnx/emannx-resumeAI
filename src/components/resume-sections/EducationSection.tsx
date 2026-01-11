import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from "lucide-react";

interface Education {
  degree: string;
  institution: string;
  year: string;
}

interface EducationSectionProps {
  education: Education[];
  onChange: (education: Education[]) => void;
}

const EducationSection = ({ education, onChange }: EducationSectionProps) => {
  const handleAdd = () => {
    onChange([...education, { degree: "", institution: "", year: "" }]);
  };

  const handleRemove = (index: number) => {
    onChange(education.filter((_, i) => i !== index));
  };

  const handleChange = (index: number, field: keyof Education, value: string) => {
    const updated = education.map((edu, i) =>
      i === index ? { ...edu, [field]: value } : edu
    );
    onChange(updated);
  };

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-foreground">Education</h2>
        <Button onClick={handleAdd} size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add Education
        </Button>
      </div>
      <div className="space-y-6">
        {education.map((edu, index) => (
          <div key={index} className="p-4 border border-border rounded-lg space-y-4">
            <div className="flex justify-between items-start">
              <h3 className="text-sm font-medium text-foreground">Education {index + 1}</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleRemove(index)}
                disabled={education.length === 1}
              >
                <Trash2 className="w-4 h-4 text-destructive" />
              </Button>
            </div>
            <div className="grid gap-4">
              <div>
                <Label>Degree</Label>
                <Input
                  value={edu.degree}
                  onChange={(e) => handleChange(index, "degree", e.target.value)}
                  placeholder="Bachelor of Science in Computer Science"
                />
              </div>
              <div>
                <Label>Institution</Label>
                <Input
                  value={edu.institution}
                  onChange={(e) => handleChange(index, "institution", e.target.value)}
                  placeholder="University of Technology"
                />
              </div>
              <div>
                <Label>Year</Label>
                <Input
                  value={edu.year}
                  onChange={(e) => handleChange(index, "year", e.target.value)}
                  placeholder="2016 - 2020"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default EducationSection;
