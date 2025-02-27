
import { useProductManagement } from "./hooks/useProductManagement";
import ProductsHeader from "./components/ProductsHeader";
import ProductSearchBar from "./components/ProductSearchBar";
import ProductSkeletons from "./components/ProductSkeletons";
import EmptyProductsList from "./components/EmptyProductsList";
import ProductsList from "./components/ProductsList";

const ManageProducts = () => {
  const {
    loading,
    filteredProducts,
    searchQuery,
    setSearchQuery,
    handleAddProduct,
    handleEditProduct,
    handleDeleteProduct,
    toggleFeatured,
    toggleTrending,
    toggleOnSale
  } = useProductManagement();

  return (
    <div className="container mx-auto px-4 py-6">
      <ProductsHeader onAddProduct={handleAddProduct} />
      <ProductSearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      
      {loading ? (
        <ProductSkeletons />
      ) : (
        <>
          {filteredProducts.length === 0 ? (
            <EmptyProductsList onAddProduct={handleAddProduct} />
          ) : (
            <ProductsList
              products={filteredProducts}
              onEdit={handleEditProduct}
              onDelete={handleDeleteProduct}
              onToggleFeatured={toggleFeatured}
              onToggleTrending={toggleTrending}
              onToggleOnSale={toggleOnSale}
            />
          )}
        </>
      )}
    </div>
  );
};

export default ManageProducts;
