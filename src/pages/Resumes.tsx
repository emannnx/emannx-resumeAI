import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "@/integrations/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/integrations/firebase";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { FileText, Plus, Trash2, Edit, LogOut, User } from "lucide-react";
// import any needed firebase types
import CVTypeDialog from "@/components/CVTypeDialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import icon from "../assets/favicon.ico"


interface Resume {
  id: string;
  title: string;
  updated_at: string;
}

const Resumes = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any | null>(null);
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCVTypeDialog, setShowCVTypeDialog] = useState(false);

  useEffect(() => {
    let unsubUser: (() => void) | undefined;
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user) {
        loadResumes();
      } else {
        navigate("/login");
      }
    });
    unsubUser = unsubscribe;
    return () => {
      if (unsubUser) unsubUser();
    };
  }, [navigate]);

  const loadResumes = async () => {
    try {
      const snapshot = await getDocs(collection(db, "resumes"));
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Resume[];
      setResumes(items);
    } catch (error) {
      toast.error("Failed to load resumes");
      console.error(error);
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, "resumes", id));
      toast.success("Resume deleted successfully");
      loadResumes();
    } catch {
      toast.error("Failed to delete resume");
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
      toast.success("Logged out successfully!");
    } catch (err) {
      toast.error("Error logging out");
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleCVTypeSelect = (type: "header" | "full") => {
    setShowCVTypeDialog(false);
    navigate(`/dashboard?type=${type}`);
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
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">My Resumes</h1>
            <p className="text-muted-foreground">Manage all your resumes in one place</p>
          </div>
          <Button
            onClick={() => setShowCVTypeDialog(true)}
            size="lg"
            className="gap-2"
          >
            <Plus className="w-5 h-5" />
            Create New CV
          </Button>
        </div>

        {resumes.length === 0 ? (
          <Card className="p-12 text-center">
            <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-foreground mb-2">No resumes yet</h2>
            <p className="text-muted-foreground mb-6">Create your first resume to get started</p>
            <Button onClick={() => setShowCVTypeDialog(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Create CV
            </Button>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resumes.map((resume) => (
              <Card key={resume.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <img src={icon} alt="" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{resume.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        Updated {formatDate(resume.updated_at)}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => navigate(`/dashboard?id=${resume.id}`)}
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Resume</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete "{resume.title}"? This action cannot be
                          undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDelete(resume.id)}>
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>

      <CVTypeDialog
        open={showCVTypeDialog}
        onSelect={handleCVTypeSelect}
      />
    </div>
  );
};

export default Resumes;
