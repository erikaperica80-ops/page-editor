import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const popularFonts = [
  { value: "'Inter', sans-serif", label: "Inter" },
  { value: "'Poppins', sans-serif", label: "Poppins" },
  { value: "'Roboto', sans-serif", label: "Roboto" },
  { value: "'Open Sans', sans-serif", label: "Open Sans" },
  { value: "'Montserrat', sans-serif", label: "Montserrat" },
  { value: "'Lato', sans-serif", label: "Lato" },
  { value: "'Nunito', sans-serif", label: "Nunito" },
  { value: "'Raleway', sans-serif", label: "Raleway" },
  { value: "'Playfair Display', serif", label: "Playfair Display" },
  { value: "'Merriweather', serif", label: "Merriweather" },
  { value: "'Source Sans Pro', sans-serif", label: "Source Sans Pro" },
  { value: "'Ubuntu', sans-serif", label: "Ubuntu" },
  { value: "custom", label: "Personalizada..." },
];

interface FontSelectProps {
  value: string;
  onChange: (font: string) => void;
  label: string;
}

export function FontSelect({ value, onChange, label }: FontSelectProps) {
  const isKnownFont = popularFonts.some((f) => f.value === value && f.value !== "custom");
  const selectValue = isKnownFont ? value : "custom";
  const [customFont, setCustomFont] = useState(isKnownFont ? "" : value);

  const handleSelectChange = (selected: string) => {
    if (selected === "custom") {
      // Keep current value when switching to custom mode
      if (!isKnownFont) return;
      // transitioning from a known font to custom: keep existing value in customFont
    } else {
      onChange(selected);
    }
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomFont(e.target.value);
    onChange(e.target.value);
  };

  return (
    <div className="space-y-2">
      <Label className="text-xs text-muted-foreground">{label}</Label>
      <Select value={selectValue} onValueChange={handleSelectChange}>
        <SelectTrigger className="h-8 text-sm">
          <SelectValue placeholder="Seleccionar fuente" />
        </SelectTrigger>
        <SelectContent>
          {popularFonts.map((font) => (
            <SelectItem key={font.value} value={font.value}>
              {font.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {selectValue === "custom" && (
        <Input
          value={customFont}
          onChange={handleCustomChange}
          placeholder="Ej: 'My Font', sans-serif"
          className="h-8 text-sm"
        />
      )}
    </div>
  );
}
