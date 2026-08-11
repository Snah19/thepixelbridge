import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface Props {
  className?: string;
  children: ReactNode;
}

export function Wrapper(props: Props) {
  const { className, children } = props;
  return (
    <div className={cn("max-w-300 mx-auto", className)}>
      {children}
    </div>
  );
}