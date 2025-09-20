import Hero from '../components/Hero';
import About from '../components/About';
import VisionMissionPurpose from '../components/VisionMissionPurpose';
import Divisions from '../components/Divisions';
import Activities from '../components/Activities';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <main className="flex flex-col">
      <Hero />
      <About />
      <VisionMissionPurpose />
      <Divisions />
      <Activities />
      <Contact />
      <Footer />
    </main>
  );
}
