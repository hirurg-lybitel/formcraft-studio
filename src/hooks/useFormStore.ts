import { useState, useEffect, useCallback } from 'react';
import type { FormData } from '@/types/form';

const STORAGE_KEY = 'form-editor-saved-forms';

function loadFromStorage(): FormData[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveToStorage(forms: FormData[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(forms));
}

export function useFormStore() {
  const [savedForms, setSavedForms] = useState<FormData[]>(loadFromStorage);
  const [currentForm, setCurrentForm] = useState<FormData | null>(null);
  const [viewingFormId, setViewingFormId] = useState<string | null>(null);

  useEffect(() => {
    saveToStorage(savedForms);
  }, [savedForms]);

  const saveForm = useCallback((form: FormData) => {
    setSavedForms(prev => {
      const idx = prev.findIndex(f => f.id === form.id);
      const updated = { ...form, updatedAt: Date.now() };
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = updated;
        return next;
      }
      return [...prev, updated];
    });
    setCurrentForm(null);
  }, []);

  const deleteForm = useCallback((id: string) => {
    setSavedForms(prev => prev.filter(f => f.id !== id));
    if (viewingFormId === id) setViewingFormId(null);
  }, [viewingFormId]);

  const editForm = useCallback((id: string) => {
    const form = savedForms.find(f => f.id === id);
    if (form) {
      setCurrentForm({ ...form });
      setViewingFormId(null);
    }
  }, [savedForms]);

  const viewForm = useCallback((id: string) => {
    setViewingFormId(id);
    setCurrentForm(null);
  }, []);

  const startNew = useCallback((form: FormData) => {
    setCurrentForm(form);
    setViewingFormId(null);
  }, []);

  const goHome = useCallback(() => {
    setCurrentForm(null);
    setViewingFormId(null);
  }, []);

  return {
    savedForms,
    currentForm,
    setCurrentForm,
    viewingFormId,
    saveForm,
    deleteForm,
    editForm,
    viewForm,
    startNew,
    goHome,
  };
}
