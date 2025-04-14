
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center max-w-md px-4">
        <h1 className="text-6xl font-bold mb-4 text-eclipse-500">404</h1>
        <p className="text-xl text-gray-700 mb-6">
          Oops! The page you're looking for doesn't exist
        </p>
        <p className="text-gray-500 mb-8">
          The page at <code className="bg-gray-200 px-2 py-1 rounded">{location.pathname}</code> could not be found
        </p>
        <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3 justify-center">
          <Button asChild>
            <Link to="/">
              <ArrowLeft size={16} className="mr-2" />
              Return Home
            </Link>
          </Button>
          <Button variant="outline" onClick={() => window.history.back()}>
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
