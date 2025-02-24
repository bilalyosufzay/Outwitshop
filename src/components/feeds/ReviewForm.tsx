
import { Camera, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface Shop {
  id: number;
  name: string;
}

export const ReviewForm = ({ shops }: { shops: Shop[] }) => {
  const { toast } = useToast();
  const form = useForm({
    defaultValues: {
      review: "",
      image: null as File | null,
      shopId: ""
    }
  });

  const handleCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const video = document.createElement('video');
      video.srcObject = stream;
      await video.play();

      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d')?.drawImage(video, 0, 0);

      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], "review-image.jpg", { type: "image/jpeg" });
          form.setValue("image", file);
          toast({
            title: "Image captured",
            description: "Your photo has been captured successfully"
          });
        }
      }, 'image/jpeg');

      stream.getTracks().forEach(track => track.stop());
    } catch (error) {
      toast({
        title: "Camera Error",
        description: "Unable to access camera. Please check permissions.",
        variant: "destructive"
      });
    }
  };

  const onSubmit = (data: any) => {
    console.log("Review submitted:", data);
    toast({
      title: "Review Posted",
      description: "Your review has been posted successfully"
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full mb-4">
          <Plus className="w-4 h-4 mr-2" />
          Add Review
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Post a Review</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="shopId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Shop</FormLabel>
                  <FormControl>
                    <select 
                      {...field} 
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="">Select a shop</option>
                      {shops.map(shop => (
                        <option key={shop.id} value={shop.id}>
                          {shop.name}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="review"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Review</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Write your review here..." 
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="space-y-2">
              <FormLabel>Add Photo</FormLabel>
              <Button 
                type="button" 
                variant="outline" 
                className="w-full"
                onClick={handleCapture}
              >
                <Camera className="w-4 h-4 mr-2" />
                Take Photo
              </Button>
            </div>

            <Button type="submit" className="w-full">
              Post Review
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
