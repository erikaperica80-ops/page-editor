import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { TenantConfig, Section, ComponentNode, ThemeConfig, SEOConfig, BrandingConfig, ContactConfig } from '@/types/schema';

interface EditorState {
  tenant: TenantConfig | null;
  selectedSectionId: string | null;
  selectedComponentId: string | null;
  expandedSections: string[];
  isDirty: boolean;
  previewUrl: string;
}

interface EditorActions {
  setTenant: (tenant: TenantConfig) => void;
  selectSection: (sectionId: string | null) => void;
  selectComponent: (componentId: string | null) => void;
  toggleSectionExpanded: (sectionId: string) => void;
  updateComponentValue: (componentId: string, value: any) => void;
  updateComponentVisibility: (componentId: string, visible: boolean) => void;
  updateSectionVisibility: (sectionId: string, visible: boolean) => void;
  updateSectionOrder: (sections: Section[]) => void;
  setPreviewUrl: (url: string) => void;
  updateTheme: (theme: Partial<ThemeConfig>) => void;
  updateSEO: (seo: Partial<SEOConfig>) => void;
  updateBranding: (branding: Partial<BrandingConfig>) => void;
  updateContact: (contact: Partial<ContactConfig>) => void;
  updateTenantInfo: (info: { name?: string; domain?: string }) => void;
  resetChanges: () => void;
  saveChanges: () => Promise<void>;
}

type EditorStore = EditorState & EditorActions;

const initialState: EditorState = {
  tenant: null,
  selectedSectionId: null,
  selectedComponentId: null,
  expandedSections: [],
  isDirty: false,
  previewUrl: 'http://localhost:4321',
};

export const useEditorStore = create<EditorStore>()(
  subscribeWithSelector((set, get) => ({
    ...initialState,

    setTenant: (tenant) => set({ tenant, isDirty: false }),

    selectSection: (sectionId) => set({ 
      selectedSectionId: sectionId,
      selectedComponentId: null 
    }),

    selectComponent: (componentId) => set({ selectedComponentId: componentId }),

    toggleSectionExpanded: (sectionId) => {
      const { expandedSections } = get();
      set({
        expandedSections: expandedSections.includes(sectionId)
          ? expandedSections.filter(id => id !== sectionId)
          : [...expandedSections, sectionId]
      });
    },

    updateComponentValue: (componentId, value) => {
      const { tenant } = get();
      if (!tenant) return;

      const updateComponent = (components: ComponentNode[]): ComponentNode[] => {
        return components.map(comp => {
          if (comp.id === componentId) {
            return { ...comp, value };
          }
          if (comp.children) {
            return { ...comp, children: updateComponent(comp.children) };
          }
          return comp;
        });
      };

      const updatedSections = tenant.pageSchema.sections.map(section => ({
        ...section,
        components: updateComponent(section.components)
      }));

      set({
        tenant: {
          ...tenant,
          pageSchema: {
            ...tenant.pageSchema,
            sections: updatedSections
          }
        },
        isDirty: true
      });
    },

    updateComponentVisibility: (componentId, visible) => {
      const { tenant } = get();
      if (!tenant) return;

      const updateComponent = (components: ComponentNode[]): ComponentNode[] => {
        return components.map(comp => {
          if (comp.id === componentId) {
            return { ...comp, visible };
          }
          if (comp.children) {
            return { ...comp, children: updateComponent(comp.children) };
          }
          return comp;
        });
      };

      const updatedSections = tenant.pageSchema.sections.map(section => ({
        ...section,
        components: updateComponent(section.components)
      }));

      set({
        tenant: {
          ...tenant,
          pageSchema: {
            ...tenant.pageSchema,
            sections: updatedSections
          }
        },
        isDirty: true
      });
    },

    updateSectionVisibility: (sectionId, visible) => {
      const { tenant } = get();
      if (!tenant) return;

      const updatedSections = tenant.pageSchema.sections.map(section => 
        section.id === sectionId ? { ...section, visible } : section
      );

      set({
        tenant: {
          ...tenant,
          pageSchema: {
            ...tenant.pageSchema,
            sections: updatedSections
          }
        },
        isDirty: true
      });
    },

    updateSectionOrder: (sections) => {
      const { tenant } = get();
      if (!tenant) return;

      set({
        tenant: {
          ...tenant,
          pageSchema: {
            ...tenant.pageSchema,
            sections
          }
        },
        isDirty: true
      });
    },

    setPreviewUrl: (url) => set({ previewUrl: url }),

    updateTheme: (theme) => {
      const { tenant } = get();
      if (!tenant) return;
      set({ tenant: { ...tenant, theme: { ...tenant.theme, ...theme } }, isDirty: true });
    },

    updateSEO: (seo) => {
      const { tenant } = get();
      if (!tenant) return;
      set({ tenant: { ...tenant, seo: { ...tenant.seo, ...seo } }, isDirty: true });
    },

    updateBranding: (branding) => {
      const { tenant } = get();
      if (!tenant) return;
      set({ tenant: { ...tenant, branding: { ...tenant.branding, ...branding } }, isDirty: true });
    },

    updateContact: (contact) => {
      const { tenant } = get();
      if (!tenant) return;
      set({ tenant: { ...tenant, contact: { ...tenant.contact, ...contact } }, isDirty: true });
    },

    updateTenantInfo: (info) => {
      const { tenant } = get();
      if (!tenant) return;
      set({ tenant: { ...tenant, ...info }, isDirty: true });
    },

    resetChanges: () => set({ isDirty: false }),

    saveChanges: async () => {
      const { tenant } = get();
      if (!tenant) return;
      console.log('Saving:', tenant);
      await new Promise(resolve => setTimeout(resolve, 1000));
      set({ isDirty: false });
    }
  }))
);