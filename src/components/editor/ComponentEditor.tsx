import { useEditorStore } from '@/store/editorStore';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { ComponentNode } from '@/types/schema';

interface ComponentEditorProps {
  componentId: string;
}

function findComponentById(components: ComponentNode[], id: string): ComponentNode | null {
  for (const comp of components) {
    if (comp.id === id) return comp;
    if (comp.children) {
      const found = findComponentById(comp.children, id);
      if (found) return found;
    }
  }
  return null;
}

export function ComponentEditor({ componentId }: ComponentEditorProps) {
  const { tenant, updateComponentValue, updateComponentVisibility } = useEditorStore();

  if (!tenant) return null;

  const allComponents = tenant.pageSchema.sections.flatMap((s) => s.components);
  const component = findComponentById(allComponents, componentId);

  if (!component) {
    return (
      <p className="text-sm text-muted-foreground text-center py-8">
        Componente no encontrado
      </p>
    );
  }

  const stringValue = typeof component.value === 'string' ? component.value : '';
  const isTextType = ['text', 'heading', 'paragraph', 'button', 'link'].includes(component.type);
  const isTextareaType = component.type === 'textarea' || (isTextType && stringValue.length > 60);

  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-semibold text-sm">{component.label ?? component.type}</h3>
        <Badge variant="secondary" className="mt-1 text-xs">
          {component.type}
        </Badge>
      </div>

      <Separator />

      <div className="flex items-center justify-between">
        <Label htmlFor="visible" className="text-sm">
          Visible
        </Label>
        <Switch
          id="visible"
          checked={component.visible}
          onCheckedChange={(checked) => updateComponentVisibility(component.id, checked)}
        />
      </div>

      {component.editable && isTextType && (
        <>
          <Separator />
          <div className="space-y-2">
            <Label htmlFor="value" className="text-sm">
              Contenido
            </Label>
            {isTextareaType ? (
              <Textarea
                id="value"
                value={stringValue}
                onChange={(e) => updateComponentValue(component.id, e.target.value)}
                rows={4}
                className="text-sm"
              />
            ) : (
              <Input
                id="value"
                value={stringValue}
                onChange={(e) => updateComponentValue(component.id, e.target.value)}
                className="text-sm"
              />
            )}
          </div>
        </>
      )}

      {component.link && (
        <>
          <Separator />
          <div className="space-y-2">
            <Label className="text-sm font-medium">Enlace</Label>
            <div className="space-y-2">
              <div>
                <Label htmlFor="link-href" className="text-xs text-muted-foreground">
                  URL
                </Label>
                <Input
                  id="link-href"
                  value={component.link.href}
                  readOnly
                  className="text-sm mt-1"
                />
              </div>
            </div>
          </div>
        </>
      )}

      {component.typography && (
        <>
          <Separator />
          <div className="space-y-2">
            <Label className="text-sm font-medium">Tipografía</Label>
            <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
              {component.typography.fontSize && (
                <div>
                  <span className="font-medium">Tamaño:</span> {component.typography.fontSize}
                </div>
              )}
              {component.typography.fontWeight && (
                <div>
                  <span className="font-medium">Peso:</span> {component.typography.fontWeight}
                </div>
              )}
              {component.typography.textAlign && (
                <div>
                  <span className="font-medium">Alineación:</span> {component.typography.textAlign}
                </div>
              )}
              {component.typography.textTransform && (
                <div>
                  <span className="font-medium">Transform:</span> {component.typography.textTransform}
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {component.validation && (
        <>
          <Separator />
          <div className="space-y-2">
            <Label className="text-sm font-medium">Validación</Label>
            <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
              {component.validation.required && (
                <div className="col-span-2">
                  <Badge variant="outline" className="text-xs">Requerido</Badge>
                </div>
              )}
              {component.validation.minLength !== undefined && (
                <div>
                  <span className="font-medium">Mín:</span> {component.validation.minLength}
                </div>
              )}
              {component.validation.maxLength !== undefined && (
                <div>
                  <span className="font-medium">Máx:</span> {component.validation.maxLength}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
