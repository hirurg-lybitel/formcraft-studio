import { createContext, useContext, useState, useCallback, useMemo } from 'react';
import type { ComputedVariable } from '@/types/form';

interface PreviewRuntime {
  /** Generic key-value store shared across all forms */
  variables: Record<string, any>;
  setVariable: (name: string, value: any) => void;
  getVariable: (name: string) => any;

  /** Interpolate {{varName}} in text */
  interpolate: (text: string) => string;

  /** Push an item to a list variable */
  pushToList: (listName: string, item: any) => void;

  /** Clear/delete a variable */
  clearVariable: (name: string) => void;
}

const PreviewRuntimeContext = createContext<PreviewRuntime | null>(null);

export function usePreviewRuntime() {
  return useContext(PreviewRuntimeContext);
}

/** Interpolate {{varName}} patterns in a string using the variables store */
function interpolateText(text: string, variables: Record<string, any>): string {
  return text.replace(/\{\{(\w+)\}\}/g, (_, key) => {
    const val = variables[key];
    if (val === undefined || val === null) return `{{${key}}}`;
    return String(val);
  });
}

/** Evaluate computed variable expressions */
function evaluateExpression(expr: string, vars: Record<string, any>): any {
  // sum(listVar.field)
  const sumSingle = expr.match(/^sum\((\w+)\.(\w+)\)$/);
  if (sumSingle) {
    const list = vars[sumSingle[1]];
    if (!Array.isArray(list)) return 0;
    return list.reduce((s, item) => s + (Number(item[sumSingle[2]]) || 0), 0);
  }

  // sum(listVar.field1 * listVar.field2) — same list
  const sumProduct = expr.match(/^sum\((\w+)\.(\w+)\s*\*\s*\w+\.(\w+)\)$/);
  if (sumProduct) {
    const list = vars[sumProduct[1]];
    if (!Array.isArray(list)) return 0;
    return list.reduce((s, item) => s + (Number(item[sumProduct[2]]) || 0) * (Number(item[sumProduct[3]]) || 0), 0);
  }

  // count(listVar)
  const countMatch = expr.match(/^count\((\w+)\)$/);
  if (countMatch) {
    const list = vars[countMatch[1]];
    return Array.isArray(list) ? list.length : 0;
  }

  return undefined;
}

interface ProviderProps {
  children: React.ReactNode;
  computedVariables?: ComputedVariable[];
}

export function PreviewRuntimeProvider({ children, computedVariables = [] }: ProviderProps) {
  const [variables, setVariables] = useState<Record<string, any>>({});

  const setVariable = useCallback((name: string, value: any) => {
    setVariables(prev => ({ ...prev, [name]: value }));
  }, []);

  const getVariable = useCallback((name: string) => variables[name], [variables]);

  const pushToList = useCallback((listName: string, item: any) => {
    setVariables(prev => {
      const existing = Array.isArray(prev[listName]) ? prev[listName] : [];
      return { ...prev, [listName]: [...existing, item] };
    });
  }, []);

  const clearVariable = useCallback((name: string) => {
    setVariables(prev => {
      const next = { ...prev };
      delete next[name];
      return next;
    });
  }, []);

  // Evaluate computed variables on top of base variables
  const allVariables = useMemo(() => {
    const computed: Record<string, any> = {};
    for (const cv of computedVariables) {
      const result = evaluateExpression(cv.expression, { ...variables, ...computed });
      if (result !== undefined) {
        computed[cv.name] = result;
      }
    }
    return { ...variables, ...computed };
  }, [variables, computedVariables]);

  const interpolate = useCallback((text: string) => {
    return interpolateText(text, allVariables);
  }, [allVariables]);

  return (
    <PreviewRuntimeContext.Provider value={{
      variables: allVariables,
      setVariable,
      getVariable,
      interpolate,
      pushToList,
      clearVariable,
    }}>
      {children}
    </PreviewRuntimeContext.Provider>
  );
}
