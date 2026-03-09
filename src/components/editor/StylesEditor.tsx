import { useTenant, useEditorActions } from "@/hooks/useEditorSelectors";
import { ColorPicker } from "@/components/ui/color-picker";
import { FontSelect } from "@/components/ui/font-select";
import { Separator } from "@/components/ui/separator";

export function StylesEditor() {
  const tenant = useTenant();
  const { updateTheme } = useEditorActions();

  if (!tenant) return null;

  const theme = tenant.theme;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold mb-4">Colores</h3>
        <div className="space-y-4">
          <ColorPicker
            label="Color primario"
            value={theme.primaryColor}
            onChange={(color) => updateTheme({ primaryColor: color })}
          />
          <ColorPicker
            label="Color secundario"
            value={theme.secondaryColor}
            onChange={(color) => updateTheme({ secondaryColor: color })}
          />
          <ColorPicker
            label="Color de acento"
            value={theme.accentColor}
            onChange={(color) => updateTheme({ accentColor: color })}
          />
          <ColorPicker
            label="Color de fondo"
            value={theme.backgroundColor}
            onChange={(color) => updateTheme({ backgroundColor: color })}
          />
          <ColorPicker
            label="Color de texto"
            value={theme.textColor}
            onChange={(color) => updateTheme({ textColor: color })}
          />
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="font-semibold mb-4">Tipografía global</h3>
        <div className="space-y-4">
          <FontSelect
            label="Fuente principal"
            value={theme.fontFamily}
            onChange={(font) => updateTheme({ fontFamily: font })}
          />
          <FontSelect
            label="Fuente de encabezados"
            value={theme.fontFamilyHeading}
            onChange={(font) => updateTheme({ fontFamilyHeading: font })}
          />
        </div>
      </div>
    </div>
  );
}
