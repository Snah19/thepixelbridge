export default function NotFoundPage() {
  return (
    <main className="flex flex-col justify-center items-center gap-y-2 min-h-screen">
      <p className="font-jetbrains-mono font-bold text-red-500">404</p>
      <h1 className="font-inter text-5xl font-bold">
        This conversion type is not supported
      </h1>
      <p className="font-jetbrains-mono text-gray-500">
        Sorry, the page you are looking for could not be found.
      </p>
    </main>
  );
}