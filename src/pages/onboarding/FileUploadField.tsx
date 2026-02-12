import { useState, useRef } from "react";
import { Upload, X } from "lucide-react";
import { Label } from "@/components/ui/label";

interface FileUploadFieldProps {
  label: string;
  value: File | null;
  onChange: (file: File | null) => void;
  required?: boolean;
}

const FileUploadField = ({ label, value, onChange, required }: FileUploadFieldProps) => {
  const [preview, setPreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    onChange(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setPreview(ev.target?.result as string);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const clear = () => {
    onChange(null);
    setPreview(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div>
      <Label className="text-muted-foreground text-xs">
        {label} {required && <span className="text-primary">*</span>}
      </Label>
      {preview ? (
        <div className="relative mt-1 rounded-lg overflow-hidden border border-border bg-card">
          <img src={preview} alt={label} className="w-full h-32 object-cover" />
          <button onClick={clear} className="absolute top-1 right-1 bg-background/80 rounded-full p-1">
            <X size={14} className="text-foreground" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="mt-1 w-full h-24 border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center gap-1 bg-card hover:border-primary/40 transition-colors"
        >
          <Upload size={20} className="text-muted-foreground" />
          <span className="text-xs text-muted-foreground">Selecionar foto</span>
        </button>
      )}
      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleChange} />
    </div>
  );
};

export default FileUploadField;
