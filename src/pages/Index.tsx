
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Index() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <h1 className="text-4xl font-bold text-gray-900">Welcome to Outwit Shop</h1>
        <p className="mt-3 text-lg text-gray-600">Your premier online shopping destination</p>
        <div className="mt-8 space-y-4">
          <Button className="w-full" asChild>
            <Link to="/auth/login">Login</Link>
          </Button>
          <Button variant="outline" className="w-full" asChild>
            <Link to="/auth/signup">Sign Up</Link>
          </Button>
          <Button variant="secondary" className="w-full" asChild>
            <Link to="/products">Browse Products</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
