
import { Gift, Percent, Package, Truck, BadgeDollarSign } from "lucide-react";
import { Prize, SpecialEvent } from "../types";

export const prizes: Prize[] = [
  { 
    id: 1, 
    name: "5% Discount", 
    color: "#FF6B6B",
    icon: <Percent className="h-24 w-24 text-white" />
  },
  { 
    id: 2, 
    name: "10% Discount", 
    color: "#4ECDC4",
    icon: <Percent className="h-24 w-24 text-white" />
  },
  { 
    id: 3, 
    name: "Free Shipping", 
    color: "#45B7D1",
    icon: <Truck className="h-24 w-24 text-white" />
  },
  { 
    id: 4, 
    name: "20% Discount", 
    color: "#96CEB4",
    icon: <Percent className="h-24 w-24 text-white" />
  },
  { 
    id: 5, 
    name: "100 Points", 
    color: "#FFEEAD",
    icon: <BadgeDollarSign className="h-24 w-24 text-white" />
  },
  { 
    id: 6, 
    name: "Mystery Box", 
    color: "#D4A5A5",
    icon: <Package className="h-24 w-24 text-white" />
  },
  { 
    id: 7, 
    name: "15% Discount", 
    color: "#9EC1CF",
    icon: <Percent className="h-24 w-24 text-white" />
  },
  { 
    id: 8, 
    name: "50 Points", 
    color: "#FFD93D",
    icon: <BadgeDollarSign className="h-24 w-24 text-white" />
  },
];

export const specialEvent: SpecialEvent = {
  id: 'spring-festival',
  title: '🌸 Spring Festival Special',
  description: 'Draw special spring-themed prizes with increased chances of rare rewards!',
  startDate: new Date(),
  endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  prizes: [
    {
      id: 101,
      name: "Spring Bundle",
      color: "#FFB7C5",
      icon: <Gift className="h-24 w-24 text-white" />,
      rarity: 'legendary',
      points: 1000
    }
  ]
};
