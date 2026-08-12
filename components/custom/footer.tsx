export function Footer() {
  return (
    <footer
      className="flex justify-center items-center h-16 mt-20"
    >
      <p className="font-inter text-xs text-center">
        &copy; {new Date().getFullYear()} thepixelbridge
      </p>
    </footer>
  );
}