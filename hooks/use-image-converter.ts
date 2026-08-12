"use client";

import { ImageInfo } from "@/types/image-info";
import { useState } from "react";

export type ConverterConfig = {
  mimeType: string;
  extension: string;
  convert: (file: File) => Promise<Blob>;
  invalidMessage?: string;
};

export const useImageConverter = (converterConfig?: ConverterConfig) => {
  const [imageInfoList, setImageInfoList] = useState<ImageInfo[]>([]);

  const update = (id: string, imageInfo: Partial<ImageInfo>) => {
    setImageInfoList((prev) => prev.map((p) => (p.id === id ? { ...p, ...imageInfo } : p)));
  };

  const remove = (id: string) => {
    setImageInfoList((prev) => {
      const target = prev.find((f) => f.id === id);
      if (target?.blobURL) {
        URL.revokeObjectURL(target.blobURL);
      }
      return prev.filter((p) => p.id !== id);
    });
  };

  const clear = () => {
    imageInfoList.forEach((f) => {
      if (f.blobURL) {
        URL.revokeObjectURL(f.blobURL);
      }
    });
    setImageInfoList([]);
  };

  const convert = (files: FileList | File[]) => {
    if (!converterConfig) {
      return;
    }

    const filesList = Array.isArray(files) ? files : Array.from(files);

    const entries = filesList.map((f): { file: File; imageInfo: ImageInfo; isValid: boolean } => {
      const isValid = f.type === converterConfig.mimeType || f.name.endsWith(converterConfig.extension);

      return {
        file: f,
        isValid,
        imageInfo: {
          id: Math.random().toString(36).substring(2, 9),
          originalName: f.name,
          customName: f.name.replace(/\.[^/.]+$/, ""),
          blobURL: "",
          blobData: null,
          isConverting: isValid,
          errorMessage: isValid
            ? ""
            : converterConfig.invalidMessage ?? `Not a valid ${converterConfig.extension} file.`,
        },
      };
    });

    setImageInfoList((prev) => [...prev, ...entries.map((e) => e.imageInfo)]);

    entries.forEach((e) => {
      if (e.isValid) {
        converterConfig
          .convert(e.file)
          .then((blob) => {
            const blobURL = URL.createObjectURL(blob);
            setImageInfoList((prev) =>
              prev.map((p) => (p.id !== e.imageInfo.id ? p : { ...p, blobURL, blobData: blob, isConverting: false })),
            );
          })
          .catch((error: Error) => {
            setImageInfoList((prev) =>
              prev.map((p) =>
                p.id !== e.imageInfo.id ? p : { ...p, isConverting: false, errorMessage: error.message },
              ),
            );
          });
      }
    });
  };

  return {
    imageInfoList,
    total: imageInfoList.filter((f) => f.blobURL && !f.errorMessage).length,
    convert,
    update,
    remove,
    clear,
  };
};