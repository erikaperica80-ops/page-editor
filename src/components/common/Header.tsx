import { useTenant, useIsDirty, useEditorActions } from "@/hooks/useEditorSelectors";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Save, Undo } from "lucide-react";

export function Header() {
  const tenant = useTenant();
  const isDirty = useIsDirty();
  const { saveChanges, resetChanges } = useEditorActions();

  return (
    <header className="h-14 border-b flex items-center justify-between px-4 bg-background">
      <div className="flex items-center gap-4">
        <h1 className="font-bold text-lg">Page Editor</h1>
        {tenant && (
          <Badge variant="outline">{tenant.name}</Badge>
        )}
        {isDirty && (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
            Sin guardar
          </Badge>
        )}
      </div>

      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" disabled={!isDirty} onClick={resetChanges}>
          <Undo className="h-4 w-4 mr-2" />
          Deshacer
        </Button>
        <Button size="sm" disabled={!isDirty} onClick={saveChanges}>
          <Save className="h-4 w-4 mr-2" />
          Guardar
        </Button>
      </div>
    </header>
  );
}