import { useState, useCallback, useRef, useEffect } from 'react';
import type { FormData } from '@/types/form';

const MAX_HISTORY = 50;

export function useFormHistory(initial: FormData, onSync: (form: FormData) => void) {
  const [history, setHistory] = useState<FormData[]>([initial]);
  const [index, setIndex] = useState(0);
  const initialSnapshot = useRef(JSON.stringify(initial));

  const current = history[index];

  const push = useCallback((form: FormData) => {
    setHistory(prev => {
      const next = [...prev.slice(0, index + 1), form];
      if (next.length > MAX_HISTORY) next.shift();
      return next;
    });
    setIndex(prev => Math.min(prev + 1, MAX_HISTORY - 1));
  }, [index]);

  const undo = useCallback(() => {
    if (index > 0) {
      const newIdx = index - 1;
      setIndex(newIdx);
      onSync(history[newIdx]);
    }
  }, [index, history, onSync]);

  const redo = useCallback(() => {
    if (index < history.length - 1) {
      const newIdx = index + 1;
      setIndex(newIdx);
      onSync(history[newIdx]);
    }
  }, [index, history, onSync]);

  const canUndo = index > 0;
  const canRedo = index < history.length - 1;

  const hasChanges = JSON.stringify(current) !== initialSnapshot.current;

  return { current, push, undo, redo, canUndo, canRedo, hasChanges };
}
