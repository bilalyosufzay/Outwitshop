
import { FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: () => void;
}

const SearchBar = ({ searchQuery, setSearchQuery, handleSearch }: SearchBarProps) => {
  const { t } = useTranslation();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleSearch();
  };

  return (
    <form onSubmit={onSubmit} className="relative flex gap-2">
      <Input
        type="search"
        placeholder={t("external_products.search_placeholder", "Search global products...")}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="flex-1"
      />
      <Button type="submit" onClick={(e) => { e.preventDefault(); handleSearch(); }}>
        <Search className="h-4 w-4 mr-2" />
        {t("common.search", "Search")}
      </Button>
    </form>
  );
};

export default SearchBar;
