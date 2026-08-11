export type ImageInfo = {
  id: string;
  originalName: string;
  customName: string;
  blobURL: string;
  blobData: Blob | null;
  isConverting: boolean;
  errorMessage: string;
}