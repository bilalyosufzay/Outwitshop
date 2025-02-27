
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

interface EmptyProductsListProps {
  onAddProduct: () => void;
}

const EmptyProductsList = ({ onAddProduct }: EmptyProductsListProps) => {
  return (
    <div className="text-center py-12">
      <p className="text-muted-foreground mb-4">No products found.</p>
      <Button onClick={onAddProduct}>
        <PlusCircle className="mr-2 h-4 w-4" />
        Add Your First Product
      </Button>
    </div>
  );
};

export default EmptyProductsList;
