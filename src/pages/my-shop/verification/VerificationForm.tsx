
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { BusinessInformation } from "./components/BusinessInformation";
import { ContactInformation } from "./components/ContactInformation";
import { BankingInformation } from "./components/BankingInformation";
import { DocumentUpload } from "./components/DocumentUpload";
import { verificationSchema, type VerificationFormValues } from "./schema";

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
                <BusinessInformation form={form} />
                <ContactInformation form={form} />
                <BankingInformation form={form} />
                <DocumentUpload />

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
