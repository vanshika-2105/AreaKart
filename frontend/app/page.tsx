import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import SearchBar from "@/components/SearchBar";
import LocationButton from "@/components/LocationButton";
import PopularServices from "@/components/PopularServices";
import About from "@/components/About";
import Footer from "@/components/Footer";
import ThemeToggle from "@/components/ThemeToggle";

interface Props {
  searchParams: Promise<{
    pincode?: string;
  }>;
}

export default async function Home({
  searchParams,
}: Props) {
  const params = await searchParams;

  return (
    <main>
      <ThemeToggle />

      <Navbar />

      <Hero />

      <Stats />

      <PopularServices />

      <SearchBar
        initialPincode={params.pincode ?? ""}
      />

      <div className="flex justify-center">
        <LocationButton />
      </div>

      <About />

      <Footer />
    </main>
  );
}