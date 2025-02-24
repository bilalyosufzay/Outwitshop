
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Store, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { useCreateShop } from "./hooks/useCreateShop";

const CreateShop = () => {
  const navigate = useNavigate();
  const { createShop, isLoading } = useCreateShop();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    contactEmail: "",
    ownerName: "",
    idCardNumber: "",
    address: "",
    phoneNumber: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCreateShop = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.contactEmail || !formData.ownerName || !formData.idCardNumber || !formData.address || !formData.phoneNumber) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      await createShop(formData);
      toast.success("Shop created successfully!");
      navigate("/my-shop");
    } catch (error) {
      toast.error("Failed to create shop. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="container max-w-2xl mx-auto py-8">
        <Card className="border shadow-lg">
          <CardHeader className="text-center">
            <Store className="w-12 h-12 mx-auto text-primary mb-2" />
            <CardTitle className="text-2xl">Create Your Shop</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 px-6">
            <div className="bg-muted/50 p-4 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
              <div className="text-sm text-muted-foreground">
                <p className="font-medium mb-1">Required Information</p>
                <p>To ensure the quality and security of our marketplace, we need you to provide the following information:</p>
                <ul className="list-disc ml-4 mt-2 space-y-1">
                  <li>Shop name and description</li>
                  <li>Valid contact information</li>
                  <li>Business address</li>
                  <li>ID card number for verification</li>
                  <li>Phone number for customer support</li>
                </ul>
              </div>
            </div>

            <form onSubmit={handleCreateShop} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">Shop Name *</label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Enter your shop name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium">Shop Description</label>
                <Input
                  id="description"
                  name="description"
                  placeholder="Describe your shop"
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="contactEmail" className="text-sm font-medium">Contact Email *</label>
                <Input
                  id="contactEmail"
                  name="contactEmail"
                  type="email"
                  placeholder="Enter contact email"
                  value={formData.contactEmail}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="ownerName" className="text-sm font-medium">Owner Name *</label>
                <Input
                  id="ownerName"
                  name="ownerName"
                  placeholder="Enter owner's full name"
                  value={formData.ownerName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="idCardNumber" className="text-sm font-medium">ID Card Number *</label>
                <Input
                  id="idCardNumber"
                  name="idCardNumber"
                  placeholder="Enter your ID card number"
                  value={formData.idCardNumber}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="address" className="text-sm font-medium">Business Address *</label>
                <Input
                  id="address"
                  name="address"
                  placeholder="Enter business address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="phoneNumber" className="text-sm font-medium">Phone Number *</label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  placeholder="Enter phone number"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                />
              </div>

              <Button 
                type="submit"
                className="w-full mt-6"
                disabled={isLoading}
              >
                {isLoading ? "Creating..." : "Create Shop"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreateShop;
