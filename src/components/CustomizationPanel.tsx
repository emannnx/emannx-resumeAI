import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Palette, Type, Layout } from "lucide-react";

export interface CustomizationOptions {
  colorScheme: string;
  fontSize: number;
  spacing: number;
  fontFamily: string;
  accentColor: string;
}

interface CustomizationPanelProps {
  options: CustomizationOptions;
  onChange: (options: CustomizationOptions) => void;
}

const colorSchemes = [
  { value: "blue", label: "Professional Blue", primary: "#3b82f6" },
  { value: "purple", label: "Creative Purple", primary: "#a855f7" },
  { value: "green", label: "Fresh Green", primary: "#10b981" },
  { value: "orange", label: "Energetic Orange", primary: "#f97316" },
  { value: "slate", label: "Modern Slate", primary: "#64748b" },
];

const fontFamilies = [
  { value: "inter", label: "Inter (Modern)" },
  { value: "georgia", label: "Georgia (Classic)" },
  { value: "roboto", label: "Roboto (Clean)" },
  { value: "playfair", label: "Playfair (Elegant)" },
];

const CustomizationPanel = ({ options, onChange }: CustomizationPanelProps) => {
  const updateOption = (key: keyof CustomizationOptions, value: any) => {
    onChange({ ...options, [key]: value });
  };

  return (
    <Card className="p-6 space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Palette className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold">Customize Your CV</h3>
      </div>

      {/* Color Scheme */}
      <div className="space-y-2">
        <Label className="flex items-center gap-2">
          <Palette className="w-4 h-4" />
          Color Scheme
        </Label>
        <Select
          value={options.colorScheme}
          onValueChange={(value) => {
            const scheme = colorSchemes.find(s => s.value === value);
            updateOption("colorScheme", value);
            if (scheme) updateOption("accentColor", scheme.primary);
          }}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {colorSchemes.map((scheme) => (
              <SelectItem key={scheme.value} value={scheme.value}>
                <div className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: scheme.primary }}
                  />
                  {scheme.label}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Font Family */}
      <div className="space-y-2">
        <Label className="flex items-center gap-2">
          <Type className="w-4 h-4" />
          Font Style
        </Label>
        <Select
          value={options.fontFamily}
          onValueChange={(value) => updateOption("fontFamily", value)}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {fontFamilies.map((font) => (
              <SelectItem key={font.value} value={font.value}>
                {font.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Font Size */}
      <div className="space-y-2">
        <Label className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Type className="w-4 h-4" />
            Font Size
          </span>
          <span className="text-sm text-muted-foreground">{options.fontSize}px</span>
        </Label>
        <Slider
          value={[options.fontSize]}
          onValueChange={([value]) => updateOption("fontSize", value)}
          min={12}
          max={18}
          step={1}
          className="w-full"
        />
      </div>

      {/* Spacing */}
      <div className="space-y-2">
        <Label className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Layout className="w-4 h-4" />
            Spacing
          </span>
          <span className="text-sm text-muted-foreground">{options.spacing}</span>
        </Label>
        <Slider
          value={[options.spacing]}
          onValueChange={([value]) => updateOption("spacing", value)}
          min={1}
          max={3}
          step={0.5}
          className="w-full"
        />
      </div>
    </Card>
  );
};

export default CustomizationPanel;
