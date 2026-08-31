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
    <section className="mx-auto max-w-6xl bg-white dark:bg-slate-800 px-6 py-14 transition-colors duration-300 dark:bg-slate-900">

      <h2 className="mb-10 text-center text-3xl font-bold text-gray-900 dark:text-white">
        Popular Delivery Apps
      </h2>

      <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
        {services.map((service) => (
          <a
            key={service.name}
            href={service.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center rounded-2xl border border-gray-200 bg-white p-5 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-700 dark:bg-slate-800"
          >
            <Image
              src={service.logo}
              alt={service.name}
              width={70}
              height={70}
              className="h-16 object-contain"
            />

            <p className="mt-4 text-center font-semibold text-gray-900 dark:text-white">
              {service.name}
            </p>
          </a>
        ))}
      </div>

    </section>
  );
}
