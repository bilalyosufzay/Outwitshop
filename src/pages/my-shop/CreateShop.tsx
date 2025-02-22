
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
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Shop } from "@/types/shop";

interface CreateShopFormData {
  name: string;
  description: string;
  slug: string;
  contactEmail: string;
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
        } as Partial<Shop>);

      if (error) throw error;

      toast.success("Shop created successfully! Awaiting verification.");
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
            Start selling on Outwit Shop by creating your own store. Fill in the
            details below to get started.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                  {isLoading ? "Creating Shop..." : "Create Shop"}
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
