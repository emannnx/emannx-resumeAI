import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { FileText, Sparkles, Download, Eye } from "lucide-react";
import icon from "../assets/favicon.ico"


const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img src={icon} alt="" />
            <span className="text-xl font-bold text-foreground">ResumeAI</span>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => navigate("/login")}>
              Login
            </Button>
            <Button onClick={() => navigate("/signup")}>
              Sign Up
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            Build Your Perfect Resume
            <span className="block text-primary mt-2">in Minutes</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Create professional, ATS-friendly resumes with AI-powered suggestions. 
            Choose from beautiful templates and export to PDF instantly.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button size="lg" onClick={() => navigate("/signup")} className="shadow-medium">
              Get Started Free
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate("/login")}>
              Login
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-muted py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            Everything You Need to Stand Out
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-card p-8 rounded-xl shadow-soft border border-border">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">AI-Powered Suggestions</h3>
              <p className="text-muted-foreground">
                Get intelligent recommendations to improve your resume content and make it stand out to recruiters.
              </p>
            </div>

            <div className="bg-card p-8 rounded-xl shadow-soft border border-border">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Eye className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">Professional Templates</h3>
              <p className="text-muted-foreground">
                Choose from multiple professionally designed templates that work with any industry or experience level.
              </p>
            </div>

            <div className="bg-card p-8 rounded-xl shadow-soft border border-border">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Download className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">One-Click PDF Export</h3>
              <p className="text-muted-foreground">
                Download your resume as a perfectly formatted PDF ready to send to employers immediately.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <div className="max-w-3xl mx-auto bg-gradient-hero rounded-2xl p-12 shadow-medium">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Land Your Dream Job?
          </h2>
          <p className="text-white/90 text-lg mb-8">
            Join thousands of professionals who've created winning resumes with ResumeAI
          </p>
          <Button size="lg" variant="secondary" onClick={() => navigate("/signup")}>
            Start Building Now
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-muted">
        <div className="container mx-auto px-6 py-8 text-center text-muted-foreground">
          <p>&copy; 2025 ResumeAI. Built with care for your career success.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;