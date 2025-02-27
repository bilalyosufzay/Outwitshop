
import { Button } from "@/components/ui/button";
import { BackButton } from "@/components/BackButton";
import { PlusCircle } from "lucide-react";

interface ProductsHeaderProps {
  onAddProduct: () => void;
}

const ProductsHeader = ({ onAddProduct }: ProductsHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center space-x-2">
        <BackButton />
        <h1 className="text-2xl font-semibold">Manage Products</h1>
      </div>
      <Button onClick={onAddProduct}>
        <PlusCircle className="mr-2 h-4 w-4" />
        Add Product
      </Button>
    </div>
  );
};

export default ProductsHeader;
