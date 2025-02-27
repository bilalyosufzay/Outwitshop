
import { Card } from "@/components/ui/card";

interface ProductSkeletonsProps {
  count?: number;
}

const ProductSkeletons = ({ count = 6 }: ProductSkeletonsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <Card key={index} className="p-4 animate-pulse">
          <div className="aspect-square bg-gray-200 rounded-xl mb-4"></div>
          <div className="h-4 bg-gray-200 rounded mb-2 w-1/3"></div>
          <div className="h-5 bg-gray-200 rounded mb-2 w-2/3"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        </Card>
      ))}
    </div>
  );
};

export default ProductSkeletons;
