import Hero from '../components/Hero';
import About from '../components/About';
import Divisions from '../components/Divisions';
import Activities from '../components/Activities';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <main className="flex flex-col">
      <Hero />
      <About />
      <Divisions />
      <Activities />
      <Contact />
      <Footer />
    </main>
  );
}
