import { Navbar } from "@/components/site/navbar";
import { IntroVaso } from "@/components/site/intro-vaso";
import { Marquee } from "@/components/site/marquee";
import { QuienesSomos } from "@/components/site/quienes-somos";
import { Experiencia } from "@/components/site/experiencia";
import { Galeria } from "@/components/site/galeria";
import { Franquicia } from "@/components/site/franquicia";
import { Footer } from "@/components/site/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <IntroVaso />
        <Marquee />
        <QuienesSomos />
        <Experiencia />
        <Galeria />
        <Franquicia />
      </main>
      <Footer />
    </>
  );
}
