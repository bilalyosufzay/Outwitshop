
import { Product } from "@/data/types/product";
import ProductCard from "./ProductCard";

interface ProductsListProps {
  products: Product[];
  onEdit: (productId: string) => void;
  onDelete: (productId: string) => void;
  onToggleFeatured: (productId: string, featured: boolean) => void;
  onToggleTrending: (productId: string, trending: boolean) => void;
  onToggleOnSale: (productId: string, onSale: boolean) => void;
}

const ProductsList = ({
  products,
  onEdit,
  onDelete,
  onToggleFeatured,
  onToggleTrending,
  onToggleOnSale
}: ProductsListProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggleFeatured={onToggleFeatured}
          onToggleTrending={onToggleTrending}
          onToggleOnSale={onToggleOnSale}
        />
      ))}
    </div>
  );
};

export default ProductsList;
