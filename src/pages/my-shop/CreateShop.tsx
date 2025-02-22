
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { ShopInfoSection } from "./components/ShopInfoSection";
import { SellerInfoSection } from "./components/SellerInfoSection";
import { ContactInfoSection } from "./components/ContactInfoSection";
import { useCreateShop } from "./hooks/useCreateShop";
import { CreateShopFormData } from "./types";

const CreateShop = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { createShop, isLoading } = useCreateShop();

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
            <form onSubmit={form.handleSubmit(createShop)} className="space-y-6">
              <ShopInfoSection form={form} />
              <Separator className="my-6" />
              <SellerInfoSection form={form} />
              <Separator className="my-6" />
              <ContactInfoSection form={form} />

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
