import { ChevronDown, ChevronRight, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ComponentNodeItem } from './ComponentNode';
import { useEditorStore } from '@/store/editorStore';
import { Section } from '@/types/schema';
import { cn } from '@/lib/utils';

interface SectionItemProps {
  section: Section;
}

export function SectionItem({ section }: SectionItemProps) {
  const { expandedSections, toggleSectionExpanded, selectSection, selectedSectionId, updateSectionVisibility } =
    useEditorStore();

  const isExpanded = expandedSections.includes(section.id);
  const isSelected = selectedSectionId === section.id;

  return (
    <Collapsible open={isExpanded} onOpenChange={() => toggleSectionExpanded(section.id)}>
      <div
        className={cn(
          'flex items-center gap-1 rounded-md px-2 py-1 hover:bg-accent cursor-pointer group',
          isSelected && 'bg-accent'
        )}
        onClick={() => selectSection(section.id)}
      >
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-5 w-5 shrink-0"
            onClick={(e) => {
              e.stopPropagation();
              toggleSectionExpanded(section.id);
            }}
          >
            {isExpanded ? (
              <ChevronDown className="h-3.5 w-3.5" />
            ) : (
              <ChevronRight className="h-3.5 w-3.5" />
            )}
          </Button>
        </CollapsibleTrigger>

        <span className="flex-1 text-sm font-medium truncate">{section.label}</span>

        <Button
          variant="ghost"
          size="icon"
          className="h-5 w-5 shrink-0 opacity-0 group-hover:opacity-100"
          onClick={(e) => {
            e.stopPropagation();
            updateSectionVisibility(section.id, !section.visible);
          }}
        >
          {section.visible ? (
            <Eye className="h-3.5 w-3.5" />
          ) : (
            <EyeOff className="h-3.5 w-3.5 text-muted-foreground" />
          )}
        </Button>
      </div>

      <CollapsibleContent>
        <div className="ml-4 mt-0.5 space-y-0.5">
          {section.components
            .slice()
            .sort((a, b) => a.order - b.order)
            .map((component) => (
              <ComponentNodeItem key={component.id} component={component} depth={0} />
            ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
