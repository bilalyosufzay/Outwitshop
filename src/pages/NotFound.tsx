import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-4xl font-bold text-red-600">404</h1>
      <p className="mt-4 text-gray-600">Oops! The page you're looking for doesn't exist.</p>
      <Link
        to="/"
        className="mt-6 text-blue-500 hover:underline"
      >
        Go back to Home
      </Link>
    </div>
  );
}
