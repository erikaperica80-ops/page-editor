import { useTenant, useSelectedComponent } from "@/hooks/useEditorSelectors";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SectionList } from "./SectionList";
import { ComponentEditor } from "./ComponentEditor";
import { StylesEditor } from "./StylesEditor";
import { SettingsEditor } from "./SettingsEditor";
import { Layers, Settings, Palette } from "lucide-react";

export function Sidebar() {
  const tenant = useTenant();
  const selectedComponentId = useSelectedComponent();

  if (!tenant) {
    return (
      <div className="h-full flex items-center justify-center p-4 text-muted-foreground">
        Cargando...
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col border-r">
      <Tabs defaultValue="structure" className="flex-1 flex flex-col">
        <TabsList className="w-full justify-start rounded-none border-b px-2">
          <TabsTrigger value="structure" className="gap-2">
            <Layers className="h-4 w-4" />
            Estructura
          </TabsTrigger>
          <TabsTrigger value="styles" className="gap-2">
            <Palette className="h-4 w-4" />
            Estilos
          </TabsTrigger>
          <TabsTrigger value="settings" className="gap-2">
            <Settings className="h-4 w-4" />
            Config
          </TabsTrigger>
        </TabsList>

        <TabsContent value="structure" className="flex-1 m-0">
          <ScrollArea className="h-full">
            <div className="p-4">
              {selectedComponentId ? (
                <ComponentEditor componentId={selectedComponentId} />
              ) : (
                <SectionList />
              )}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="styles" className="flex-1 m-0">
          <ScrollArea className="h-full">
            <div className="p-4">
              <StylesEditor />
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="settings" className="flex-1 m-0">
          <ScrollArea className="h-full">
            <div className="p-4">
              <SettingsEditor />
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
}