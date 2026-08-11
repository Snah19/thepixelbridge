"use client"

import { Button } from "@/components/ui/button";
import { Moon, Sun, Loader } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeButton() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button
        className="flex justify-center items-center size-9 rounded-none cursor-pointer"
      >
        <Loader className="size-5 text-emerald-800 dark:text-white animate-spin" />
      </Button>
    );
  }

  return (
    <Button
      aria-label="Toggle theme"
      className="flex justify-center items-center size-9 rounded-full cursor-pointer hover:bg-amber-800/10"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      {resolvedTheme === "dark" ? (
        <Moon className="size-5 text-white" />
      ) : (
        <Sun className="size-5 text-black" />
      )}
    </Button>
  );
}