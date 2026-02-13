import { useFormStore } from '@/hooks/useFormStore';
import { Sidebar } from '@/components/editor/Sidebar';
import { TemplateGallery } from '@/components/editor/TemplateGallery';
import { FormEditor } from '@/components/editor/FormEditor';
import { FormPreview } from '@/components/editor/FormPreview';

const Index = () => {
  const store = useFormStore();
  const viewingForm = store.viewingFormId
    ? store.savedForms.find(f => f.id === store.viewingFormId)
    : null;

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <Sidebar
        forms={store.savedForms}
        activeId={store.viewingFormId}
        onView={store.viewForm}
        onEdit={store.editForm}
        onDelete={store.deleteForm}
        onHome={store.goHome}
      />

      {store.currentForm ? (
        <FormEditor
          form={store.currentForm}
          onChange={store.setCurrentForm}
          onSave={store.saveForm}
          onBack={store.goHome}
        />
      ) : viewingForm ? (
        <div className="flex-1 flex flex-col min-h-0">
          <div className="h-12 border-b border-border bg-editor-surface flex items-center px-4">
            <h2 className="text-sm font-semibold text-foreground">{viewingForm.name}</h2>
          </div>
          <div className="flex-1 overflow-auto bg-canvas">
            <FormPreview form={viewingForm} />
          </div>
        </div>
      ) : (
        <TemplateGallery onSelect={store.startNew} />
      )}
    </div>
  );
};

export default Index;
