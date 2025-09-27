import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Shield, Lock, Eye, AlertTriangle } from "lucide-react";
import { useState } from "react";
import encryptionHero from "@/assets/encryption-lab-hero.jpg";

const EncryptionIntro = () => {
  const navigate = useNavigate();
  const [showRules, setShowRules] = useState(false);

  return (
    <div className="min-h-screen cyber-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">
            Encryption — <span className="text-[hsl(var(--cyber-cyan))]">Digital Forensics Lab</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Decrypt the hacker's files to uncover critical evidence
          </p>
        </div>

        {/* Hero Image */}
        <div className="cyber-card p-8 mb-8 text-center">
          <img 
            src={encryptionHero} 
            alt="Digital forensics encryption lab setup"
            className="w-full max-w-4xl mx-auto rounded-xl mb-6"
          />
        </div>

        {/* Mission Briefing */}
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="cyber-card p-6">
            <div className="flex items-center mb-4">
              <Eye className="w-8 h-8 text-[hsl(var(--cyber-cyan))] mr-3" />
              <h2 className="text-2xl font-bold">Mission Briefing</h2>
            </div>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                <strong className="text-foreground">You are a digital forensics specialist.</strong> A hacker's machine has been seized after an incident. 
                Your mission: decrypt ten encrypted files found on the hacker's PC to recover evidence, 
                puzzle out the hacker's methods, and assemble findings for the incident report.
              </p>
              <p>
                <strong className="text-foreground">Each file uses a Caesar-cipher-style encryption.</strong> Progress from easier to harder. 
                Time is limited per file — if the timer hits zero you get 0 points for that file.
              </p>
              <p className="text-[hsl(var(--cyber-cyan))] font-semibold">
                Good luck, investigator.
              </p>
            </div>
          </div>

          {/* Caesar Cipher Basics */}
          <div className="cyber-card p-6">
            <div className="flex items-center mb-4">
              <Lock className="w-8 h-8 text-[hsl(var(--cyber-cyan))] mr-3" />
              <h2 className="text-2xl font-bold">Caesar Cipher Basics</h2>
            </div>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <ul className="list-disc list-inside space-y-2">
                <li><strong className="text-foreground">What it is:</strong> A substitution cipher where each letter is shifted by a fixed number of positions in the alphabet</li>
                <li><strong className="text-foreground">Why it matters:</strong> Real investigators must recognize simple substitution patterns in digital evidence</li>
                <li><strong className="text-foreground">Practice importance:</strong> Builds pattern recognition skills essential for forensic analysis</li>
                <li><strong className="text-foreground">Detection method:</strong> Look for frequency patterns and try different shift values systematically</li>
              </ul>
            </div>
          </div>

          {/* Quick Rules */}
          <div className="cyber-card p-6">
            <div className="flex items-center mb-4">
              <AlertTriangle className="w-8 h-8 text-[hsl(var(--cyber-cyan))] mr-3" />
              <h2 className="text-2xl font-bold">Quick Rules</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-background/50">
                <h3 className="font-semibold mb-2 text-[hsl(var(--cyber-cyan))]">Scoring</h3>
                <p className="text-sm text-muted-foreground">Points increase with difficulty. Hints cost points/time.</p>
              </div>
              <div className="p-4 rounded-lg bg-background/50">
                <h3 className="font-semibold mb-2 text-[hsl(var(--cyber-cyan))]">Time Limits</h3>
                <p className="text-sm text-muted-foreground">Each file has a countdown timer. Zero time = zero points.</p>
              </div>
              <div className="p-4 rounded-lg bg-background/50">
                <h3 className="font-semibold mb-2 text-[hsl(var(--cyber-cyan))]">Attempts</h3>
                <p className="text-sm text-muted-foreground">Maximum 5 attempts per file before lockout.</p>
              </div>
              <div className="p-4 rounded-lg bg-background/50">
                <h3 className="font-semibold mb-2 text-[hsl(var(--cyber-cyan))]">Evidence</h3>
                <p className="text-sm text-muted-foreground">Decrypted files build your final incident report.</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-4">
            <Button 
              className="cyber-button text-lg px-8 py-3"
              onClick={() => navigate('/encryption-game')}
            >
              Start Lab
            </Button>
            <Button 
              variant="outline"
              className="text-lg px-8 py-3"
              onClick={() => setShowRules(!showRules)}
            >
              {showRules ? 'Hide Rules' : 'Read Full Rules'}
            </Button>
          </div>

          {/* Full Rules Panel */}
          {showRules && (
            <div className="cyber-card p-6">
              <h3 className="text-xl font-bold mb-4 text-[hsl(var(--cyber-cyan))]">Complete Rules & Scoring</h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Success/Failure Conditions:</h4>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Correct decryption within time limit = full points</li>
                    <li>Timer reaches zero = 0 points for that file</li>
                    <li>5 wrong attempts = file locks, 0 points</li>
                    <li>Skip file = 0 points but can continue</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Scoring System:</h4>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Base points increase per level (10 → 50 points)</li>
                    <li>Hints deduct points AND time</li>
                    <li>Maximum possible score: 278 points</li>
                    <li>Final rank based on total score</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-foreground mb-2">Hint System:</h4>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Up to 2 hints per file available</li>
                    <li>Each hint costs points and reduces timer</li>
                    <li>Hints provide clues, never full answers</li>
                    <li>Use strategically for maximum score</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-foreground mb-2">Accessibility:</h4>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Keyboard navigation supported</li>
                    <li>Adjustable font sizes available</li>
                    <li>Color contrast toggle for readability</li>
                    <li>Progress auto-saved locally</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EncryptionIntro;