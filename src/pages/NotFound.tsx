import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4 bg-gradient-to-b from-yellow-300 to-yellow-600 bg-clip-text text-transparent">404</h1>
        <p className="text-xl text-muted-foreground mb-4">We couldn’t find that page.</p>
        <Link to="/" className="text-yellow-400 hover:text-yellow-300 underline">
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;