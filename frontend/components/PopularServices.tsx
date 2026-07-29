import Image from "next/image";

const services = [
  {
    name: "Blinkit",
    logo: "/logos/blinkit.svg",
    url: "https://blinkit.com",
  },
  {
    name: "Zepto",
    logo: "/logos/zepto.svg",
    url: "https://www.zeptonow.com",
  },
  {
    name: "Instamart",
    logo: "/logos/instamart.svg",
    url: "https://www.swiggy.com/instamart",
  },
  {
    name: "BigBasket",
    logo: "/logos/bigbasket.svg",
    url: "https://www.bigbasket.com",
  },
  {
    name: "JioMart",
    logo: "/logos/jiomart.svg",
    url: "https://www.jiomart.com",
  },
  {
    name: "Dunzo",
    logo: "/logos/dunzo.svg",
    url: "https://www.dunzo.com",
  },
];

export default function PopularServices() {
  return (
    <section className="max-w-6xl mx-auto py-14 px-6">
      <h2 className="text-3xl font-bold text-center mb-10">
        Popular Delivery Apps
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {services.map((service) => (
          <a
            key={service.name}
            href={service.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-5 flex flex-col items-center"
          >
            <Image
              src={service.logo}
              alt={service.name}
              width={70}
              height={70}
              className="object-contain h-16"
            />

            <p className="mt-4 font-semibold text-center">
              {service.name}
            </p>
          </a>
        ))}
      </div>
    </section>
  );
}