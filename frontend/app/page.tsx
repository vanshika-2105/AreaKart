import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SearchBar from "@/components/SearchBar";
import LocationButton from "@/components/LocationButton";

export default function Home() {
  return (
    <main>

      <Navbar />

      <Hero />

      <SearchBar />

      <div className="flex justify-center">

        <LocationButton />

      </div>

    </main>
  );
}