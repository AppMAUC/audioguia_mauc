import { useMemo } from 'react';
import { uploads } from '../../../utils/config';

export const usePreview = (file, existingUrl) => {
  return useMemo(() => {
    if (!file) return null;

    if (typeof file === 'string') {
      return `${uploads}/${existingUrl}/${file}`;
    }

    return URL.createObjectURL(new Blob(file));
  }, [file, existingUrl]);
};

