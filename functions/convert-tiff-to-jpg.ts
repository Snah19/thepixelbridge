import UTIF from "utif2";

export const convertTIFFToJPG = async (file: File): Promise<Blob> => {
  const buffer = await file.arrayBuffer();

  const ifds = UTIF.decode(buffer);
  if (!ifds || ifds.length === 0) {
    throw new Error("Invalid TIFF directory data.");
  }

  UTIF.decodeImage(buffer, ifds[0]);
  const rgba = UTIF.toRGBA8(ifds[0]);

  const width = ifds[0].width;
  const height = ifds[0].height;

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const canvasContext = canvas.getContext("2d");
  if (!canvasContext) {
    throw new Error("Could not initialize canvas graphics viewport.");
  }

  const imageData = canvasContext.createImageData(width, height);
  imageData.data.set(rgba);
  canvasContext.putImageData(imageData, 0, 0);

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