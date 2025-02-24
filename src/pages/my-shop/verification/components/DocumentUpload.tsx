
import { Button } from "@/components/ui/button";
import { FormLabel, FormDescription } from "@/components/ui/form";
import { Upload } from "lucide-react";

export const DocumentUpload = () => {
  return (
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
  );
};
