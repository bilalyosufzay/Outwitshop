
import { 
  Gift, 
  Percent, 
  Package, 
  Truck, 
  BadgeDollarSign, 
  Award, 
  Smartphone, 
  Headphones, 
  Ticket 
} from "lucide-react";
import { Prize, SpecialEvent } from "../types";

export const prizes: Prize[] = [
  { 
    id: 1, 
    name: "5% Discount", 
    color: "#FF6B6B",
    icon: <Percent className="h-24 w-24 text-white" />,
    quantity: 100,
    claimed: 23,
    description: "5% off your next purchase"
  },
  { 
    id: 2, 
    name: "10% Discount", 
    color: "#4ECDC4",
    icon: <Percent className="h-24 w-24 text-white" />,
    quantity: 50,
    claimed: 12,
    description: "10% off your next purchase"
  },
  { 
    id: 3, 
    name: "Free Shipping", 
    color: "#45B7D1",
    icon: <Truck className="h-24 w-24 text-white" />,
    quantity: 200,
    claimed: 45,
    description: "Free shipping on your next order"
  },
  { 
    id: 4, 
    name: "20% Discount", 
    color: "#96CEB4",
    icon: <Percent className="h-24 w-24 text-white" />,
    quantity: 30,
    claimed: 15,
    description: "20% off your next purchase",
    rarity: "rare"
  },
  { 
    id: 5, 
    name: "100 Points", 
    color: "#FFEEAD",
    icon: <BadgeDollarSign className="h-24 w-24 text-white" />,
    quantity: 500,
    claimed: 120,
    description: "100 bonus loyalty points"
  },
  { 
    id: 6, 
    name: "Mystery Box", 
    color: "#D4A5A5",
    icon: <Package className="h-24 w-24 text-white" />,
    quantity: 5,
    claimed: 2,
    description: "A surprise gift box with random items",
    rarity: "epic"
  },
  { 
    id: 7, 
    name: "15% Discount", 
    color: "#9EC1CF",
    icon: <Percent className="h-24 w-24 text-white" />,
    quantity: 40,
    claimed: 18,
    description: "15% off your next purchase"
  },
  { 
    id: 8, 
    name: "50 Points", 
    color: "#FFD93D",
    icon: <BadgeDollarSign className="h-24 w-24 text-white" />,
    quantity: 1000,
    claimed: 350,
    description: "50 bonus loyalty points"
  },
];

export const specialPrizes: Prize[] = [
  {
    id: 101,
    name: "Smartphone",
    color: "#e74c3c",
    icon: <Smartphone className="h-24 w-24 text-white" />,
    rarity: 'legendary',
    points: 1000,
    quantity: 1,
    claimed: 0,
    description: "A brand new latest model smartphone"
  },
  {
    id: 102,
    name: "Headphones",
    color: "#3498db",
    icon: <Headphones className="h-24 w-24 text-white" />,
    rarity: 'epic',
    points: 500,
    quantity: 3,
    claimed: 1,
    description: "Premium wireless noise-canceling headphones"
  },
  {
    id: 103,
    name: "Gift Card",
    color: "#2ecc71",
    icon: <Ticket className="h-24 w-24 text-white" />,
    rarity: 'rare',
    points: 250,
    quantity: 10,
    claimed: 3,
    description: "A $50 gift card for our store"
  }
];

export const specialEvent: SpecialEvent = {
  id: 'spring-festival',
  title: '🌸 Spring Festival Special',
  description: 'Draw special spring-themed prizes with increased chances of rare rewards!',
  startDate: new Date(),
  endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  prizes: [
    {
      id: 201,
      name: "Spring Bundle",
      color: "#FFB7C5",
      icon: <Gift className="h-24 w-24 text-white" />,
      rarity: 'legendary',
      points: 1000,
      quantity: 1,
      claimed: 0,
      description: "A special spring-themed gift bundle worth $200"
    },
    {
      id: 202,
      name: "Spring Voucher",
      color: "#98FB98",
      icon: <Ticket className="h-24 w-24 text-white" />,
      rarity: 'epic',
      points: 500,
      quantity: 5,
      claimed: 1,
      description: "A $100 spring shopping voucher"
    },
    {
      id: 203,
      name: "Spring Trophy",
      color: "#87CEFA",
      icon: <Award className="h-24 w-24 text-white" />,
      rarity: 'rare',
      points: 250,
      quantity: 20,
      claimed: 5,
      description: "A limited edition spring digital trophy for your profile"
    }
  ],
  rules: [
    "One entry per eligible purchase",
    "Entries are valid until the event end date",
    "Winners will be notified via email and must claim within 7 days",
    "All decisions are final and no correspondence will be entered into"
  ],
  eligibilityCriteria: [
    "Must be a registered user",
    "Must have a verified email address",
    "Must be at least 18 years old"
  ],
  sponsor: "Spring Fashion Brand",
  sponsorLogo: "https://example.com/sponsor-logo.png"
};
