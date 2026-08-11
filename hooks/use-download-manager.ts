"use client";

import { ImageInfo } from "@/types/image-info";
import JSZip from "jszip";

const downloadAllAsZip = async (imageInfo: ImageInfo[]) => {
  const readyFiles = imageInfo.filter((f) => f.blobData && !f.errorMessage);
  if (!readyFiles.length) {
    return;
  }

  const zip = new JSZip();
  readyFiles.forEach((f) => {
    zip.file(`${f.customName || "converted"}.jpg`, f.blobData!);
  });

  try {
    const content = await zip.generateAsync({ type: "blob" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(content);
    link.download = "converted-images.zip";
    link.click();
    URL.revokeObjectURL(link.href);
  }
  catch {
    throw new Error("Failed to create ZIP archive.");
  }
};

const downloadSingle = (imageInfo: ImageInfo) => {
  if (!imageInfo.blobURL || imageInfo.errorMessage) {
    return;
  }
  
  const link = document.createElement("a");
  link.href = imageInfo.blobURL;
  link.download = `${imageInfo.customName || "converted"}.jpg`;
  link.click();
};

export const useDownloadManager = () => {

  return { downloadAllAsZip, downloadSingle };
}