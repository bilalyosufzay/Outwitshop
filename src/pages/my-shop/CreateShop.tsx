
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Shop } from "@/types/shop";

interface CreateShopFormData {
  name: string;
  description: string;
  slug: string;
  contactEmail: string;
  ownerName: string;
  idCardNumber: string;
  address: string;
  phoneNumber: string;
  businessLicense?: string;
}

const CreateShop = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<CreateShopFormData>({
    defaultValues: {
      name: "",
      description: "",
      slug: "",
      contactEmail: user?.email || "",
      ownerName: "",
      idCardNumber: "",
      address: "",
      phoneNumber: "",
      businessLicense: "",
    },
  });

  const handleCancel = () => {
    navigate("/");
  };

  const onSubmit = async (data: CreateShopFormData) => {
    if (!user) {
      toast.error("You must be logged in to create a shop");
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('shops')
        .insert({
          owner_id: user.id,
          name: data.name,
          description: data.description,
          slug: data.slug.toLowerCase(),
          contact_email: data.contactEmail,
          status: 'pending',
          owner_name: data.ownerName,
          id_card_number: data.idCardNumber,
          address: data.address,
          phone_number: data.phoneNumber,
          business_license: data.businessLicense,
        });

      if (error) throw error;

      toast.success("Shop application submitted successfully! Awaiting verification.");
      navigate("/my-shop/dashboard");
    } catch (error: any) {
      toast.error(
        error.message === "duplicate key value violates unique constraint"
          ? "This shop URL is already taken. Please choose another."
          : "Failed to create shop. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Create Your Shop</CardTitle>
          <CardDescription>
            Start selling on Outwit Shop by creating your own store. Please provide accurate
            information as per our seller agreement.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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

                <Separator className="my-6" />
                
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

                <Separator className="my-6" />

                <h3 className="text-lg font-semibold">Contact Information</h3>
                <FormField
                  control={form.control}
                  name="contactEmail"
                  rules={{ 
                    required: "Contact email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address"
                    }
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Email</FormLabel>
                      <FormControl>
                        <Input type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex gap-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={handleCancel}
                  className="w-full"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isLoading}
                >
                  {isLoading ? "Submitting Application..." : "Submit Application"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateShop;
