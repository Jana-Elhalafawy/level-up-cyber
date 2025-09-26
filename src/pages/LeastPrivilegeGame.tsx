import { useState, useEffect } from "react";
import { Users, Clock, Save, CheckCircle, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

// Import avatars
import avatarAmina from "@/assets/avatar_amina.png";
import avatarOmar from "@/assets/avatar_omar.png";
import avatarLaila from "@/assets/avatar_laila.png";
import avatarKarim from "@/assets/avatar_karim.png";
import avatarNour from "@/assets/avatar_nour.png";
import avatarHassan from "@/assets/avatar_hassan.png";
import avatarSara from "@/assets/avatar_sara.png";
import avatarFatima from "@/assets/avatar_fatima.png";
import avatarAhmed from "@/assets/avatar_ahmed.png";
import avatarCloudmon from "@/assets/avatar_cloudmon.png";

interface Account {
  id: string;
  name: string;
  email: string;
  role: string;
  jobDescription: string;
  avatar: string;
  lastLogin: string;
  correctPrivilege: PrivilegeLevel;
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
  { value: "no-access", label: "No Access", description: "Cannot access resource at all" },
  { value: "read-only", label: "Read-Only", description: "View only access" },
  { value: "read-write", label: "Read / Write", description: "View and modify data" },
  { value: "upload-submit", label: "Upload / Submit", description: "Can upload or submit content but not change system config" },
  { value: "limited-admin", label: "Limited Admin", description: "Can manage user settings for own team only" },
  { value: "full-admin", label: "Full Admin", description: "Full system-level administrative privileges" },
  { value: "temporary-elevated", label: "Temporary Elevated", description: "Elevated for 1 session; used for limited tasks" },
  { value: "customer-self-service", label: "Customer (Self-Service)", description: "Customer-level portal; only their own records" }
];

const accounts: Account[] = [
  {
    id: "amina",
    name: "Amina Hassan",
    email: "amina.hassan@company.com",
    role: "System Administrator",
    jobDescription: "Manages servers, deploys code, updates patches",
    avatar: avatarAmina,
    lastLogin: "2024-01-15 09:30",
    correctPrivilege: "full-admin"
  },
  {
    id: "omar",
    name: "Omar Nasser",
    email: "omar.nasser@company.com",
    role: "Senior DevOps Engineer",
    jobDescription: "Deploy pipelines and manage CI/CD",
    avatar: avatarOmar,
    lastLogin: "2024-01-15 08:45",
    correctPrivilege: "limited-admin"
  },
  {
    id: "laila",
    name: "Laila Mostafa",
    email: "laila.mostafa@company.com",
    role: "Customer Support Agent",
    jobDescription: "Responds to customer tickets, looks up customer orders",
    avatar: avatarLaila,
    lastLogin: "2024-01-15 10:15",
    correctPrivilege: "read-write"
  },
  {
    id: "karim",
    name: "Karim Adel",
    email: "karim.intern@company.com",
    role: "Intern (Engineering)",
    jobDescription: "Assist developers, test features in staging (not production)",
    avatar: avatarKarim,
    lastLogin: "2024-01-15 11:20",
    correctPrivilege: "read-only"
  },
  {
    id: "nour",
    name: "Nour El-Sayed",
    email: "nour.elsayed@company.com",
    role: "Finance Manager",
    jobDescription: "Views financial reports and exports payroll",
    avatar: avatarNour,
    lastLogin: "2024-01-15 07:30",
    correctPrivilege: "read-write"
  },
  {
    id: "hassan",
    name: "Hassan Omar",
    email: "hassan.contractor@company.com",
    role: "Marketing Contractor",
    jobDescription: "Uploads marketing assets to CMS",
    avatar: avatarHassan,
    lastLogin: "2024-01-14 16:45",
    correctPrivilege: "upload-submit"
  },
  {
    id: "sara",
    name: "Sara Ibrahim",
    email: "sara.ibrahim@company.com",
    role: "Database Admin (DBA)",
    jobDescription: "Manages production database backups and restores",
    avatar: avatarSara,
    lastLogin: "2024-01-15 06:15",
    correctPrivilege: "limited-admin"
  },
  {
    id: "fatima",
    name: "Fatima R.",
    email: "fatima.r@example.com",
    role: "Registered Customer",
    jobDescription: "Purchases and views her orders",
    avatar: avatarFatima,
    lastLogin: "2024-01-15 12:30",
    correctPrivilege: "customer-self-service"
  },
  {
    id: "ahmed",
    name: "Ahmed K.",
    email: "ahmed.k@example.com",
    role: "Registered Customer",
    jobDescription: "Purchases and views his orders",
    avatar: avatarAhmed,
    lastLogin: "2024-01-15 14:20",
    correctPrivilege: "customer-self-service"
  },
  {
    id: "cloudmon",
    name: "CloudMonitoring Co.",
    email: "svc-cloudmon@cloudmonitoring.com",
    role: "Third-party Vendor",
    jobDescription: "Sends telemetry and gets read-only logs",
    avatar: avatarCloudmon,
    lastLogin: "2024-01-15 15:00",
    correctPrivilege: "read-only"
  }
];

const LeastPrivilegeGame = () => {
  const navigate = useNavigate();
  const [assignments, setAssignments] = useState<Record<string, PrivilegeLevel>>({});
  const [assignedCount, setAssignedCount] = useState(0);
  const [gamePhase, setGamePhase] = useState<"assignment" | "incident">("assignment");
  const [startTime] = useState(Date.now());

  // Shuffle accounts on mount
  const [shuffledAccounts] = useState(() => [...accounts].sort(() => Math.random() - 0.5));

  useEffect(() => {
    const count = Object.keys(assignments).length;
    setAssignedCount(count);
  }, [assignments]);

  const handleAssignment = (accountId: string, privilege: PrivilegeLevel) => {
    setAssignments(prev => ({
      ...prev,
      [accountId]: privilege
    }));
  };

  const handleFinishAssignments = () => {
    if (assignedCount < 10) {
      toast.error("Please assign privileges to all accounts");
      return;
    }
    
    // Save assignments and proceed to incident phase
    localStorage.setItem('privilege-assignments', JSON.stringify({
      assignments,
      startTime,
      accounts: shuffledAccounts
    }));
    
    setGamePhase("incident");
    navigate('/least-privilege-incident');
  };

  const handleSaveDraft = () => {
    localStorage.setItem('privilege-draft', JSON.stringify(assignments));
    toast.success("Draft saved successfully");
  };

  const progress = (assignedCount / 10) * 100;

  return (
    <div className="min-h-screen p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold mb-2">Privilege Assignment</h1>
            <p className="text-muted-foreground">
              You are the General Cybersecurity Manager. Assign appropriate privileges to each account.
            </p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <Clock className="w-4 h-4" />
              Session Active
            </div>
            <div className="text-lg font-semibold">
              Assignments: {assignedCount}/10
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="cyber-card p-6 mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Users className="w-5 h-5 text-[hsl(var(--cyber-cyan))]" />
            <span className="font-semibold">Progress</span>
            <span className="text-[hsl(var(--cyber-cyan))]">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-3" />
        </div>

        {/* Accounts Grid */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {shuffledAccounts.map((account) => (
            <div key={account.id} className="cyber-card p-6">
              <div className="flex items-start gap-4">
                <img 
                  src={account.avatar} 
                  alt={account.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-bold text-lg">{account.name}</h3>
                  <p className="text-sm text-[hsl(var(--cyber-cyan))] mb-1">{account.role}</p>
                  <p className="text-sm text-muted-foreground mb-2">{account.email}</p>
                  <p className="text-sm mb-3">{account.jobDescription}</p>
                  <p className="text-xs text-muted-foreground mb-4">
                    Last login: {account.lastLogin}
                  </p>
                  
                  <Select
                    value={assignments[account.id] || ""}
                    onValueChange={(value: PrivilegeLevel) => handleAssignment(account.id, value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select privilege level" />
                    </SelectTrigger>
                    <SelectContent>
                      {privilegeOptions.map((option) => (
                        <SelectItem 
                          key={option.value} 
                          value={option.value}
                          className="cursor-pointer"
                        >
                          <div>
                            <div className="font-medium">{option.label}</div>
                            <div className="text-xs text-muted-foreground">
                              {option.description}
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-4 justify-center">
          <Button 
            onClick={handleSaveDraft}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            Save Draft
          </Button>
          <Button 
            onClick={handleFinishAssignments}
            disabled={assignedCount < 10}
            className="cyber-button flex items-center gap-2 px-8"
          >
            <CheckCircle className="w-4 h-4" />
            Finish Assignments
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LeastPrivilegeGame;