export const convertViaCanvas = async (file: File): Promise<Blob> => {
  const imageBitmap = await createImageBitmap(file);

  const canvas = document.createElement("canvas");
  canvas.width = imageBitmap.width;
  canvas.height = imageBitmap.height;

  const canvasContext = canvas.getContext("2d");
  if (!canvasContext) {
    imageBitmap.close();
    throw new Error("Canvas setup failed.");
  }

  canvasContext.drawImage(imageBitmap, 0, 0);
  imageBitmap.close();

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error("Conversion failed."))),
      "image/jpeg",
      1,
    );
  });
};