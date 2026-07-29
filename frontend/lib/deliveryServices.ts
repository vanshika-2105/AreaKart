export const deliveryInfo: Record<
  string,
  {
    color: string;
    logo: string;
    description: string;
    url: string;
    rating: number;
    eta: string;
    deliveryFee: string;
    minOrder: string;
    bestChoice: boolean;
  }
> = {
  Blinkit: {
    color: "text-yellow-500",
    logo: "/logos/blinkit.svg",
    description: "10-minute grocery delivery",
    url: "https://blinkit.com",
    rating: 4.8,
    eta: "8-12 mins",
    deliveryFee: "Free",
    minOrder: "₹99",
    bestChoice: true,
  },

  Zepto: {
    color: "text-purple-600",
    logo: "/logos/zepto.svg",
    description: "Fast grocery delivery",
    url: "https://www.zeptonow.com",
    rating: 4.7,
    eta: "10-15 mins",
    deliveryFee: "₹25",
    minOrder: "₹149",
    bestChoice: false,
  },

  Instamart: {
    color: "text-orange-500",
    logo: "/logos/instamart.svg",
    description: "Swiggy Instamart",
    url: "https://www.swiggy.com/instamart",
    rating: 4.6,
    eta: "12-18 mins",
    deliveryFee: "Free",
    minOrder: "₹99",
    bestChoice: false,
  },

  BigBasket: {
    color: "text-green-600",
    logo: "/logos/bigbasket.svg",
    description: "Fresh groceries",
    url: "https://www.bigbasket.com",
    rating: 4.5,
    eta: "20-30 mins",
    deliveryFee: "Free",
    minOrder: "₹250",
    bestChoice: false,
  },


   Dunzo: {
    color: "text-green-600",
    logo: "/logos/dunzo.svg",
    description: "Local delivery",
    url: "https://www.dunzo.com",
    rating: 4.4,
    eta: "15-20 mins",
    deliveryFee: "₹25",
    minOrder: "₹100",
    bestChoice: false,
  },

  "Amazon Fresh": {
    color: "text-blue-600",
    logo: "/logos/amazon-fresh.svg",
    description: "Amazon grocery delivery",
    url: "https://www.amazon.in/fmc/store",
    rating: 4.6,
    eta: "20-30 mins",
    deliveryFee: "Free",
    minOrder: "₹249",
    bestChoice: false,
  },

  "Flipkart Minutes": {
    color: "text-blue-500",
    logo: "/logos/flipkart-minutes.png",
    description: "Fast delivery by Flipkart",
    url: "https://www.flipkart.com/minutes",
    rating: 4.5,
    eta: "10-15 mins",
    deliveryFee: "Free",
    minOrder: "₹99",
    bestChoice: false,
  },

  JioMart: {
    color: "text-red-600",
    logo: "/logos/jiomart.svg",
    description: "Online grocery shopping",
    url: "https://www.jiomart.com",
    rating: 4.4,
    eta: "20-35 mins",
    deliveryFee: "₹20",
    minOrder: "₹199",
    bestChoice: false,
  },

  "BB Now": {
    color: "text-green-700",
    logo: "/logos/bbnow.svg",
    description: "BigBasket instant delivery",
    url: "https://www.bigbasket.com",
    rating: 4.6,
    eta: "15-20 mins",
    deliveryFee: "Free",
    minOrder: "₹99",
    bestChoice: false,
  },

  "Nature's Basket": {
    color: "text-green-800",
    logo: "/logos/natures-basket.jpeg",
    description: "Premium grocery delivery",
    url: "https://www.naturesbasket.co.in",
    rating: 4.3,
    eta: "25-35 mins",
    deliveryFee: "₹40",
    minOrder: "₹299",
    bestChoice: false,
  }
};