import { useEditorStore } from "@/store/editorStore";
import { useShallow } from "zustand/react/shallow";

export const useTenant = () => useEditorStore((state) => state.tenant);

export const useSelectedSection = () =>
  useEditorStore((state) => state.selectedSectionId);

export const useSelectedComponent = () =>
  useEditorStore((state) => state.selectedComponentId);

export const useIsDirty = () => useEditorStore((state) => state.isDirty);

export const usePreviewUrl = () => useEditorStore((state) => state.previewUrl);

export const useExpandedSections = () =>
  useEditorStore((state) => state.expandedSections);

export const useEditorActions = () =>
  useEditorStore(
    useShallow((state) => ({
      setTenant: state.setTenant,
      selectSection: state.selectSection,
      selectComponent: state.selectComponent,
      toggleSectionExpanded: state.toggleSectionExpanded,
      updateComponentValue: state.updateComponentValue,
      updateComponentVisibility: state.updateComponentVisibility,
      updateSectionVisibility: state.updateSectionVisibility,
      updateSectionOrder: state.updateSectionOrder,
      setPreviewUrl: state.setPreviewUrl,
      updateTheme: state.updateTheme,
      updateSEO: state.updateSEO,
      updateBranding: state.updateBranding,
      updateContact: state.updateContact,
      updateTenantInfo: state.updateTenantInfo,
      resetChanges: state.resetChanges,
      saveChanges: state.saveChanges,
    })),
  );
