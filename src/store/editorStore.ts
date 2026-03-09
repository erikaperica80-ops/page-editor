import { create } from 'zustand';
import { TenantConfig, Section, ComponentNode } from '@/types/schema';

interface EditorState {
  tenant: TenantConfig | null;
  selectedSectionId: string | null;
  selectedComponentId: string | null;
  expandedSections: string[];
  isDirty: boolean;
  previewUrl: string;

  setTenant: (tenant: TenantConfig) => void;
  selectSection: (sectionId: string | null) => void;
  selectComponent: (componentId: string | null) => void;
  toggleSectionExpanded: (sectionId: string) => void;

  updateComponentValue: (componentId: string, value: unknown) => void;
  updateComponentVisibility: (componentId: string, visible: boolean) => void;
  updateSectionVisibility: (sectionId: string, visible: boolean) => void;
  updateSectionOrder: (sections: Section[]) => void;

  setPreviewUrl: (url: string) => void;
  resetChanges: () => void;
  saveChanges: () => Promise<void>;
}

export const useEditorStore = create<EditorState>((set, get) => ({
  tenant: null,
  selectedSectionId: null,
  selectedComponentId: null,
  expandedSections: [],
  isDirty: false,
  previewUrl: 'http://localhost:4321',

  setTenant: (tenant) => set({ tenant, isDirty: false }),

  selectSection: (sectionId) => set({
    selectedSectionId: sectionId,
    selectedComponentId: null
  }),

  selectComponent: (componentId) => set({ selectedComponentId: componentId }),

  toggleSectionExpanded: (sectionId) => set((state) => ({
    expandedSections: state.expandedSections.includes(sectionId)
      ? state.expandedSections.filter(id => id !== sectionId)
      : [...state.expandedSections, sectionId]
  })),

  updateComponentValue: (componentId, value) => set((state) => {
    if (!state.tenant) return state;

    const updateComponent = (components: ComponentNode[]): ComponentNode[] => {
      return components.map(comp => {
        if (comp.id === componentId) {
          return { ...comp, value: value as ComponentNode['value'] };
        }
        if (comp.children) {
          return { ...comp, children: updateComponent(comp.children) };
        }
        return comp;
      });
    };

    const updatedSections = state.tenant.pageSchema.sections.map(section => ({
      ...section,
      components: updateComponent(section.components)
    }));

    return {
      tenant: {
        ...state.tenant,
        pageSchema: {
          ...state.tenant.pageSchema,
          sections: updatedSections
        }
      },
      isDirty: true
    };
  }),

  updateComponentVisibility: (componentId, visible) => set((state) => {
    if (!state.tenant) return state;

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

    const updatedSections = state.tenant.pageSchema.sections.map(section => ({
      ...section,
      components: updateComponent(section.components)
    }));

    return {
      tenant: {
        ...state.tenant,
        pageSchema: {
          ...state.tenant.pageSchema,
          sections: updatedSections
        }
      },
      isDirty: true
    };
  }),

  updateSectionVisibility: (sectionId, visible) => set((state) => {
    if (!state.tenant) return state;

    const updatedSections = state.tenant.pageSchema.sections.map(section =>
      section.id === sectionId ? { ...section, visible } : section
    );

    return {
      tenant: {
        ...state.tenant,
        pageSchema: {
          ...state.tenant.pageSchema,
          sections: updatedSections
        }
      },
      isDirty: true
    };
  }),

  updateSectionOrder: (sections) => set((state) => {
    if (!state.tenant) return state;

    return {
      tenant: {
        ...state.tenant,
        pageSchema: {
          ...state.tenant.pageSchema,
          sections
        }
      },
      isDirty: true
    };
  }),

  setPreviewUrl: (url) => set({ previewUrl: url }),

  resetChanges: () => set((_state) => ({
    isDirty: false
  })),

  saveChanges: async () => {
    const { tenant } = get();
    if (!tenant) return;
    console.log('Saving:', tenant);
    await new Promise(resolve => setTimeout(resolve, 1000));
    set({ isDirty: false });
  }
}));
