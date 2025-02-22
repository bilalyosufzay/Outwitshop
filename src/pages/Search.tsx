
import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Input } from "@/components/ui/input";
import { Search as SearchIcon } from "lucide-react";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");

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
          <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        </div>
        
        {/* Search results will be implemented later */}
        <div className="text-center text-muted-foreground">
          {searchQuery ? "No results found" : "Start typing to search"}
        </div>
      </div>
      <Navigation />
    </div>
  );
};

export default Search;
