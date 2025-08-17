import { User, Trophy, Target, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="w-full mb-8">
      {/* Top Navigation */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold glow-text mb-2">
            CyberSec Arena
          </h1>
          <p className="text-muted-foreground text-lg">
            Master cybersecurity through gamified challenges
          </p>
        </div>
        <Button variant="outline" size="lg" className="border-primary/50 hover:border-primary">
          <User className="w-5 h-5 mr-2" />
          Profile
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="stat-card">
          <div className="flex items-center justify-center mb-3">
            <Trophy className="w-8 h-8 text-[hsl(var(--cyber-cyan))]" />
          </div>
          <h3 className="text-2xl font-bold mb-1">Level 7</h3>
          <p className="text-muted-foreground">2450 Total Points</p>
        </div>

        <div className="stat-card">
          <div className="flex items-center justify-center mb-3">
            <Target className="w-8 h-8 text-[hsl(var(--cyber-purple))]" />
          </div>
          <h3 className="text-2xl font-bold mb-1">47/70</h3>
          <p className="text-muted-foreground">Challenges Completed</p>
        </div>

        <div className="stat-card">
          <div className="flex items-center justify-center mb-3">
            <Flame className="w-8 h-8 text-[hsl(var(--cyber-orange))]" />
          </div>
          <h3 className="text-2xl font-bold mb-1">7 Days</h3>
          <p className="text-muted-foreground">Active Streak</p>
        </div>

        <div className="stat-card">
          <div className="flex items-center justify-center mb-3">
            <div className="flex space-x-1">
              <div className="w-6 h-6 rounded-full bg-[hsl(var(--cyber-green))] flex items-center justify-center text-xs font-bold">
                ✓
              </div>
              <div className="w-6 h-6 rounded-full bg-[hsl(var(--cyber-blue))] flex items-center justify-center text-xs font-bold">
                ⚡
              </div>
              <div className="w-6 h-6 rounded-full bg-[hsl(var(--cyber-cyan))] flex items-center justify-center text-xs font-bold">
                🛡️
              </div>
            </div>
          </div>
          <h3 className="text-lg font-bold mb-1">Achievements</h3>
          <p className="text-muted-foreground text-sm">First Blood, SQL Slayer, Code Guardian</p>
        </div>
      </div>
    </header>
  );
};

export default Header;