
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Store, AlertCircle, FileText, ShieldCheck, Building2 } from "lucide-react";
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
    businessLicense: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCreateShop = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.contactEmail || !formData.ownerName || 
        !formData.idCardNumber || !formData.address || !formData.phoneNumber) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      await createShop(formData);
      toast.success("Shop created successfully! Your application is under review.");
      navigate("/my-shop");
    } catch (error) {
      toast.error("Failed to create shop. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="container max-w-3xl mx-auto py-8">
        <Card className="border shadow-lg">
          <CardHeader className="text-center space-y-4">
            <Store className="w-12 h-12 mx-auto text-primary mb-2" />
            <CardTitle className="text-2xl">Create Your Shop</CardTitle>
            <p className="text-muted-foreground">Complete the verification process to start selling</p>
          </CardHeader>
          <CardContent className="space-y-8 px-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="bg-muted/50 p-4 rounded-lg flex items-start gap-3">
                <FileText className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
                <div className="text-sm text-muted-foreground">
                  <p className="font-medium mb-1">Required Documents</p>
                  <ul className="list-disc ml-4 space-y-1">
                    <li>Valid ID Card</li>
                    <li>Business License (if applicable)</li>
                    <li>Proof of Address</li>
                    <li>Bank Account Details</li>
                  </ul>
                </div>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
                <div className="text-sm text-muted-foreground">
                  <p className="font-medium mb-1">Verification Process</p>
                  <ul className="list-disc ml-4 space-y-1">
                    <li>Submit required information</li>
                    <li>Document verification (1-2 days)</li>
                    <li>Account approval</li>
                    <li>Start selling</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-primary/5 border border-primary/10 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <Building2 className="w-5 h-5 text-primary" />
                <h3 className="font-medium text-primary">Seller Requirements</h3>
              </div>
              <ul className="grid gap-2 text-sm">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                  Valid business registration or personal ID
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                  Active bank account for receiving payments
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                  Physical address for business operations
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                  Working phone number for customer support
                </li>
              </ul>
            </div>

            <form onSubmit={handleCreateShop} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
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
                  <label htmlFor="contactEmail" className="text-sm font-medium">Business Email *</label>
                  <Input
                    id="contactEmail"
                    name="contactEmail"
                    type="email"
                    placeholder="Enter business email"
                    value={formData.contactEmail}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium">Shop Description</label>
                <Input
                  id="description"
                  name="description"
                  placeholder="Describe your shop and what you sell"
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
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
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="phoneNumber" className="text-sm font-medium">Business Phone *</label>
                  <Input
                    id="phoneNumber"
                    name="phoneNumber"
                    type="tel"
                    placeholder="Enter business phone"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="businessLicense" className="text-sm font-medium">Business License</label>
                  <Input
                    id="businessLicense"
                    name="businessLicense"
                    placeholder="Enter business license number"
                    value={formData.businessLicense}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="address" className="text-sm font-medium">Business Address *</label>
                <Input
                  id="address"
                  name="address"
                  placeholder="Enter complete business address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="bg-muted/50 p-4 rounded-lg flex items-start gap-3 mt-6">
                <AlertCircle className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
                <div className="text-sm text-muted-foreground">
                  <p className="font-medium">Important Notice</p>
                  <p>By submitting this form, you agree to our seller terms and conditions. Your application will be reviewed within 1-2 business days.</p>
                </div>
              </div>

              <Button 
                type="submit"
                className="w-full mt-6"
                disabled={isLoading}
                size="lg"
              >
                {isLoading ? "Creating..." : "Submit Application"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreateShop;
