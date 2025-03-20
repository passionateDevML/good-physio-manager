
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleGoHome = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center p-8 bg-white rounded-lg shadow-soft max-w-md">
        <h1 className="text-6xl font-bold mb-4 text-physio-500">404</h1>
        <p className="text-xl text-gray-600 mb-4">Page non trouvée</p>
        <p className="text-gray-500 mb-6">
          La page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        <div className="flex flex-col md:flex-row gap-3 justify-center">
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={handleGoBack}
          >
            <ArrowLeft className="h-4 w-4" />
            Retour
          </Button>
          <Button 
            className="bg-physio-500 hover:bg-physio-600"
            onClick={handleGoHome}
          >
            Accéder au tableau de bord
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
