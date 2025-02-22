
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Shop } from "@/types/shop";

interface ShopInfoCardProps {
  shop: Shop;
}

export const ShopInfoCard = ({ shop }: ShopInfoCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{shop.name}</CardTitle>
        <CardDescription>
          Shop Status: <span className="capitalize">{shop.status}</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-500">{shop.description}</p>
      </CardContent>
    </Card>
  );
};
