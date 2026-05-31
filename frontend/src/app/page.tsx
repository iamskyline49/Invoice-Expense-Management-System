import HeroSection from "./components/HeroSection";
import MainContent from "./components/MainContent";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main>
      <Header />
      <HeroSection />
      <MainContent />
      <Footer />
    </main>
  );
}
