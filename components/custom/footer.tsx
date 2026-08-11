export function Footer() {
  return (
    <footer
      className="h-16 mt-20"
    >
      <p className="font-inter text-xs text-center">
        &copy; {new Date().getFullYear()} pixelbridge
      </p>
    </footer>
  );
}