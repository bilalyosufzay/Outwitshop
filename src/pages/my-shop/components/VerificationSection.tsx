
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { toast } from "sonner";
import { Shop, VerificationDocument } from "@/types/shop";
import { Loader, Shield, Upload } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface VerificationSectionProps {
  shop: Shop;
  onVerificationUpdate: () => void;
}

export const VerificationSection = ({ shop, onVerificationUpdate }: VerificationSectionProps) => {
  const { user } = useAuth();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>, type: VerificationDocument['type']) => {
    const file = event.target.files?.[0];
    if (!file || !user) return;

    setIsUploading(true);
    setUploadProgress(0);
    
    try {
      // Upload file to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const filePath = `${shop.id}/${type}_${Date.now()}.${fileExt}`;
      
      const { error: uploadError, data } = await supabase.storage
        .from('verification_documents')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (uploadError) throw uploadError;

      // Get the public URL
      const { data: { publicUrl } } = supabase.storage
        .from('verification_documents')
        .getPublicUrl(filePath);

      // Update shop verification documents
      const newDocument: VerificationDocument = {
        type,
        url: publicUrl,
        uploaded_at: new Date().toISOString(),
      };

      const { error: updateError } = await supabase
        .from('shops')
        .update({
          verification_documents: [...(shop.verification_documents || []), newDocument],
          verification_status: 'pending',
          verification_submitted_at: new Date().toISOString(),
        })
        .eq('id', shop.id);

      if (updateError) throw updateError;

      toast.success('Document uploaded successfully');
      onVerificationUpdate();
    } catch (error: any) {
      toast.error('Error uploading document: ' + error.message);
    } finally {
      setIsUploading(false);
      setUploadProgress(100);
    }
  };

  const getStatusBadgeColor = () => {
    switch (shop.verification_status) {
      case 'approved':
        return 'bg-green-500';
      case 'rejected':
        return 'bg-red-500';
      default:
        return 'bg-yellow-500';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Shield className={`h-8 w-8 ${shop.verified ? 'text-green-500' : 'text-gray-400'}`} />
        <div>
          <h3 className="text-lg font-semibold">Seller Verification</h3>
          <p className="text-sm text-muted-foreground">
            Verify your identity and business to build trust with buyers
          </p>
        </div>
        <span className={`ml-auto px-3 py-1 rounded-full text-white text-sm ${getStatusBadgeColor()}`}>
          {shop.verification_status.charAt(0).toUpperCase() + shop.verification_status.slice(1)}
        </span>
      </div>

      {shop.verification_rejected_reason && (
        <Alert variant="destructive">
          <AlertTitle>Verification Rejected</AlertTitle>
          <AlertDescription>{shop.verification_rejected_reason}</AlertDescription>
        </Alert>
      )}

      <div className="grid gap-6">
        <div>
          <Label>Business License</Label>
          <div className="mt-2">
            <Input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e) => handleFileUpload(e, 'business_license')}
              disabled={isUploading}
            />
          </div>
        </div>

        <div>
          <Label>ID Card</Label>
          <div className="mt-2">
            <Input
              type="file"
              accept=".jpg,.jpeg,.png"
              onChange={(e) => handleFileUpload(e, 'id_card')}
              disabled={isUploading}
            />
          </div>
        </div>

        <div>
          <Label>Proof of Address</Label>
          <div className="mt-2">
            <Input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e) => handleFileUpload(e, 'proof_of_address')}
              disabled={isUploading}
            />
          </div>
        </div>
      </div>

      {isUploading && (
        <div className="space-y-2">
          <Progress value={uploadProgress} className="w-full" />
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Loader className="h-4 w-4 animate-spin" />
            Uploading document...
          </div>
        </div>
      )}

      {shop.verification_documents?.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Uploaded Documents</h4>
          <div className="grid gap-2">
            {shop.verification_documents.map((doc, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <Upload className="h-4 w-4" />
                <span>{doc.type.split('_').join(' ')} - {new Date(doc.uploaded_at).toLocaleDateString()}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
