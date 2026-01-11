import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "@/integrations/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { FileText, LogOut, User, Sparkles } from "lucide-react";
// import types from Firebase as needed
import ResumeBuilder from "@/components/ResumeBuilder";
import icon from "../assets/favicon.ico"

const Dashboard = () => {
  const navigate = useNavigate();
const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
      if (!user) {
        navigate("/login");
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out successfully");
      navigate("/resumes");
    } catch {
      toast.error("Error logging out");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img src={icon} alt="" />
            <span className="text-xl font-bold text-foreground">ResumeAI</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
              <User className="w-4 h-4" />
              <span>{user?.email}</span>
            </div>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Resume Builder
          </h1>
          <p className="text-muted-foreground flex items-center gap-2">
            Create your professional resume with AI-powered suggestions
          </p>
        </div>

        <ResumeBuilder userId={user?.id || ""} />
      </main>
    </div>
  );
};

export default Dashboard;