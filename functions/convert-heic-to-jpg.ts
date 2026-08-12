import { heicTo } from "heic-to";

export const convertHEICToJPG = async (file: File): Promise<Blob> => {
  try {
    return await heicTo({
      blob: file,
      type: "image/jpeg",
      quality: 1,
    });
  } catch (err) {
    throw new Error(
      err instanceof Error ? err.message : "Unsupported internal encoding.",
    );
  }
};