import Link from "next/link";
import { Wrapper } from "./wrapper";
import { ThemeButton } from "./theme-button";

export function Header() {
  return (
    <header className="z-50 sticky top-0 border-b border-gray-500 backdrop-blur-md">
      <Wrapper className="flex justify-between items-center h-16 px-4">
        <Link
          className="font-space-grotesk text-2xl font-bold text-amber-700"
          href="/"
        >
          thepixelbridge
        </Link>

        <ThemeButton />
      </Wrapper>
    </header>
  );
}