import { useState, useEffect } from "react";
import { AlertTriangle, Shield, Clock, Home, RotateCcw, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import incidentImage from "@/assets/incident-data-breach.png";

interface Incident {
  id: string;
  title: string;
  severity: "Low" | "Medium" | "High";
  description: string;
  evidence: string;
  implicatedAccounts: string[];
  rootCause: string;
}

type PrivilegeLevel = 
  | "no-access"
  | "read-only"
  | "read-write"
  | "upload-submit"
  | "limited-admin"
  | "full-admin"
  | "temporary-elevated"
  | "customer-self-service";

const privilegeOptions = [
  { value: "no-access", label: "No Access" },
  { value: "read-only", label: "Read-Only" },
  { value: "read-write", label: "Read / Write" },
  { value: "upload-submit", label: "Upload / Submit" },
  { value: "limited-admin", label: "Limited Admin" },
  { value: "full-admin", label: "Full Admin" },
  { value: "temporary-elevated", label: "Temporary Elevated" },
  { value: "customer-self-service", label: "Customer (Self-Service)" }
];

const generateIncidents = (assignments: Record<string, PrivilegeLevel>, accounts: any[]): Incident[] => {
  const incidents: Incident[] = [];
  
  // Check for customer admin privileges
  const customerAdminIssues = accounts.filter(acc => 
    (acc.id === "fatima" || acc.id === "ahmed") && 
    (assignments[acc.id] === "full-admin" || assignments[acc.id] === "limited-admin")
  );
  
  if (customerAdminIssues.length > 0) {
    incidents.push({
      id: "customer-breach",
      title: "Customer Data Breach",
      severity: "High",
      description: "We detected unauthorized access to multiple customer records. Logs show customer accounts requested customer records across multiple user IDs within 2 minutes.",
      evidence: `[2024-01-15 14:32] INFO: Account ${customerAdminIssues[0].email} accessed customer_records table\n[2024-01-15 14:32] WARN: Mass customer data query executed\n[2024-01-15 14:33] ERROR: Unauthorized cross-customer data access detected`,
      implicatedAccounts: customerAdminIssues.map(acc => acc.id),
      rootCause: "Customer account had admin privileges"
    });
  }

  // Check for intern admin privileges
  if (assignments["karim"] === "full-admin" || assignments["karim"] === "limited-admin") {
    incidents.push({
      id: "production-outage",
      title: "Production System Outage",
      severity: "High",
      description: "Production endpoints returned 500 errors after a deployment from intern account. Investigation shows the account had admin rights and executed a deployment script.",
      evidence: `[2024-01-15 11:25] INFO: Deployment initiated by karim.intern@company.com\n[2024-01-15 11:26] ERROR: Production deployment failed - invalid configuration\n[2024-01-15 11:27] CRITICAL: Service unavailable - rollback required`,
      implicatedAccounts: ["karim"],
      rootCause: "Intern had Full Admin on production"
    });
  }

  // Check for support agent full admin
  if (assignments["laila"] === "full-admin") {
    incidents.push({
      id: "account-takeover",
      title: "Account Takeover Incident",
      severity: "High",
      description: "Support agent's compromised account was used to change user passwords and disable MFA settings for multiple accounts.",
      evidence: `[2024-01-15 10:45] WARN: Multiple password resets initiated by laila.mostafa@company.com\n[2024-01-15 10:46] ALERT: MFA disabled for 12 user accounts\n[2024-01-15 10:47] ERROR: Unauthorized administrative actions detected`,
      implicatedAccounts: ["laila"],
      rootCause: "Support agent had Full Admin privileges"
    });
  }

  // Check for third-party vendor admin access
  if (assignments["cloudmon"] === "read-write" || assignments["cloudmon"] === "full-admin" || assignments["cloudmon"] === "limited-admin") {
    incidents.push({
      id: "data-exfiltration",
      title: "Third-party Data Exfiltration",
      severity: "Medium",
      description: "Vendor service pushed malicious configuration causing sensitive telemetry data to be exfiltrated to external systems.",
      evidence: `[2024-01-15 15:15] INFO: Configuration update from svc-cloudmon@cloudmonitoring.com\n[2024-01-15 15:16] WARN: Unusual data transfer volume detected\n[2024-01-15 15:20] ALERT: Sensitive logs exposed to third-party endpoint`,
      implicatedAccounts: ["cloudmon"],
      rootCause: "Third-party vendor had excessive write privileges"
    });
  }

  return incidents;
};

const LeastPrivilegeIncident = () => {
  const navigate = useNavigate();
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [gameData, setGameData] = useState<any>(null);
  const [corrections, setCorrections] = useState<Record<string, PrivilegeLevel>>({});
  const [resolutionTimer, setResolutionTimer] = useState(0);
  const [isResolved, setIsResolved] = useState(false);
  const [finalScore, setFinalScore] = useState(0);

  useEffect(() => {
    // Load game data
    const savedData = localStorage.getItem('privilege-assignments');
    if (!savedData) {
      navigate('/least-privilege-game');
      return;
    }

    const data = JSON.parse(savedData);
    setGameData(data);
    
    // Generate incidents based on assignments
    const generatedIncidents = generateIncidents(data.assignments, data.accounts);
    setIncidents(generatedIncidents);

    // Start resolution timer
    const startTime = Date.now();
    const timer = setInterval(() => {
      setResolutionTimer(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  const handleCorrection = (accountId: string, newPrivilege: PrivilegeLevel) => {
    setCorrections(prev => ({
      ...prev,
      [accountId]: newPrivilege
    }));
  };

  const handleResolveIncident = () => {
    if (!gameData) return;

    // Calculate score
    let initialScore = 0;
    let correctionsNeeded = 0;

    // Score initial assignments
    gameData.accounts.forEach((account: any) => {
      if (gameData.assignments[account.id] === account.correctPrivilege) {
        initialScore += 10;
      }
    });

    // Check if corrections fix the issues
    let issuesResolved = true;
    incidents.forEach(incident => {
      incident.implicatedAccounts.forEach(accountId => {
        const account = gameData.accounts.find((acc: any) => acc.id === accountId);
        const correctedPrivilege = corrections[accountId];
        
        if (correctedPrivilege && correctedPrivilege !== account.correctPrivilege) {
          issuesResolved = false;
        } else if (!correctedPrivilege && gameData.assignments[accountId] !== account.correctPrivilege) {
          issuesResolved = false;
        }
      });
    });

    if (!issuesResolved) {
      toast.error("Incident not fully resolved. Review which accounts have inappropriate privileges.");
      return;
    }

    // Calculate final score
    correctionsNeeded = Object.keys(corrections).length;
    let resolutionBonus = 0;
    if (correctionsNeeded <= 2) resolutionBonus = 5;
    else if (correctionsNeeded <= 4) resolutionBonus = 2;

    let timeBonus = 0;
    if (resolutionTimer <= 180) timeBonus = 10; // 3 minutes
    else if (resolutionTimer <= 300) timeBonus = 5; // 5 minutes

    const totalScore = initialScore + resolutionBonus + timeBonus;
    setFinalScore(totalScore);
    setIsResolved(true);

    // Update progress
    localStorage.setItem('least-privilege-progress', JSON.stringify({
      completed: 1,
      total: 1,
      score: totalScore
    }));

    toast.success("Incident resolved successfully!");
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (isResolved) {
    const percentage = (finalScore / 120) * 100;
    
    return (
      <div className="min-h-screen p-6 lg:p-8 flex items-center justify-center">
        <div className="max-w-2xl mx-auto text-center">
          <div className="cyber-card p-12">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20">
                <Shield className="w-16 h-16 text-[hsl(var(--cyber-cyan))]" />
              </div>
            </div>
            
            <h1 className="text-3xl font-bold mb-4">Incident Resolved!</h1>
            <p className="text-xl text-muted-foreground mb-8">
              You scored {finalScore} out of 120 points ({Math.round(percentage)}%)
            </p>
            
            <div className="mb-8">
              <div className="text-lg font-semibold mb-2">Security Rating</div>
              <div className="text-2xl font-bold text-[hsl(var(--cyber-cyan))]">
                {percentage >= 80 ? "Security Expert 🛡️" :
                 percentage >= 60 ? "Privilege Guardian 🔐" :
                 percentage >= 40 ? "Learning Progress 📚" :
                 "Needs Practice ⚠️"}
              </div>
            </div>

            <div className="text-left mb-8 p-4 rounded-lg bg-background/50 border border-border/50">
              <h3 className="font-semibold mb-2">Key Lessons:</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Use role-based access control (RBAC)</li>
                <li>• Enforce MFA for all administrative accounts</li>
                <li>• Implement just-in-time (JIT) elevation</li>
                <li>• Monitor admin actions continuously</li>
                <li>• Regular privilege reviews and audits</li>
              </ul>
            </div>
            
            <div className="flex gap-4 justify-center">
              <Button 
                onClick={() => navigate('/least-privilege-game')}
                variant="outline"
                className="flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Try Again
              </Button>
              <Button 
                onClick={() => navigate('/')}
                className="cyber-button flex items-center gap-2"
              >
                <Home className="w-4 h-4" />
                Back to Dashboard
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (incidents.length === 0) {
    return (
      <div className="min-h-screen p-6 lg:p-8 flex items-center justify-center">
        <div className="max-w-2xl mx-auto text-center">
          <div className="cyber-card p-12">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-green-500/20 to-emerald-500/20">
                <CheckCircle className="w-16 h-16 text-green-400" />
              </div>
            </div>
            
            <h1 className="text-3xl font-bold mb-4">Perfect Assignment!</h1>
            <p className="text-xl text-muted-foreground mb-8">
              No security incidents detected. All privileges were assigned correctly.
            </p>
            
            <Button 
              onClick={() => navigate('/')}
              className="cyber-button flex items-center gap-2"
            >
              <Home className="w-4 h-4" />
              Back to Dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-red-400 mb-2">Security Incident Detected</h1>
            <p className="text-muted-foreground">
              Investigate and remediate the privilege assignment issues
            </p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <Clock className="w-4 h-4" />
              Resolution Time: {formatTime(resolutionTimer)}
            </div>
          </div>
        </div>

        {/* Incidents */}
        {incidents.map((incident) => (
          <div key={incident.id} className="cyber-card p-8 mb-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 rounded-xl bg-red-500/20">
                <AlertTriangle className="w-8 h-8 text-red-400" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-2">
                  <h2 className="text-xl font-bold">{incident.title}</h2>
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${
                    incident.severity === "High" ? "bg-red-500/20 text-red-400" :
                    incident.severity === "Medium" ? "bg-yellow-500/20 text-yellow-400" :
                    "bg-blue-500/20 text-blue-400"
                  }`}>
                    {incident.severity}
                  </span>
                </div>
                <p className="text-muted-foreground mb-4">{incident.description}</p>
                
                {/* Evidence */}
                <div className="mb-6">
                  <h3 className="font-semibold mb-2">Log Evidence:</h3>
                  <pre className="text-xs bg-background/50 p-3 rounded border border-border/50 font-mono text-muted-foreground overflow-x-auto">
                    {incident.evidence}
                  </pre>
                </div>

                <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                  <p className="text-sm">
                    <strong>Root Cause:</strong> {incident.rootCause}
                  </p>
                </div>
              </div>
            </div>

            {/* Incident Image */}
            <div className="mb-6">
              <img 
                src={incidentImage} 
                alt="Security Incident" 
                className="w-full max-w-md mx-auto rounded-lg"
              />
            </div>

            {/* Remediation */}
            <div className="border-t border-border/50 pt-6">
              <h3 className="font-semibold mb-4">Remediation Required:</h3>
              <div className="space-y-4">
                {incident.implicatedAccounts.map((accountId) => {
                  const account = gameData?.accounts.find((acc: any) => acc.id === accountId);
                  if (!account) return null;

                  return (
                    <div key={accountId} className="flex items-center gap-4 p-4 rounded-lg bg-background/50 border border-border/50">
                      <img 
                        src={account.avatar} 
                        alt={account.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="font-semibold">{account.name}</div>
                        <div className="text-sm text-muted-foreground">{account.role}</div>
                        <div className="text-xs text-red-400">
                          Current: {privilegeOptions.find(p => p.value === gameData.assignments[accountId])?.label}
                        </div>
                      </div>
                      <div className="w-48">
                        <Select
                          value={corrections[accountId] || ""}
                          onValueChange={(value: PrivilegeLevel) => handleCorrection(accountId, value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Correct privilege" />
                          </SelectTrigger>
                          <SelectContent>
                            {privilegeOptions.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ))}

        {/* Actions */}
        <div className="text-center">
          <Button 
            onClick={handleResolveIncident}
            className="cyber-button flex items-center gap-2 px-8"
          >
            <CheckCircle className="w-4 h-4" />
            Resolve Incident
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LeastPrivilegeIncident;