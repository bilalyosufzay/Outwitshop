
import { useState } from "react";
import Navigation from "../components/Navigation";
import ProductCard from "../components/ProductCard";
import { Card } from "../components/ui/card";
import { TRENDING_PRODUCTS, FEATURED_PRODUCTS, SALE_PRODUCTS } from "../data/products";
import { Input } from "../components/ui/input";
import { Search } from "lucide-react";

const Products = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const allProducts = [...TRENDING_PRODUCTS, ...FEATURED_PRODUCTS, ...SALE_PRODUCTS];
  
  const filteredProducts = allProducts.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="container mx-auto px-4 py-4">
        <div className="relative mb-6">
          <Input
            type="search"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="border-none shadow-none">
              <ProductCard {...product} />
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center text-muted-foreground mt-8">
            No products found matching your search.
          </div>
        )}
      </div>
      <Navigation />
    </div>
  );
};

export default Products;
