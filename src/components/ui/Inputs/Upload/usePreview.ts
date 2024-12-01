import { useMemo } from "react";


export const usePreview = (file: File | string | BlobPart[]) => {
  return useMemo(() => {
    if (!file) return null;

    if (typeof file === "string") {
      return file;
    }

    return URL.createObjectURL(new Blob(file as BlobPart[]));
  }, [file]);
};
