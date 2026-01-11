import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { doc, getDoc, updateDoc, setDoc } from "firebase/firestore";
import { db } from "@/integrations/firebase";
import { Save, Download, ArrowLeft } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import ResumePreview from "./ResumePreview";
import PersonalInfoSection from "./resume-sections/PersonalInfoSection";
import ExperienceSection from "./resume-sections/ExperienceSection";
import EducationSection from "./resume-sections/EducationSection";
import SkillsSection from "./resume-sections/SkillsSection";
import CustomizationPanel, { CustomizationOptions } from "./CustomizationPanel";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

interface ResumeSection {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    summary: string;
  };
  experience: Array<{
    title: string;
    company: string;
    duration: string;
    description: string;
  }>;
  education: Array<{
    degree: string;
    institution: string;
    year: string;
  }>;
  skills: string[];
}

interface ResumeBuilderProps {
  userId: string;
}

const ResumeBuilder = ({ userId }: ResumeBuilderProps) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const resumeId = searchParams.get("id");
  const cvType = searchParams.get("type") as "header" | "full" || "full";

  const [resumeTitle, setResumeTitle] = useState("My Resume");
  const [resumeData, setResumeData] = useState<ResumeSection>({
    personalInfo: {
      fullName: "",
      email: "",
      phone: "",
      location: "",
      summary: "",
    },
    experience: [{ title: "", company: "", duration: "", description: "" }],
    education: [{ degree: "", institution: "", year: "" }],
    skills: [],
  });
  const [customization, setCustomization] = useState<CustomizationOptions>({
    colorScheme: "blue",
    fontSize: 14,
    spacing: 1.5,
    fontFamily: "inter",
    accentColor: "#3b82f6",
  });
  const [saving, setSaving] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [currentResumeId, setCurrentResumeId] = useState<string | null>(resumeId);

  useEffect(() => {
    if (resumeId) {
      loadResume(resumeId);
    }
  }, [resumeId]);

  const loadResume = async (id: string) => {
    try {
      const docRef = doc(db, "resumes", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setCurrentResumeId(docSnap.id);
        setResumeTitle(data.title);
        setResumeData(data.sections);
      }
    } catch (error) {
      toast.error("Failed to load resume");
      console.error("Error loading resume:", error);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (currentResumeId) {
        await updateDoc(doc(db, "resumes", currentResumeId), {
          sections: resumeData,
          title: resumeTitle
        });
      } else {
        const docRef = doc(collection(db, "resumes"));
        await setDoc(docRef, {
          user_id: userId,
          sections: resumeData,
          title: resumeTitle
        });
        setCurrentResumeId(docRef.id);
      }
      toast.success("Resume saved successfully!");
    } catch (error: any) {
      toast.error(error.message || "Failed to save resume");
    } finally {
      setSaving(false);
    }
  };

  const handleExportPDF = async () => {
    setExporting(true);
    try {
      const previewElement = document.getElementById("resume-preview");
      if (!previewElement) {
        throw new Error("Preview element not found");
      }

      const canvas = await html2canvas(previewElement, {
        scale: 2,
        useCORS: true,
        logging: false,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save(`${resumeTitle}.pdf`);
      
      toast.success("Resume exported successfully!");
    } catch (error) {
      console.error("Export error:", error);
      toast.error("Failed to export resume");
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={() => navigate("/resumes")}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Resumes
        </Button>
        <div className="flex gap-4">
          <Button onClick={handleSave} disabled={saving}>
            <Save className="w-4 h-4 mr-2" />
            {saving ? "Saving..." : "Save Resume"}
          </Button>
          <Button variant="outline" onClick={handleExportPDF} disabled={exporting}>
            <Download className="w-4 h-4 mr-2" />
            {exporting ? "Exporting..." : "Export PDF"}
          </Button>
        </div>
      </div>

      <div className="mb-6">
        <Label htmlFor="resumeTitle">Resume Title</Label>
        <Input
          id="resumeTitle"
          value={resumeTitle}
          onChange={(e) => setResumeTitle(e.target.value)}
          placeholder="My Resume"
          className="max-w-md"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Editor Panel */}
        <div className="lg:col-span-2 space-y-6">
          <PersonalInfoSection
            data={resumeData.personalInfo}
            onChange={(data) =>
              setResumeData({ ...resumeData, personalInfo: data })
            }
          />

          {cvType === "full" && (
            <>
              <ExperienceSection
                experiences={resumeData.experience}
                onChange={(experience) =>
                  setResumeData({ ...resumeData, experience })
                }
              />

              <EducationSection
                education={resumeData.education}
                onChange={(education) =>
                  setResumeData({ ...resumeData, education })
                }
              />

              <SkillsSection
                skills={resumeData.skills}
                onChange={(skills) => setResumeData({ ...resumeData, skills })}
              />
            </>
          )}

          <CustomizationPanel
            options={customization}
            onChange={setCustomization}
          />
        </div>

        {/* Preview Panel */}
        <div className="lg:sticky lg:top-6 h-fit">
          <ResumePreview 
            resumeData={resumeData} 
            customization={customization}
            cvType={cvType}
          />
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;