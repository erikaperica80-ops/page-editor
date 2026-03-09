import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SectionList } from './SectionList';
import { ComponentEditor } from './ComponentEditor';
import { useEditorStore } from '@/store/editorStore';
import { Settings, Layers, Palette } from 'lucide-react';

export function Sidebar() {
  const selectedComponentId = useEditorStore((s) => s.selectedComponentId);

  return (
    <div className="flex h-full flex-col border-r bg-background">
      <Tabs defaultValue="structure" className="flex h-full flex-col">
        <div className="border-b px-2 pt-2">
          <TabsList className="w-full">
            <TabsTrigger value="structure" className="flex-1 gap-1.5 text-xs">
              <Layers className="h-3.5 w-3.5" />
              Estructura
            </TabsTrigger>
            <TabsTrigger value="styles" className="flex-1 gap-1.5 text-xs">
              <Palette className="h-3.5 w-3.5" />
              Estilos
            </TabsTrigger>
            <TabsTrigger value="config" className="flex-1 gap-1.5 text-xs">
              <Settings className="h-3.5 w-3.5" />
              Config
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="structure" className="flex-1 overflow-hidden mt-0">
          <ScrollArea className="h-full">
            <div className="p-2">
              <SectionList />
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="styles" className="flex-1 overflow-hidden mt-0">
          <ScrollArea className="h-full">
            <div className="p-4">
              {selectedComponentId ? (
                <ComponentEditor componentId={selectedComponentId} />
              ) : (
                <p className="text-sm text-muted-foreground text-center py-8">
                  Selecciona un componente para editar sus estilos
                </p>
              )}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="config" className="flex-1 overflow-hidden mt-0">
          <ScrollArea className="h-full">
            <div className="p-4">
              <p className="text-sm text-muted-foreground text-center py-8">
                Configuración global del tenant
              </p>
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
}
