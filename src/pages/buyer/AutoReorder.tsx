
import { BackButton } from "@/components/BackButton";

export default function AutoReorder() {
  return (
    <div className="min-h-screen bg-background pb-20 relative">
      <BackButton />
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mt-8">Auto-Reorder Essentials</h1>
        <p className="text-muted-foreground">Manage your recurring purchases and subscriptions.</p>
      </div>
    </div>
  );
}
