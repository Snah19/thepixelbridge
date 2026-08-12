"use client";

import { ArrowDownToLine, Trash, X, ImageOff, Broom, FolderDown } from "lucide-react";
import { FormatsPopover } from "./formats-popover";
import { Wrapper } from "./wrapper";
import { formats } from "@/constants/formats";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DropZone } from "./drop-zone";
import { useDragAndDrop } from "@/hooks/use-drag-and-drop";
import { useImageConverter } from "@/hooks/use-image-converter";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { converterConfigs } from "@/constants/converter-configs";
import JSZip from "jszip";

interface Props {
  from?: string;
  to?: string;
};

export function ConverterPage(props: Props) {
  const router = useRouter();

  const [from, setFrom] = useState<string | undefined>(props.from);
  const [to, setTo] = useState<string | undefined>(props.to);

  const [previewUrl, setPreviewUrl] = useState<string | undefined>(undefined);

  const converterConfig = from && to ? converterConfigs[`${from}-to-${to}`] : undefined;

  const {
    imageInfoList,
    total,
    convert,
    update,
    remove,
    clear,
  } = useImageConverter(converterConfig);

  const { isDragging, dragProps } = useDragAndDrop((files: FileList) => {
    convert(files);
  });

  useEffect(() => {
    if (from && to) {
      router.push(`/${from}-to-${to}`);
    }
  }, [from, to]);
  
  return (
    <>
      <Wrapper className="flex flex-col md:flex-row justify-between items-center gap-10 py-20 px-4">
        <div className="max-w-150 text-center md:text-start">
          <h1 className="mb-5 font-inter text-5xl font-bold">
            {!from && "Convert Your Images"}
            {from && !to && `${from.toUpperCase()} Converter`}
            {!from && to && `${to.toUpperCase()} Converter`}
            {from && to && `Convert ${from.toUpperCase()} To ${to.toUpperCase()}`}
          </h1>
          <p className="text-sm text-gray-500">
            <span className="text-black dark:text-white">thepixelbridge</span> is an image formats converter tool developed by <Link className="text-black dark:text-white underline" href="https://veasnabol.vercel.app/" target="_blank">veasna bol</Link> as a personal hobby project. Currently it can convert images from formats like .webp, .png, .svg, etc. to .jpg with blazing fast speed.
          </p>
        </div>

        <div className="flex items-center gap-x-10">
          <FormatsPopover
            formats={formats.filter((f) => f !== to)}
            value={from}
            align="start"
            onChange={(value) => {
              setFrom(value);
            }}
          />

          <p className="font-jetbrains-mono text-xs text-amber-800 dark:text-white">
            To
          </p>

          <FormatsPopover
            formats={formats.filter((f) => f !== from)}
            value={to}
            align="end"
            onChange={(value) => {
              setTo(value);
            }}
          />
        </div>
      </Wrapper>

      <Wrapper className="px-4">
        <DropZone
          from={from}
          isDragging={isDragging}
          disabled={!from || !to}
          dragProps={dragProps}
          onChange={(files) => {
            if (files) {
              try {
                convert(files);

              }
              catch {

              }
            }
          }}
        />

        {imageInfoList.length > 0 && (
          <ul className="mt-10 border-t border-l border-gray-500">
            {imageInfoList.map((i) => (
              <li
                className="flex justify-between items-center gap-x-4 p-1 border-b border-r border-gray-500"
                key={i.id}
              >
                <div className="flex items-center gap-x-2">
                  <div
                    className={cn(
                      "flex justify-center items-center w-14 h-10 rounded-md cursor-pointer bg-muted",
                      i.errorMessage && "cursor-not-allowed",
                    )}
                    onClick={() => {
                      setPreviewUrl(i.blobURL);
                    }}  
                  >
                    {!i.isConverting && !i.errorMessage && (
                      <img
                        src={i.blobURL}
                        alt="preview"
                        className="w-full h-full object-contain"
                      />
                    )}

                    {i.errorMessage && (
                      <ImageOff />
                    )}
                  </div>

                  {!i.errorMessage && (
                    <div className="flex items-center gap-1 max-w-xs">
                      <input
                        type="text"
                        value={i.customName}
                        disabled={i.isConverting}
                        onChange={(e) => {
                          update(i.id, { customName: e.target.value });
                        }}
                        className="w-full text-sm bg-transparent border-b hover:border-border focus:border-foreground focus:outline-none py-0.5 text-foreground disabled:opacity-40 transition-colors"
                      />
                      <span className="text-xs text-muted-foreground shrink-0">
                        .jpg
                      </span>
                    </div>
                  )}

                  {i.errorMessage && (
                    <p className="text-xs">{i.errorMessage}</p>
                  )}
                </div>

                <div className="flex gap-x-1">
                  {!i.errorMessage && (
                    <Button
                      className="p-1 ring-1 ring-black dark:ring-white border-none rounded-none cursor-pointer hover:bg-green-700 hover:text-white"
                      onClick={() => {
                        if (!i.blobURL || i.errorMessage) {
                          return;
                        }
                        
                        const link = document.createElement("a");
                        link.href = i.blobURL;
                        link.download = `${i.customName || "converted"}.jpg`;
                        link.click();
                      }}
                    >
                      <ArrowDownToLine className="size-4 group-hover:text-amber-800" />
                    </Button>
                  )}

                  <Button
                    className="p-1 ring-1 ring-black dark:ring-white border-none rounded-none cursor-pointer hover:bg-red-700 hover:text-white"
                    onClick={() => {
                      remove(i.id);
                    }}
                  >
                    <Trash className="size-4" />
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}

        {total > 0 && (
          <div className="flex justify-end gap-x-4 mt-4">
            <Button
              className="flex gap-x-2 px-10 ring ring-black dark:ring-white border-none rounded-none cursor-pointer hover:bg-red-700 hover:text-white"
              onClick={() => {
                clear();
              }}
            >
              <span>
                Clear
              </span>
              <Broom />
            </Button>

            <Button
              className="flex gap-x-2 px-10 ring ring-black dark:ring-white border-none rounded-none cursor-pointer hover:bg-green-700 hover:text-white"
              onClick={async () => {
                const readyFiles = imageInfoList.filter((f) => f.blobData && !f.errorMessage);
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
              }}
            >
              <span>
                Zip({total})
              </span>
              <FolderDown />
            </Button>
          </div>
        )}
      </Wrapper>

      {previewUrl && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => {
            setPreviewUrl(undefined);
          }}
        >
          <div
            className="relative bg-background rounded-2xl p-2 shadow-2xl max-w-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              onClick={() => {
                setPreviewUrl(undefined);
              }}
              className="absolute top-4 right-4 text-white/80 hover:text-white text-xs flex items-center gap-1 cursor-pointer transition-colors"
            >
              <X size={13} />
            </Button>
            
            <img
              src={previewUrl}
              alt="Enlarged preview"
              className="max-w-full max-h-[80vh] object-contain rounded-xl"
            />
          </div>
        </div>
      )}
    </>
  );
}