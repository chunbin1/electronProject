import { useEffect } from 'react';

/** 改变title */
export const useDocumentTitle = (name: string) => {
  useEffect(() => {
    document.title = name;
  }, [name]);
};

