import { ConverterPage } from "@/components/custom/converter-page";

export default function PNGToJPG() {
  return (
    <main>
      <ConverterPage
        from="png"
        to="jpg"
      />
    </main>
  );
}