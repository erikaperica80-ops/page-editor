import { useEditorStore } from '@/store/editorStore';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Save, RotateCcw, Building2 } from 'lucide-react';
import { useState } from 'react';

export function Header() {
  const { tenant, isDirty, saveChanges, resetChanges } = useEditorStore();
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await saveChanges();
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <header className="flex h-14 items-center gap-3 border-b bg-background px-4">
      <div className="flex items-center gap-2">
        <Building2 className="h-5 w-5 text-primary" />
        <span className="font-semibold text-sm">Page Editor</span>
      </div>

      <Separator orientation="vertical" className="h-5" />

      {tenant && (
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">{tenant.name}</span>
          <Badge variant="outline" className="text-xs">
            {tenant.domain}
          </Badge>
        </div>
      )}

      <div className="ml-auto flex items-center gap-2">
        {isDirty && (
          <Badge variant="secondary" className="text-xs">
            Cambios sin guardar
          </Badge>
        )}

        <Button
          variant="ghost"
          size="sm"
          onClick={resetChanges}
          disabled={!isDirty || isSaving}
          className="gap-1.5"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Deshacer
        </Button>

        <Button
          size="sm"
          onClick={handleSave}
          disabled={!isDirty || isSaving}
          className="gap-1.5"
        >
          <Save className="h-3.5 w-3.5" />
          {isSaving ? 'Guardando...' : 'Guardar'}
        </Button>
      </div>
    </header>
  );
}
