import { convertWEBPToJPG } from "@/functions/convert-webp-to-jpg";
import { convertAVIFToJPG } from "@/functions/convert-avif-to-jpg";
import { ConverterConfig } from "@/hooks/use-image-converter";
import { convertHEICToJPG } from "@/functions/convert-heic-to-jpg";
import { convertBMPToJPG } from "@/functions/convert-bmp-to-jpg";
import { convertJFIFToJPG } from "@/functions/convert-jfif-to-jpg";
import { convertPNGToJPG } from "@/functions/convert-png-to-jpg";
import { convertSVGToJPG } from "@/functions/convert-svg-to-jpg";
import { convertTIFFToJPG } from "@/functions/convert-tiff-to-jpg";

export const converterConfigs: Record<string, ConverterConfig> = {
  "webp-to-jpg": {
    mimeType: "image/webp",
    extension: ".webp",
    convert: convertWEBPToJPG,
  },
  "avif-to-jpg": {
    mimeType: "image/avif",
    extension: ".avif",
    convert: convertAVIFToJPG,
  },
  "heic-to-jpg": {
    mimeType: "image/heic",
    extension: ".heic",
    convert: convertHEICToJPG,
    invalidMessage: "Not a valid .heic or .heif file.",
  },
  "bmp-to-jpg": {
    mimeType: "image/bmp",
    extension: ".bmp",
    convert: convertBMPToJPG,
    invalidMessage: "Not a valid .bmp bitmap file.",
  },
  "jfif-to-jpg": {
    mimeType: "image/jpeg",
    extension: ".jfif",
    convert: convertJFIFToJPG,
    invalidMessage: "Not a valid .jfif image file.",
  },
  "png-to-jpg": {
    mimeType: "image/png",
    extension: ".png",
    convert: convertPNGToJPG,
    invalidMessage: "Not a valid .png image file.",
  },
  "svg-to-jpg": {
    mimeType: "image/svg+xml",
    extension: ".svg",
    convert: convertSVGToJPG,
    invalidMessage: "Not a valid .svg vector file.",
  },
  "tiff-to-jpg": {
    mimeType: "image/tiff",
    extension: ".tiff",
    convert: convertTIFFToJPG,
    invalidMessage: "Not a valid .tiff or .tif image file.",
  },
};