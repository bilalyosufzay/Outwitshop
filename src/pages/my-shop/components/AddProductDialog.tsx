
import { FileText, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const AddProductDialog = () => {
  const navigate = useNavigate();
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add Product</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Required Product Information
          </DialogTitle>
          <DialogDescription>
            Please ensure you have the following information ready before adding a product.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="font-semibold">Basic Information</h3>
            <ul className="grid gap-2 text-sm">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                Product name and detailed description
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                Category and subcategory selection
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                Price and any applicable discounts
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                Stock quantity and SKU (if applicable)
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Media Requirements</h3>
            <ul className="grid gap-2 text-sm">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                High-quality product images (min. 800x800px)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                Multiple angles of the product
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                Product dimensions in photos
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Additional Details</h3>
            <ul className="grid gap-2 text-sm">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                Shipping dimensions and weight
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                Product specifications and features
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                Any variants (size, color, etc.)
              </li>
            </ul>
          </div>

          <div className="bg-muted/50 p-4 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
            <div className="text-sm text-muted-foreground">
              <p className="font-medium">Important Notice</p>
              <p>Products must comply with our marketplace guidelines and terms of service. Ensure all information is accurate and up-to-date.</p>
            </div>
          </div>

          <Button 
            onClick={() => navigate("/my-shop/products/add")} 
            className="w-full"
          >
            Continue to Add Product
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
