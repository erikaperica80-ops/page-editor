import { useState, KeyboardEvent } from "react";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface KeywordsInputProps {
  value: string[];
  onChange: (keywords: string[]) => void;
}

export function KeywordsInput({ value, onChange }: KeywordsInputProps) {
  const [inputValue, setInputValue] = useState("");

  const addKeyword = (kw: string) => {
    const trimmed = kw.trim();
    if (trimmed && !value.includes(trimmed)) {
      onChange([...value, trimmed]);
    }
    setInputValue("");
  };

  const removeKeyword = (kw: string) => {
    onChange(value.filter((k) => k !== kw));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addKeyword(inputValue);
    } else if (e.key === "Backspace" && !inputValue && value.length > 0) {
      removeKeyword(value[value.length - 1]);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-1 min-h-8">
        {value.map((kw) => (
          <Badge key={kw} variant="secondary" className="text-xs gap-1">
            {kw}
            <button
              type="button"
              onClick={() => removeKeyword(kw)}
              className="ml-1 hover:text-destructive"
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
      </div>
      <Input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Escribir y presionar Enter o coma"
        className="h-8 text-sm"
      />
    </div>
  );
}
