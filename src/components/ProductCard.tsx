
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  onClick?: () => void;
  className?: string;
}

const ProductCard = ({
  id,
  name,
  price,
  image,
  category,
  onClick,
  className,
}: ProductCardProps) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "group relative bg-white rounded-2xl p-4 transition-all duration-300 hover:shadow-lg animate-scale-in",
        className
      )}
    >
      <div className="relative aspect-square overflow-hidden rounded-xl mb-4">
        <img
          src={image}
          alt={name}
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
        />
        <button
          className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full 
                     shadow-sm transition-colors hover:bg-white"
        >
          <Heart className="w-5 h-5 text-gray-600" />
        </button>
      </div>
      <div className="space-y-1">
        <p className="text-xs font-medium text-gray-500 uppercase">{category}</p>
        <h3 className="font-medium text-gray-900 truncate">{name}</h3>
        <p className="font-semibold text-accent">
          ${price.toLocaleString("en-US", { minimumFractionDigits: 2 })}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
