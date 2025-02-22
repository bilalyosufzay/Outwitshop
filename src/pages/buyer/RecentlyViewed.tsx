
import { BackButton } from "@/components/BackButton";

export default function RecentlyViewed() {
  return (
    <div className="min-h-screen bg-background pb-20 relative">
      <BackButton />
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mt-8">Recently Viewed</h1>
        <p className="text-muted-foreground">Products you've viewed recently.</p>
      </div>
    </div>
  );
}
