
import {
  Smartphone,
  ShirtIcon,
  Home,
  Sparkles,
  ShoppingCart,
  Dumbbell,
  Baby,
  Car,
  BookOpen,
  Cat,
  type LucideIcon
} from "lucide-react";

interface Category {
  id: string;
  name: string;
  icon: LucideIcon;
  subcategories: string[];
}

export const CATEGORIES: Category[] = [
  {
    id: "fashion",
    name: "Fashion",
    icon: ShirtIcon,
    subcategories: ["Women's Clothing", "Men's Clothing", "Children's", "Shoes & Bags", "Accessories"],
  },
  {
    id: "electronics",
    name: "Electronics",
    icon: Smartphone,
    subcategories: ["Phones", "Computers", "Home Appliances", "Audio & Video"],
  },
  {
    id: "home",
    name: "Home & Living",
    icon: Home,
    subcategories: ["Furniture", "Décor", "Kitchen", "Bedding & Bath"],
  },
  {
    id: "beauty",
    name: "Beauty",
    icon: Sparkles,
    subcategories: ["Cosmetics", "Skincare", "Haircare", "Fragrances"],
  },
  {
    id: "grocery",
    name: "Supermarket",
    icon: ShoppingCart,
    subcategories: ["Food & Beverages", "Household", "Personal Care"],
  },
  {
    id: "sports",
    name: "Sports",
    icon: Dumbbell,
    subcategories: ["Equipment", "Activewear", "Outdoor Gear"],
  },
  {
    id: "kids",
    name: "Kids & Baby",
    icon: Baby,
    subcategories: ["Toys", "Baby Essentials", "Maternity"],
  },
  {
    id: "auto",
    name: "Automotive",
    icon: Car,
    subcategories: ["Accessories", "Motorcycle", "Spare Parts"],
  },
  {
    id: "books",
    name: "Books & Media",
    icon: BookOpen,
    subcategories: ["Books", "Magazines", "Music & Movies"],
  },
  {
    id: "pets",
    name: "Pet Supplies",
    icon: Cat,
    subcategories: ["Pet Food", "Accessories", "Aquarium"],
  },
];
