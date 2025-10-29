import { useState, useEffect, type ReactNode } from 'react';
import { ViewTypeContext } from './ViewTypeContext';

export const ViewTypeProvider = ({ children }: { children: ReactNode }) => {
  const [viewType, setViewType] = useState<'LIST' | 'GRID'>(() => {
    return (localStorage.getItem('viewType') as 'LIST' | 'GRID') || 'LIST';
  });

  useEffect(() => {
    localStorage.setItem('viewType', viewType);
  }, [viewType]);

  return (
    <ViewTypeContext.Provider value={{ viewType, setViewType }}>
      {children}
    </ViewTypeContext.Provider>
  );
};