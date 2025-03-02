
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { MapPin } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getSupportedCountries } from "@/services/externalProductsService";
import { getTaxDisplayText } from "@/utils/localization";

interface CountrySelectorProps {
  country: string;
  onCountryChange: (value: string) => void;
}

const CountrySelector = ({ country, onCountryChange }: CountrySelectorProps) => {
  const { t } = useTranslation();
  const supportedCountries = getSupportedCountries();
  
  // Get tax display text
  const taxInfo = getTaxDisplayText(country);

  return (
    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
      <div className="flex items-center gap-2">
        <MapPin className="h-4 w-4 text-muted-foreground" />
        <Select value={country} onValueChange={onCountryChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={t("external_products.select_country", "Select Country")} />
          </SelectTrigger>
          <SelectContent>
            {supportedCountries.map((country) => (
              <SelectItem key={country.code} value={country.code}>
                {country.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <p className="text-xs text-muted-foreground">
        {taxInfo}
      </p>
    </div>
  );
};

export default CountrySelector;
