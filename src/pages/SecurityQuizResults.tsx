import { Button } from "@/components/ui/button";
import { useLocation, useNavigate } from "react-router-dom";
import { Trophy, Award, AlertCircle, Home } from "lucide-react";
import finalScene from "@/assets/quiz-final-scene.jpg";

const SecurityQuizResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, totalQuestions } = location.state || { score: 0, totalQuestions: 5 };

  const getTitle = (score: number) => {
    if (score >= 50) return "Cyber Detective";
    if (score >= 30) return "Investigator in Training";
    return "Be More Careful";
  };

  const getIcon = (score: number) => {
    if (score >= 50) return Trophy;
    if (score >= 30) return Award;
    return AlertCircle;
  };

  const title = getTitle(score);
  const Icon = getIcon(score);

  const storyParts = [
    {
      title: "Part 1: Snapchat Streaks",
      content: "Laila shared daily Snapchat streaks showing her regular routes - the same street corner, bus stop, and café every morning.",
      lesson: "Don't share daily patterns and routine locations.",
      risk: "High"
    },
    {
      title: "Part 2: Instagram Stories", 
      content: "She posted photos containing her gym membership card with her full name, her university logo, and tagged food locations.",
      lesson: "Always blur personal information in documents before sharing.",
      risk: "Critical"
    },
    {
      title: "Part 3: Information Collection",
      content: "A cybercriminal collected all this scattered information, building a detailed profile of Laila's habits, locations, and personal details.",
      lesson: "Small pieces of information can be combined for larger attacks.",
      risk: "High"
    },
    {
      title: "Part 4: The Attack",
      content: "Using her information, the hacker sent a personalized phishing email mentioning her university and gym, making it seem legitimate.",
      lesson: "Oversharing makes phishing attacks more convincing and targeted.",
      risk: "Critical"
    },
    {
      title: "Part 5: Real-World Consequences", 
      content: "With access to her rideshare receipts and location patterns, the attacker could predict exactly where and when to find her.",
      lesson: "Digital stalking can lead to real-world safety threats.",
      risk: "Extreme"
    }
  ];

  return (
    <div className="min-h-screen cyber-background">
      <div className="container mx-auto px-4 py-8">
        {/* Results Header */}
        <div className="text-center mb-8">
          <div className="cyber-card p-8 max-w-2xl mx-auto">
            <Icon className="w-16 h-16 text-[hsl(var(--cyber-cyan))] mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-2">Investigation Complete</h1>
            <h2 className="text-2xl text-[hsl(var(--cyber-cyan))] mb-4">{title}</h2>
            <div className="text-4xl font-bold mb-2">{score}/60 Points</div>
            <div className="text-muted-foreground">
              {Math.round((score / 60) * 100)}% Investigation Accuracy
            </div>
          </div>
        </div>

        {/* Final Scene */}
        <div className="cyber-card p-6 mb-8 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold mb-4 text-center">The Full Story: Laila's Case</h3>
          <img 
            src={finalScene} 
            alt="The consequence of oversharing"
            className="w-full max-w-2xl mx-auto rounded-xl mb-6"
          />
        </div>

        {/* Story Breakdown */}
        <div className="max-w-4xl mx-auto space-y-6 mb-8">
          {storyParts.map((part, index) => (
            <div key={index} className="cyber-card p-6">
              <div className="flex items-start justify-between mb-3">
                <h4 className="text-xl font-bold text-[hsl(var(--cyber-cyan))]">{part.title}</h4>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  part.risk === 'Extreme' ? 'bg-red-500/20 text-red-400' :
                  part.risk === 'Critical' ? 'bg-orange-500/20 text-orange-400' :
                  'bg-yellow-500/20 text-yellow-400'
                }`}>
                  {part.risk} Risk
                </span>
              </div>
              <p className="text-muted-foreground mb-4">{part.content}</p>
              <div className="p-3 rounded-lg bg-[hsl(var(--cyber-cyan))]/10 border border-[hsl(var(--cyber-cyan))]/30">
                <p className="font-semibold text-[hsl(var(--cyber-cyan))] text-sm">Key Lesson:</p>
                <p className="text-sm">{part.lesson}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Protection Tips */}
        <div className="cyber-card p-6 mb-8 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold mb-4 text-[hsl(var(--cyber-cyan))]">How to Protect Yourself</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-background/50">
              <h4 className="font-semibold mb-2">Think Before You Share</h4>
              <p className="text-sm text-muted-foreground">Ask: "Could this information be used against me?"</p>
            </div>
            <div className="p-4 rounded-lg bg-background/50">
              <h4 className="font-semibold mb-2">Limit Location Sharing</h4>
              <p className="text-sm text-muted-foreground">Avoid posting real-time locations and daily patterns</p>
            </div>
            <div className="p-4 rounded-lg bg-background/50">
              <h4 className="font-semibold mb-2">Privacy Settings</h4>
              <p className="text-sm text-muted-foreground">Make your profiles private and review who can see your posts</p>
            </div>
            <div className="p-4 rounded-lg bg-background/50">
              <h4 className="font-semibold mb-2">Document Safety</h4>
              <p className="text-sm text-muted-foreground">Never share photos of IDs, cards, or documents with personal info</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="text-center space-y-4">
          <Button 
            onClick={() => navigate('/security-quiz-intro')}
            variant="outline"
            className="mr-4"
          >
            Review Lesson
          </Button>
          <Button 
            onClick={() => navigate('/')}
            className="cyber-button"
          >
            <Home className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SecurityQuizResults;