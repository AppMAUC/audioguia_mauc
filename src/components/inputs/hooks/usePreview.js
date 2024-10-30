import { useMemo } from 'react';
import { uploads } from '../../../utils/config';

export const usePreview = (file) => {
  return useMemo(() => {
    if (!file) return null;

    if (typeof file === 'object') {
      return file.url;
    }

    return URL.createObjectURL(new Blob(file));
  }, [file]);
};

