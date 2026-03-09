import { useEditorStore } from '@/store/editorStore';
import { SectionItem } from './SectionItem';

export function SectionList() {
  const sections = useEditorStore((s) =>
    s.tenant?.pageSchema.sections.slice().sort((a, b) => a.order - b.order) ?? []
  );

  if (sections.length === 0) {
    return (
      <p className="text-sm text-muted-foreground text-center py-8">
        No hay secciones disponibles
      </p>
    );
  }

  return (
    <div className="space-y-1">
      {sections.map((section) => (
        <SectionItem key={section.id} section={section} />
      ))}
    </div>
  );
}
