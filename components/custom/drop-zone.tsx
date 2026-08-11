import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { CloudUpload, MousePointer2 } from "lucide-react";
import { DragEvent, useRef } from "react";

interface Props {
  from?: string;
  isDragging: boolean;
  disabled?: boolean;
  dragProps: {
    onDragOver: (e: DragEvent<HTMLDivElement>) => void;
    onDragLeave: () => void;
    onDrop: (e: DragEvent<HTMLDivElement>) => void;
  },
  onChange: (files: File[]) => void;
};

export function DropZone(props: Props) {
  const {
    from,
    isDragging,
    disabled,
    dragProps,
    onChange,
  } = props;

  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div
      {...dragProps}
      onClick={() => fileInputRef.current?.click()}
      className={cn(
        "flex justify-center items-center h-37 mt-10 border-2 border-dashed p-10 text-center",
        !disabled && "cursor-pointer transition-all duration-150",
        isDragging
          ? "border-primary bg-primary/5 scale-[0.99]"
          : "border-border hover:border-muted-foreground/40 hover:bg-muted/30",
      )}
    >
      <Input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        multiple
        onChange={(e) => {
          const files = e.target.files;

          if (files) {
            try {
              onChange(Array.isArray(files) ? files : Array.from(files));
            }
            catch {
              throw new Error();
            }
          }
        }}
        className="hidden"
        disabled={disabled}
      />
        {!disabled && (
          <div>
            <CloudUpload
              className={cn(
                "mx-auto mb-3 transition-colors",
                isDragging ? "text-primary" : "text-muted-foreground/50",
              )}
              size={32}
              strokeWidth={1.5}
            />
            <p className="text-sm text-muted-foreground">
              Drag and drop, browse, or paste your <span className="font-bold">.{from}</span> files here
            </p>
          </div>
        )}

        {disabled && (
          <div>
            <MousePointer2
              className={cn(
                "mx-auto mb-3 transition-colors",
              )}
              size={32}
              strokeWidth={1.5}             
            />
            <p className="text-sm text-muted-foreground">
              Select input and output formats above to get started
            </p>
          </div>
        )}
    </div>
  );
}