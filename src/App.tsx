import { useEffect } from "react";
import { PROFILE } from "@/data/profile";
import { Loader } from "@/components/Loader";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { About, Contact, Footer, Skills, Work } from "@/components/Sections";

export default function App() {
  useEffect(() => {
    document.title = `${PROFILE.name} · ${PROFILE.role}`;
  }, []);

  return (
    <>
      <Loader />
      <div className="ambient" aria-hidden="true" />
      <Nav />
      <main>
        <Hero />
        <Work />
        <Skills />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
