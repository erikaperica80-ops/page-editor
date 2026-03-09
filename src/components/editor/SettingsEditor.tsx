import { useTenant, useEditorActions } from "@/hooks/useEditorSelectors";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { KeywordsInput } from "@/components/ui/keywords-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const robotsOptions = [
  { value: "index, follow", label: "index, follow" },
  { value: "noindex, nofollow", label: "noindex, nofollow" },
  { value: "index, nofollow", label: "index, nofollow" },
  { value: "noindex, follow", label: "noindex, follow" },
];

const languageOptions = [
  { value: "es", label: "Español (es)" },
  { value: "en", label: "English (en)" },
  { value: "fr", label: "Français (fr)" },
  { value: "pt", label: "Português (pt)" },
  { value: "de", label: "Deutsch (de)" },
  { value: "it", label: "Italiano (it)" },
];

export function SettingsEditor() {
  const tenant = useTenant();
  const { updateTenantInfo, updateSEO, updateBranding, updateContact } = useEditorActions();

  if (!tenant) return null;

  return (
    <div className="space-y-6">
      {/* General */}
      <div>
        <h3 className="font-semibold mb-4">General</h3>
        <div className="space-y-3">
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">Nombre</Label>
            <Input
              value={tenant.name}
              onChange={(e) => updateTenantInfo({ name: e.target.value })}
              className="h-8 text-sm"
            />
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">Dominio</Label>
            <Input
              value={tenant.domain}
              onChange={(e) => updateTenantInfo({ domain: e.target.value })}
              className="h-8 text-sm"
            />
          </div>
        </div>
      </div>

      <Separator />

      {/* SEO */}
      <div>
        <h3 className="font-semibold mb-4">SEO</h3>
        <div className="space-y-3">
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">Título</Label>
            <Input
              value={tenant.seo.title}
              onChange={(e) => updateSEO({ title: e.target.value })}
              className="h-8 text-sm"
            />
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">Descripción</Label>
            <Input
              value={tenant.seo.description}
              onChange={(e) => updateSEO({ description: e.target.value })}
              className="h-8 text-sm"
            />
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">Keywords</Label>
            <KeywordsInput
              value={tenant.seo.keywords}
              onChange={(keywords) => updateSEO({ keywords })}
            />
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">OG Título</Label>
            <Input
              value={tenant.seo.ogTitle}
              onChange={(e) => updateSEO({ ogTitle: e.target.value })}
              className="h-8 text-sm"
            />
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">OG Descripción</Label>
            <Input
              value={tenant.seo.ogDescription}
              onChange={(e) => updateSEO({ ogDescription: e.target.value })}
              className="h-8 text-sm"
            />
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">OG Imagen (URL)</Label>
            <Input
              value={tenant.seo.ogImage}
              onChange={(e) => updateSEO({ ogImage: e.target.value })}
              className="h-8 text-sm"
              placeholder="https://..."
            />
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">URL Canónica</Label>
            <Input
              value={tenant.seo.canonicalUrl}
              onChange={(e) => updateSEO({ canonicalUrl: e.target.value })}
              className="h-8 text-sm"
              placeholder="https://..."
            />
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">Robots</Label>
            <Select
              value={tenant.seo.robots}
              onValueChange={(val) => updateSEO({ robots: val })}
            >
              <SelectTrigger className="h-8 text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {robotsOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">Autor</Label>
            <Input
              value={tenant.seo.author}
              onChange={(e) => updateSEO({ author: e.target.value })}
              className="h-8 text-sm"
            />
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">Idioma</Label>
            <Select
              value={tenant.seo.language}
              onValueChange={(val) => updateSEO({ language: val })}
            >
              <SelectTrigger className="h-8 text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {languageOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <Separator />

      {/* Branding */}
      <div>
        <h3 className="font-semibold mb-4">Branding</h3>
        <div className="space-y-3">
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">Logo (URL)</Label>
            <Input
              value={tenant.branding.logo}
              onChange={(e) => updateBranding({ logo: e.target.value })}
              className="h-8 text-sm"
              placeholder="https://..."
            />
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">Favicon (URL)</Label>
            <Input
              value={tenant.branding.favicon}
              onChange={(e) => updateBranding({ favicon: e.target.value })}
              className="h-8 text-sm"
              placeholder="https://..."
            />
          </div>
        </div>
      </div>

      <Separator />

      {/* Contacto */}
      <div>
        <h3 className="font-semibold mb-4">Contacto</h3>
        <div className="space-y-3">
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">Email</Label>
            <Input
              value={tenant.contact.email}
              onChange={(e) => updateContact({ email: e.target.value })}
              className="h-8 text-sm"
              type="email"
            />
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">Teléfono</Label>
            <Input
              value={tenant.contact.phone}
              onChange={(e) => updateContact({ phone: e.target.value })}
              className="h-8 text-sm"
            />
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">WhatsApp</Label>
            <Input
              value={tenant.contact.whatsapp ?? ""}
              onChange={(e) => updateContact({ whatsapp: e.target.value })}
              className="h-8 text-sm"
            />
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">Dirección</Label>
            <Input
              value={tenant.contact.address}
              onChange={(e) => updateContact({ address: e.target.value })}
              className="h-8 text-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
