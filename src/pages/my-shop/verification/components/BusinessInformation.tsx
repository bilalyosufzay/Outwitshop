
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { VerificationFormValues } from "../schema";

interface BusinessInformationProps {
  form: UseFormReturn<VerificationFormValues>;
}

export const BusinessInformation = ({ form }: BusinessInformationProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Business Information</h3>
      <FormField
        control={form.control}
        name="businessName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Business Name</FormLabel>
            <FormControl>
              <Input placeholder="Enter your business name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="ownerFullName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Owner Full Name</FormLabel>
            <FormControl>
              <Input placeholder="Enter owner's full name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="idNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ID Number</FormLabel>
              <FormControl>
                <Input placeholder="Enter ID number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="businessRegistrationNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Business Registration Number (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="Enter business registration number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};
