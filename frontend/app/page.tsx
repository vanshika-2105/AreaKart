import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import SearchBar from "@/components/SearchBar";
import LocationButton from "@/components/LocationButton";
import PopularServices from "@/components/PopularServices";
import About from "@/components/About";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>

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