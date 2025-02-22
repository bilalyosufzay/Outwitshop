
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { CreateShopFormData } from "../types";

interface SellerInfoSectionProps {
  form: UseFormReturn<CreateShopFormData>;
}

export const SellerInfoSection = ({ form }: SellerInfoSectionProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Seller Information</h3>
      <FormDescription>
        As per our seller agreement, we require accurate personal information
        for verification purposes.
      </FormDescription>

      <FormField
        control={form.control}
        name="ownerName"
        rules={{ required: "Full name is required" }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Full Name</FormLabel>
            <FormControl>
              <Input placeholder="John Doe" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="idCardNumber"
        rules={{ required: "ID card number is required" }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>ID Card Number</FormLabel>
            <FormControl>
              <Input placeholder="ID card number" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="address"
        rules={{ required: "Address is required" }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Full Address</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Enter your complete address..."
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="phoneNumber"
        rules={{ 
          required: "Phone number is required",
          pattern: {
            value: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
            message: "Please enter a valid phone number"
          }
        }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Phone Number</FormLabel>
            <FormControl>
              <Input 
                type="tel" 
                placeholder="+1234567890"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="businessLicense"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Business License Number (if applicable)</FormLabel>
            <FormControl>
              <Input 
                placeholder="Business license number"
                {...field}
              />
            </FormControl>
            <FormDescription>
              Required for certain business types as per local regulations
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
