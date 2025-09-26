import { Shield, Users, Lock, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/least-privilege-hero.png";

const LeastPrivilegeIntro = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="p-4 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20">
              <Lock className="w-16 h-16 text-[hsl(var(--cyber-cyan))]" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4">Least Privilege</h1>
          <p className="text-xl text-muted-foreground">
            Give only the access people need
          </p>
        </div>

        {/* Hero Image */}
        <div className="cyber-card p-8 mb-12">
          <img 
            src={heroImage} 
            alt="Least Privilege Concept" 
            className="w-full max-w-2xl mx-auto rounded-lg mb-6"
          />
        </div>

        {/* Content */}
        <div className="cyber-card p-8 mb-8">
          <div className="prose max-w-none">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">What is Least Privilege?</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Least Privilege is a security principle that says: each user, process, or device should have 
                only the minimum privileges necessary to perform its job. This reduces accidental damage, 
                insider threats, and the impact of stolen credentials.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <Users className="w-5 h-5 text-[hsl(var(--cyber-cyan))]" />
                  Key Checks
                </h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Separate roles (admin vs normal user)</li>
                  <li>• Grant read-only when possible</li>
                  <li>• Use temporary elevation instead of permanent admin rights</li>
                  <li>• Don't use shared admin accounts</li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-[hsl(var(--cyber-cyan))]" />
                  Why It Matters
                </h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Reduces insider threat risk</li>
                  <li>• Limits damage from compromised accounts</li>
                  <li>• Prevents accidental data breaches</li>
                  <li>• Improves compliance and audit results</li>
                </ul>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Examples</h3>
              <div className="space-y-3 text-muted-foreground">
                <div className="p-4 rounded-lg bg-background/50 border border-border/50">
                  <strong className="text-foreground">Customer Support Agent:</strong> Needs customer records (read) 
                  but not database admin access.
                </div>
                <div className="p-4 rounded-lg bg-background/50 border border-border/50">
                  <strong className="text-foreground">System Admin:</strong> Needs ability to deploy code 
                  and modify server config.
                </div>
                <div className="p-4 rounded-lg bg-background/50 border border-border/50">
                  <strong className="text-foreground">Marketing Contractor:</strong> Can upload content 
                  but shouldn't access customer data.
                </div>
              </div>
            </div>

            <div className="text-center">
              <Button 
                onClick={() => navigate('/least-privilege-game')}
                className="cyber-button text-lg px-8 py-4"
              >
                <Shield className="w-5 h-5 mr-2" />
                Start Simulation
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeastPrivilegeIntro;