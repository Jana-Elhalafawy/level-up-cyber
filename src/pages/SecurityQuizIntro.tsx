import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Shield, AlertTriangle, Eye } from "lucide-react";
import overshareHero from "@/assets/oversharing-hero.jpg";

const SecurityQuizIntro = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen cyber-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">
            Security Quiz: <span className="text-[hsl(var(--cyber-cyan))]">Oversharing Investigation</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Learn about the dangers of oversharing on social media through a real-world case study
          </p>
        </div>

        {/* Hero Image */}
        <div className="cyber-card p-8 mb-8 text-center">
          <img 
            src={overshareHero} 
            alt="Social media oversharing concept"
            className="w-full max-w-2xl mx-auto rounded-xl mb-6"
          />
        </div>

        {/* Content Sections */}
        <div className="max-w-4xl mx-auto space-y-8">
          {/* What is Oversharing */}
          <div className="cyber-card p-6">
            <div className="flex items-center mb-4">
              <AlertTriangle className="w-8 h-8 text-[hsl(var(--cyber-cyan))] mr-3" />
              <h2 className="text-2xl font-bold">What is Oversharing?</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Oversharing on social media happens when people post too much personal information online. 
              This includes location data, daily routines, personal documents, and private details that 
              can be used by cybercriminals to target victims with personalized attacks.
            </p>
          </div>

          {/* Case Study */}
          <div className="cyber-card p-6">
            <div className="flex items-center mb-4">
              <Eye className="w-8 h-8 text-[hsl(var(--cyber-cyan))] mr-3" />
              <h2 className="text-2xl font-bold">Case Study: Laila's Story</h2>
            </div>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                <strong className="text-foreground">Meet Laila:</strong> A university student who loves sharing her daily life on social media. 
                She posts Snapchat streaks showing her daily routes, Instagram stories with personal documents, 
                and shares photos from her favorite places.
              </p>
              <p>
                <strong className="text-foreground">The Problem:</strong> A cybercriminal has been monitoring Laila's posts, 
                collecting seemingly innocent information to build a detailed profile of her life, habits, and vulnerabilities.
              </p>
              <p>
                <strong className="text-foreground">Your Mission:</strong> You are a digital forensics investigator. 
                Your job is to analyze Laila's social media activity, identify the risks, and understand how 
                the information could be used against her.
              </p>
            </div>
          </div>

          {/* Key Dangers */}
          <div className="cyber-card p-6">
            <div className="flex items-center mb-4">
              <Shield className="w-8 h-8 text-[hsl(var(--cyber-cyan))] mr-3" />
              <h2 className="text-2xl font-bold">Key Dangers of Oversharing</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-background/50">
                <h3 className="font-semibold mb-2 text-[hsl(var(--cyber-cyan))]">Location Tracking</h3>
                <p className="text-sm text-muted-foreground">Daily patterns reveal home, work, and routine locations</p>
              </div>
              <div className="p-4 rounded-lg bg-background/50">
                <h3 className="font-semibold mb-2 text-[hsl(var(--cyber-cyan))]">Personal Information</h3>
                <p className="text-sm text-muted-foreground">Documents and IDs exposed in photos</p>
              </div>
              <div className="p-4 rounded-lg bg-background/50">
                <h3 className="font-semibold mb-2 text-[hsl(var(--cyber-cyan))]">Social Engineering</h3>
                <p className="text-sm text-muted-foreground">Information used to create convincing phishing attacks</p>
              </div>
              <div className="p-4 rounded-lg bg-background/50">
                <h3 className="font-semibold mb-2 text-[hsl(var(--cyber-cyan))]">Identity Theft</h3>
                <p className="text-sm text-muted-foreground">Combined data used for account takeovers</p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <Button 
              className="cyber-button text-lg px-8 py-3"
              onClick={() => navigate('/security-quiz-game')}
            >
              Start Investigation
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityQuizIntro;