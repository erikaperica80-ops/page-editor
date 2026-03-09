import { useEffect } from 'react';
import { EditorLayout } from './components/editor/EditorLayout';
import { useEditorStore } from './store/editorStore';
import tenantsData from './data/tenants.json';
import { TenantConfig } from './types/schema';

function App() {
  const { setTenant } = useEditorStore();

  useEffect(() => {
    const tenants = tenantsData as unknown as TenantConfig[];
    const defaultTenant = tenants.find(t => t.domain === 'default') || tenants[0];
    if (defaultTenant) {
      setTenant(defaultTenant);
    }
  }, [setTenant]);

  return <EditorLayout />;
}

export default App;
