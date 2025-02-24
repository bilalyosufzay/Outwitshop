
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductForm } from "./components/ProductForm";
import { useProductOperations } from "./hooks/useProductOperations";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AddProductPage = () => {
  const { addProduct, isLoading } = useProductOperations();
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-8">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => navigate(-1)}
        className="mb-4"
      >
        <ArrowLeft className="h-6 w-6" />
      </Button>

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
