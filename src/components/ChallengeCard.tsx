import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

interface ChallengeCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  progress: number;
  totalChallenges: number;
  completedChallenges: number;
}

const ChallengeCard = ({ 
  icon: Icon, 
  title, 
  description, 
  progress: initialProgress, 
  totalChallenges,
  completedChallenges: initialCompleted 
}: ChallengeCardProps) => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(initialProgress);
  const [completedChallenges, setCompletedChallenges] = useState(initialCompleted);

  useEffect(() => {
    // Update progress from localStorage for different modules
    if (title === "Phishing Simulation") {
      const savedProgress = localStorage.getItem('phishing-progress');
      if (savedProgress) {
        const progressData = JSON.parse(savedProgress);
        const newProgress = Math.round((progressData.completed / progressData.total) * 100);
        setProgress(newProgress);
        setCompletedChallenges(progressData.completed);
      }
    } else if (title === "CTF Challenges") {
      const savedProgress = localStorage.getItem('least-privilege-progress');
      if (savedProgress) {
        const progressData = JSON.parse(savedProgress);
        const newProgress = Math.round((progressData.completed / progressData.total) * 100);
        setProgress(newProgress);
        setCompletedChallenges(progressData.completed);
      }
    } else if (title === "Encryption") {
      const savedProgress = localStorage.getItem('encryption-progress');
      if (savedProgress) {
        const progressData = JSON.parse(savedProgress);
        const newProgress = Math.round((progressData.completed / progressData.total) * 100);
        setProgress(newProgress);
        setCompletedChallenges(progressData.completed);
      }
    }
  }, [title]);

  const handleStartLearning = () => {
    if (title === "Phishing Simulation") {
      navigate('/phishing-intro');
    } else if (title === "CTF Challenges") {
      navigate('/least-privilege-intro');
    } else if (title === "Secure Coding") {
      navigate('/secure-coding-intro');
    } else if (title === "Security Quiz") {
      navigate('/security-quiz-intro');
    } else if (title === "Encryption") {
      navigate('/encryption-intro');
    } else {
      // Handle other modules in the future
      console.log(`Starting ${title} module`);
    }
  };
  return (
    <div className="cyber-card p-6 group">
      <div className="flex items-center mb-4">
        <div className="p-3 rounded-xl bg-primary/20 group-hover:bg-primary/30 transition-colors">
          <Icon className="w-8 h-8 text-[hsl(var(--cyber-cyan))]" />
        </div>
      </div>
      
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
        {description}
      </p>
      
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">Progress</span>
          <span className="text-sm font-bold text-[hsl(var(--cyber-cyan))]">
            {progress}%
          </span>
        </div>
        <div className="progress-bar h-2">
          <div 
            className="progress-fill" 
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      
      <div className="flex justify-between items-center mb-6">
        <span className="text-sm text-muted-foreground">
          {completedChallenges}/{totalChallenges} challenges
        </span>
      </div>
      
      <Button className="cyber-button w-full" onClick={handleStartLearning}>
        Start Learning
      </Button>
    </div>
  );
};

export default ChallengeCard;