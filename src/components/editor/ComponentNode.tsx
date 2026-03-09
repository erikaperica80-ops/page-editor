import { ChevronDown, ChevronRight, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useEditorStore } from '@/store/editorStore';
import { ComponentNode } from '@/types/schema';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface ComponentNodeItemProps {
  component: ComponentNode;
  depth: number;
}

export function ComponentNodeItem({ component, depth }: ComponentNodeItemProps) {
  const [open, setOpen] = useState(false);
  const { selectComponent, selectedComponentId, updateComponentVisibility } = useEditorStore();
  const isSelected = selectedComponentId === component.id;
  const hasChildren = component.children && component.children.length > 0;

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <div
        className={cn(
          'flex items-center gap-1 rounded-md px-2 py-1 hover:bg-accent cursor-pointer group text-sm',
          isSelected && 'bg-accent',
          depth > 0 && 'ml-3'
        )}
        onClick={() => selectComponent(component.id)}
      >
        {hasChildren ? (
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-4 w-4 shrink-0"
              onClick={(e) => {
                e.stopPropagation();
                setOpen(!open);
              }}
            >
              {open ? (
                <ChevronDown className="h-3 w-3" />
              ) : (
                <ChevronRight className="h-3 w-3" />
              )}
            </Button>
          </CollapsibleTrigger>
        ) : (
          <span className="h-4 w-4 shrink-0" />
        )}

        <span className="flex-1 truncate text-xs">
          {component.label ?? component.type}
        </span>

        <span className="text-xs text-muted-foreground opacity-0 group-hover:opacity-100 mr-1">
          {component.type}
        </span>

        <Button
          variant="ghost"
          size="icon"
          className="h-4 w-4 shrink-0 opacity-0 group-hover:opacity-100"
          onClick={(e) => {
            e.stopPropagation();
            updateComponentVisibility(component.id, !component.visible);
          }}
        >
          {component.visible ? (
            <Eye className="h-3 w-3" />
          ) : (
            <EyeOff className="h-3 w-3 text-muted-foreground" />
          )}
        </Button>
      </div>

      {hasChildren && (
        <CollapsibleContent>
          <div className="ml-2 space-y-0.5">
            {component.children!
              .slice()
              .sort((a, b) => a.order - b.order)
              .map((child) => (
                <ComponentNodeItem key={child.id} component={child} depth={depth + 1} />
              ))}
          </div>
        </CollapsibleContent>
      )}
    </Collapsible>
  );
}
