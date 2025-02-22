
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { CreateShopFormData } from "../types";

interface ShopInfoSectionProps {
  form: UseFormReturn<CreateShopFormData>;
}

export const ShopInfoSection = ({ form }: ShopInfoSectionProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Shop Information</h3>
      
      <FormField
        control={form.control}
        name="name"
        rules={{ required: "Shop name is required" }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Shop Name</FormLabel>
            <FormControl>
              <Input placeholder="My Awesome Shop" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="description"
        rules={{ required: "Description is required" }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Tell customers about your shop..."
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="slug"
        rules={{ 
          required: "Shop URL is required",
          pattern: {
            value: /^[a-zA-Z0-9-]+$/,
            message: "Only letters, numbers, and hyphens are allowed"
          }
        }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Shop URL</FormLabel>
            <FormControl>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">
                  outwit.shop/
                </span>
                <Input placeholder="my-shop" {...field} />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
