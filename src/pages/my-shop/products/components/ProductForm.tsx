
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Loader, Plus, X, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { productSchema, type ProductFormValues } from "../schemas/productSchema";
import { toast } from "sonner";

interface ProductFormProps {
  onSubmit: (values: ProductFormValues) => Promise<void>;
  isLoading: boolean;
}

export const ProductForm = ({ onSubmit, isLoading }: ProductFormProps) => {
  const navigate = useNavigate();
  const [images, setImages] = useState<string[]>([]);
  const [specifications, setSpecifications] = useState<{ name: string; value: string }[]>([]);
  const [features, setFeatures] = useState<string[]>([]);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      stock_quantity: 0,
      category: "",
      subcategory: "",
      sku: "",
      weight: 0,
      dimensions: {
        length: 0,
        width: 0,
        height: 0,
      },
      features: [],
      specifications: [],
      images: [],
      video_url: "",
      shipping_info: {
        free_shipping: false,
        shipping_fee: 0,
      },
    },
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;

    try {
      // Here you would normally upload to your storage solution
      // For now, we'll just create object URLs
      const newImages = Array.from(e.target.files).map(file => URL.createObjectURL(file));
      setImages([...images, ...newImages]);
      form.setValue("images", [...images, ...newImages]);
    } catch (error) {
      toast.error("Error uploading images");
    }
  };

  const addSpecification = () => {
    setSpecifications([...specifications, { name: "", value: "" }]);
  };

  const removeSpecification = (index: number) => {
    setSpecifications(specifications.filter((_, i) => i !== index));
  };

  const addFeature = () => {
    setFeatures([...features, ""]);
  };

  const removeFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Basic Information */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Basic Information</h2>
          
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter product name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter detailed product description"
                    className="min-h-[150px]"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Include key features, materials, and use cases
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Electronics" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="subcategory"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subcategory (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Smartphones" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Pricing and Inventory */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Pricing & Inventory</h2>
          
          <div className="grid grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="0.00"
                      step="0.01"
                      min="0"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="stock_quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stock Quantity</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="0"
                      min="0"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="sku"
            render={({ field }) => (
              <FormItem>
                <FormLabel>SKU (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="Enter product SKU" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Dimensions and Weight */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Physical Specifications</h2>
          
          <FormField
            control={form.control}
            name="weight"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Weight (kg)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="dimensions.length"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Length (cm)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="0"
                      min="0"
                      step="0.1"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dimensions.width"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Width (cm)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="0"
                      min="0"
                      step="0.1"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dimensions.height"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Height (cm)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="0"
                      min="0"
                      step="0.1"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Media */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Media</h2>
          
          <div className="space-y-4">
            <FormLabel>Product Images</FormLabel>
            <div className="grid grid-cols-4 gap-4">
              {images.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={image}
                    alt={`Product ${index + 1}`}
                    className="w-full h-32 object-cover rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImages(images.filter((_, i) => i !== index));
                      form.setValue(
                        "images",
                        images.filter((_, i) => i !== index)
                      );
                    }}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
              <label className="flex items-center justify-center w-full h-32 border-2 border-dashed rounded-md hover:border-primary cursor-pointer">
                <div className="space-y-2 text-center">
                  <Upload className="mx-auto h-6 w-6 text-muted-foreground" />
                  <div className="text-sm text-muted-foreground">Upload Image</div>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>
            </div>
          </div>

          <FormField
            control={form.control}
            name="video_url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Video URL (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="Enter product video URL" {...field} />
                </FormControl>
                <FormDescription>
                  Enter a YouTube or Vimeo URL
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Features and Specifications */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Features & Specifications</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <FormLabel>Features</FormLabel>
              <Button type="button" variant="outline" size="sm" onClick={addFeature}>
                <Plus className="h-4 w-4 mr-2" />
                Add Feature
              </Button>
            </div>
            {features.map((_, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  placeholder="Enter product feature"
                  value={features[index]}
                  onChange={(e) => {
                    const newFeatures = [...features];
                    newFeatures[index] = e.target.value;
                    setFeatures(newFeatures);
                    form.setValue("features", newFeatures);
                  }}
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  onClick={() => removeFeature(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <FormLabel>Specifications</FormLabel>
              <Button type="button" variant="outline" size="sm" onClick={addSpecification}>
                <Plus className="h-4 w-4 mr-2" />
                Add Specification
              </Button>
            </div>
            {specifications.map((spec, index) => (
              <div key={index} className="grid grid-cols-[1fr,1fr,auto] gap-2">
                <Input
                  placeholder="Name"
                  value={spec.name}
                  onChange={(e) => {
                    const newSpecs = [...specifications];
                    newSpecs[index].name = e.target.value;
                    setSpecifications(newSpecs);
                    form.setValue("specifications", newSpecs);
                  }}
                />
                <Input
                  placeholder="Value"
                  value={spec.value}
                  onChange={(e) => {
                    const newSpecs = [...specifications];
                    newSpecs[index].value = e.target.value;
                    setSpecifications(newSpecs);
                    form.setValue("specifications", newSpecs);
                  }}
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  onClick={() => removeSpecification(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Shipping Information */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Shipping Information</h2>
          
          <FormField
            control={form.control}
            name="shipping_info.free_shipping"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Free Shipping</FormLabel>
                  <FormDescription>
                    Offer free shipping for this product
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />

          {!form.watch("shipping_info.free_shipping") && (
            <FormField
              control={form.control}
              name="shipping_info.shipping_fee"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Shipping Fee</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="0.00"
                      step="0.01"
                      min="0"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>

        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/my-shop/products")}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader className="mr-2 h-4 w-4 animate-spin" />
                Adding...
              </>
            ) : (
              "Add Product"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};
