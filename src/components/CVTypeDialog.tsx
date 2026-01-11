import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FileText, File, ArrowRight } from "lucide-react";

interface CVTypeDialogProps {
  open: boolean;
  onSelect: (type: "header" | "full") => void;
}

const CVTypeDialog = ({ open, onSelect }: CVTypeDialogProps) => {
  const [selectedType, setSelectedType] = useState<"header" | "full" | null>(null);

  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Create Your CV</DialogTitle>
          <DialogDescription>
            Choose the type of CV you want to create
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-2 gap-4 py-4">
          <Card
            className={`p-6 cursor-pointer transition-all hover:shadow-lg ${
              selectedType === "header"
                ? "ring-2 ring-primary bg-primary/5"
                : "hover:bg-accent/50"
            }`}
            onClick={() => setSelectedType("header")}
          >
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <File className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg">CV Header</h3>
              <p className="text-sm text-muted-foreground">
                Create just a professional header with your contact information
              </p>
            </div>
          </Card>

          <Card
            className={`p-6 cursor-pointer transition-all hover:shadow-lg ${
              selectedType === "full"
                ? "ring-2 ring-primary bg-primary/5"
                : "hover:bg-accent/50"
            }`}
            onClick={() => setSelectedType("full")}
          >
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <FileText className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg">Full CV</h3>
              <p className="text-sm text-muted-foreground">
                Create a complete CV with experience, education, and skills
              </p>
            </div>
          </Card>
        </div>

        <div className="flex justify-end">
          <Button
            onClick={() => selectedType && onSelect(selectedType)}
            disabled={!selectedType}
            size="lg"
          >
            Continue
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CVTypeDialog;
