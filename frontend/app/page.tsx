import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import SearchBar from "@/components/SearchBar";
import LocationButton from "@/components/LocationButton";
import PopularServices from "@/components/PopularServices";
import About from "@/components/About";
import Footer from "@/components/Footer";
import ThemeToggle from "@/components/ThemeToggle";

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-slate-800 text-gray-900 dark:text-white transition-colors duration-300 dark:bg-slate-900 dark:text-white">
      <ThemeToggle />

      <Navbar />

      <Hero />

      <Stats />

      <PopularServices />

      <SearchBar />

      <div className="flex justify-center">
        <LocationButton />
      </div>

      <About />

      <Footer />
    </main>
  );
}