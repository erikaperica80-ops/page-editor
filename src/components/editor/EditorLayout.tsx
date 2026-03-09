import { Header } from '@/components/common/Header';
import { Sidebar } from './Sidebar';
import { PreviewFrame } from './PreviewFrame';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { useEditorStore } from '@/store/editorStore';

export function EditorLayout() {
  const tenant = useEditorStore((s) => s.tenant);

  if (!tenant) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-muted-foreground">Cargando editor...</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-background">
      <Header />
      <div className="flex-1 overflow-hidden">
        <ResizablePanelGroup direction="horizontal" className="h-full">
          <ResizablePanel defaultSize={30} minSize={20} maxSize={45}>
            <Sidebar />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={70} minSize={40}>
            <PreviewFrame />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
}
