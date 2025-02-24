
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductForm } from "./components/ProductForm";
import { useProductOperations } from "./hooks/useProductOperations";

const AddProductPage = () => {
  const { addProduct, isLoading } = useProductOperations();

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Add New Product</CardTitle>
        </CardHeader>
        <CardContent>
          <ProductForm onSubmit={addProduct} isLoading={isLoading} />
        </CardContent>
      </Card>
    </div>
  );
};

export default AddProductPage;
