import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ChevronDown, FileImage } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface Props {
  formats: string[];
  value?: string;
  align?: "start" | "center" | "end";
  onChange: (value: string) => void;
}

export function FormatsPopover(props: Props) {
  const { formats, value, align, onChange } = props;
  const [open, setOpen] = useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger render={(
        <Button
          className="relative flex flex-col gap-y-2 py-5 px-8 font-space-grotesk rounded-none cursor-pointer bg-amber-800 text-white"
          onClick={() => {
            setOpen(true);
          }}
        >
          <FileImage className="size-10" />
          <p className="text-xs text-center uppercase">
            {value || "Any"}
          </p>

          <ChevronDown className="absolute bottom-1 right-1" />
        </Button>
      )} />
      <PopoverContent className="w-60 border-0 rounded-none ring-1 bg-white text-black dark:bg-black dark:text-white" align={align}>
        <ul className="grid grid-cols-2 gap-2">
          {formats.map((f) => (
            <li key={f}>
              <Button
                className={
                  cn("w-full border-none rounded-none uppercase cursor-pointer hover:bg-amber-800 hover:text-white",
                    f === value && "underline",
                  )
                }
                onClick={() => {
                  setOpen(false);
                  onChange(f);
                }}
              >
                {f}
              </Button>
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  );
}