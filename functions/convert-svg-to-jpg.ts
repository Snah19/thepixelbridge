export const convertSVGToJPG = async (file: File): Promise<Blob> => {
  const dataUrl = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result;
      if (typeof result !== "string") {
        reject(new Error("Error reading file data."));
        return;
      }
      resolve(result);
    };
    reader.onerror = () => reject(new Error("Error reading file."));
    reader.readAsDataURL(file);
  });

  const img = await new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.onload = () => resolve(image);
    image.onerror = () =>
      reject(new Error("Failed to decode SVG xml payload. The file format might be corrupted."));
    image.src = dataUrl;
  });

  // SVG dimensions can be missing or set to percentages — fall back to a
  // standard high-res boundary if natural size isn't parsed.
  const width = img.naturalWidth || 1200;
  const height = img.naturalHeight || 1200;

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const canvasContext = canvas.getContext("2d");
  if (!canvasContext) {
    throw new Error("Canvas setup failed.");
  }

  // SVGs often have transparent backgrounds; JPEG has no alpha channel,
  // so fill white first or transparent regions turn black.
  canvasContext.fillStyle = "#FFFFFF";
  canvasContext.fillRect(0, 0, width, height);

  canvasContext.drawImage(img, 0, 0, width, height);

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error("Conversion failed."));
          return;
        }
        resolve(blob);
      },
      "image/jpeg",
      1,
    );
  });
};