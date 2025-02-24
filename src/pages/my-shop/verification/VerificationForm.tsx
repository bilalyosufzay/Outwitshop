
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Upload } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

const verificationSchema = z.object({
  businessName: z.string().min(1, "Business name is required"),
  ownerFullName: z.string().min(1, "Full name is required"),
  idNumber: z.string().min(1, "ID number is required"),
  businessRegistrationNumber: z.string().optional(),
  address: z.string().min(1, "Address is required"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  bankAccountName: z.string().min(1, "Bank account name is required"),
  bankAccountNumber: z.string().min(1, "Bank account number is required"),
  bankName: z.string().min(1, "Bank name is required"),
  taxNumber: z.string().optional(),
});

type VerificationFormValues = z.infer<typeof verificationSchema>;

const VerificationForm = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const form = useForm<VerificationFormValues>({
    resolver: zodResolver(verificationSchema),
    defaultValues: {
      businessName: "",
      ownerFullName: "",
      idNumber: "",
      businessRegistrationNumber: "",
      address: "",
      phoneNumber: "",
      bankAccountName: "",
      bankAccountNumber: "",
      bankName: "",
      taxNumber: "",
    },
  });

  const onSubmit = async (values: VerificationFormValues) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from("shops")
        .update({
          verification_details: values,
          verification_status: "pending",
          verification_submitted_at: new Date().toISOString(),
        })
        .eq("owner_id", user.id);

      if (error) throw error;

      toast.success("Verification submitted successfully!");
      navigate("/my-shop");
    } catch (error) {
      toast.error("Failed to submit verification");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="container max-w-3xl mx-auto py-8">
        <Button
          variant="ghost"
          size="icon"
          className="mb-4"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>

        <Card>
          <CardHeader>
            <CardTitle>Shop Verification</CardTitle>
            <CardDescription>
              Complete the verification process to start selling products
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Contact Information</h3>
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Business Address</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter business address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter phone number" type="tel" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Banking Information</h3>
                  <FormField
                    control={form.control}
                    name="bankName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bank Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter bank name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="bankAccountName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Account Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter account name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="bankAccountNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Account Number</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter account number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Additional Information</h3>
                  <FormField
                    control={form.control}
                    name="taxNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tax Number (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter tax number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="mt-6 space-y-4">
                  <h3 className="text-lg font-medium">Document Upload</h3>
                  <div className="grid gap-4">
                    <div className="border rounded-lg p-4">
                      <FormLabel>Government-issued ID</FormLabel>
                      <div className="mt-2 flex items-center gap-4">
                        <Button type="button" variant="outline" className="w-full">
                          <Upload className="w-4 h-4 mr-2" />
                          Upload ID
                        </Button>
                      </div>
                      <FormDescription className="mt-2">
                        Upload a clear photo of your valid government ID
                      </FormDescription>
                    </div>

                    <div className="border rounded-lg p-4">
                      <FormLabel>Proof of Address</FormLabel>
                      <div className="mt-2 flex items-center gap-4">
                        <Button type="button" variant="outline" className="w-full">
                          <Upload className="w-4 h-4 mr-2" />
                          Upload Document
                        </Button>
                      </div>
                      <FormDescription className="mt-2">
                        Upload a recent utility bill or bank statement
                      </FormDescription>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate("/my-shop")}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Submit Verification</Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VerificationForm;
