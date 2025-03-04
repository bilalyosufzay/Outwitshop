
import { Link } from "react-router-dom";
import { Button } from "../../../components/ui/button";

export default function ManageProducts() {
  return (
    <div className="min-h-screen p-6">
      <h1 className="text-3xl font-bold">Manage Products</h1>
      <div className="mt-4">
        <Button asChild>
          <Link to="/my-shop/products/add">Add New Product</Link>
        </Button>
      </div>
      <p className="mt-8 text-gray-600">No products found. Add your first product to get started.</p>
    </div>
  );
}
