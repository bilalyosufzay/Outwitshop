
import { BackButton } from "@/components/BackButton";

export default function Orders() {
  return (
    <div className="min-h-screen bg-background pb-20 relative">
      <BackButton />
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mt-8">My Orders</h1>
        <p className="text-muted-foreground">View and track your order history.</p>
      </div>
    </div>
  );
}
