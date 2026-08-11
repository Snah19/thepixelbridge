"use client";

import { convertWebPToJpg } from "@/functions/convert-webp-to-jpg";
import { ImageInfo } from "@/types/image-info";
import { useState } from "react";

export const useImageConverter = () => {
  const [imageInfoList, setImageInfoList] = useState<ImageInfo[]>([]);
  const [quality, setQuality] = useState(85);

  const update = (id: string, imageInfo: Partial<ImageInfo>) => {
    setImageInfoList((prev) => {
      return prev.map((p) => p.id === id ? { ...p, ...imageInfo } : p);
    });
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
    const filesList = Array.isArray(files) ? files : Array.from(files);

    const entries = filesList.map((f): { file: File; imageInfo: ImageInfo; isValid: boolean } => {
      const isValid = f.type === "image/webp" || f.name.endsWith(".webp");
      
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
          errorMessage: isValid ? "" : "Not a valid .webp file.",
        },
      };
    });

    setImageInfoList((prev) => [...prev, ...entries.map((e) => e.imageInfo)]);

    entries.forEach((e) => {
      if (e.isValid) {
        convertWebPToJpg(e.file, quality)
          .then((blob) => {
            const blobURL = URL.createObjectURL(blob);

            setImageInfoList((prev) => prev.map((p) => {
              if (p.id !== e.imageInfo.id) {
                return p;
              }

              return {
                ...p,
                blobURL,
                blobData: blob,
                isConverting: false,
              };
            }));
          })
          .catch((error: Error) => {
            setImageInfoList((prev) => prev.map((p) => {
              if (p.id !== e.imageInfo.id) {
                return p;
              }

              return {
                ...p,
              isConverting: false,
              errorMessage: error.message,
              };
            }));
          });
      }
    });
  };

  return {
    imageInfoList,
    quality,
    total: imageInfoList.filter((f) => f.blobURL && !f.errorMessage).length,
    setQuality,
    convert,
    update,
    remove,
    clear,
  };
};