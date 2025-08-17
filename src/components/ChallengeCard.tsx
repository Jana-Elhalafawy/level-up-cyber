import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

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
  progress, 
  totalChallenges,
  completedChallenges 
}: ChallengeCardProps) => {
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
      
      <Button className="cyber-button w-full">
        Start Learning
      </Button>
    </div>
  );
};

export default ChallengeCard;