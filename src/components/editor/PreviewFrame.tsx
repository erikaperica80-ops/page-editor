import { useState } from 'react';
import { useEditorStore } from '@/store/editorStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Monitor, Tablet, Smartphone, ExternalLink, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';

type ViewportSize = 'desktop' | 'tablet' | 'mobile';

const viewportConfig: Record<ViewportSize, { width: string; label: string }> = {
  desktop: { width: '100%', label: 'Escritorio' },
  tablet: { width: '768px', label: 'Tablet' },
  mobile: { width: '390px', label: 'Móvil' },
};

export function PreviewFrame() {
  const { previewUrl, setPreviewUrl } = useEditorStore();
  const [viewport, setViewport] = useState<ViewportSize>('desktop');
  const [inputUrl, setInputUrl] = useState(previewUrl);
  const [key, setKey] = useState(0);

  const handleUrlChange = (e: React.FormEvent) => {
    e.preventDefault();
    setPreviewUrl(inputUrl);
    setKey((k) => k + 1);
  };

  const handleRefresh = () => {
    setKey((k) => k + 1);
  };

  return (
    <div className="flex h-full flex-col bg-muted/30">
      <div className="flex items-center gap-2 border-b bg-background px-3 py-2">
        <TooltipProvider>
          <div className="flex items-center gap-1">
            {(Object.entries(viewportConfig) as [ViewportSize, { width: string; label: string }][]).map(
              ([size, config]) => (
                <Tooltip key={size}>
                  <TooltipTrigger asChild>
                    <Button
                      variant={viewport === size ? 'default' : 'ghost'}
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setViewport(size)}
                    >
                      {size === 'desktop' && <Monitor className="h-4 w-4" />}
                      {size === 'tablet' && <Tablet className="h-4 w-4" />}
                      {size === 'mobile' && <Smartphone className="h-4 w-4" />}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>{config.label}</TooltipContent>
                </Tooltip>
              )
            )}
          </div>
        </TooltipProvider>

        <form onSubmit={handleUrlChange} className="flex flex-1 items-center gap-2">
          <Input
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            className="h-8 text-xs"
            placeholder="URL de preview..."
          />
        </form>

        <div className="flex items-center gap-1">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleRefresh}>
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Recargar</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => window.open(previewUrl, '_blank')}
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Abrir en nueva pestaña</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      <div className="flex flex-1 items-start justify-center overflow-auto p-4">
        <div
          className={cn('h-full transition-all duration-300', viewport !== 'desktop' && 'shadow-lg')}
          style={{ width: viewportConfig[viewport].width, minHeight: '100%' }}
        >
          <iframe
            key={key}
            src={previewUrl}
            className="h-full w-full rounded-md border bg-white"
            title="Vista previa"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          />
        </div>
      </div>
    </div>
  );
}
