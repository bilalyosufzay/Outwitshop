
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface ProductSearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const ProductSearchBar = ({ searchQuery, setSearchQuery }: ProductSearchBarProps) => {
  return (
    <div className="mb-6">
      <div className="relative">
        <Input
          type="search"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
      </div>
    </div>
  );
};

export default ProductSearchBar;
