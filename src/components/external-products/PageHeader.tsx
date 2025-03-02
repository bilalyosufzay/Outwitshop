
import { useTranslation } from "react-i18next";
import { Globe } from "lucide-react";

const PageHeader = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col space-y-2">
      <h1 className="text-2xl font-bold flex items-center gap-2">
        <Globe className="h-6 w-6 text-primary" />
        {t("external_products.title", "Global Marketplace")}
      </h1>
      <p className="text-muted-foreground">
        {t("external_products.description", "Shop products from global marketplaces directly through our app!")}
      </p>
    </div>
  );
};

export default PageHeader;
