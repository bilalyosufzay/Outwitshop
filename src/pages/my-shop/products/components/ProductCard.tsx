
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Edit, Trash2 } from "lucide-react";
import ProductCardBase from "@/components/ProductCard";
import { Product } from "@/data/types/product";

interface ProductCardProps {
  product: Product;
  onEdit: (productId: string) => void;
  onDelete: (productId: string) => void;
  onToggleFeatured: (productId: string, featured: boolean) => void;
  onToggleTrending: (productId: string, trending: boolean) => void;
  onToggleOnSale: (productId: string, onSale: boolean) => void;
}

const ProductCard = ({
  product,
  onEdit,
  onDelete,
  onToggleFeatured,
  onToggleTrending,
  onToggleOnSale
}: ProductCardProps) => {
  return (
    <Card className="p-4 relative">
      <ProductCardBase {...product} />
      <div className="mt-4 flex justify-between items-center">
        <div className="flex space-x-4">
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => onEdit(product.id)}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => onDelete(product.id)}
          >
            <Trash2 className="h-4 w-4 text-red-500" />
          </Button>
        </div>
      </div>
      
      <div className="mt-4 space-y-2">
        <div className="flex items-center space-x-2">
          <Checkbox 
            id={`featured-${product.id}`}
            checked={product.featured}
            onCheckedChange={(checked) => 
              onToggleFeatured(product.id, checked === true)
            }
          />
          <label 
            htmlFor={`featured-${product.id}`}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Featured Product
          </label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox 
            id={`trending-${product.id}`}
            checked={product.trending}
            onCheckedChange={(checked) => 
              onToggleTrending(product.id, checked === true)
            }
          />
          <label 
            htmlFor={`trending-${product.id}`}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Trending Product
          </label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox 
            id={`sale-${product.id}`}
            checked={product.onSale}
            onCheckedChange={(checked) => 
              onToggleOnSale(product.id, checked === true)
            }
          />
          <label 
            htmlFor={`sale-${product.id}`}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            On Sale
          </label>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
