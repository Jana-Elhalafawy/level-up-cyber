import { Shield, AlertTriangle, Eye, Mail, Link, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const PhishingIntro = () => {
  const navigate = useNavigate();

  const phishingSigns = [
    {
      icon: AlertTriangle,
      title: "Urgent Language",
      description: "Phrases like 'Act now!', 'Immediate action required', or threats of account closure"
    },
    {
      icon: Mail,
      title: "Suspicious Sender",
      description: "Email addresses that don't match the claimed organization or contain misspellings"
    },
    {
      icon: Link,
      title: "Malicious Links",
      description: "URLs that don't match the legitimate website or redirect to suspicious domains"
    },
    {
      icon: Lock,
      title: "Requests for Sensitive Info",
      description: "Asking for passwords, social security numbers, or financial information via email"
    }
  ];

  return (
    <div className="min-h-screen p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="p-4 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20">
              <Shield className="w-12 h-12 text-[hsl(var(--cyber-cyan))]" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[hsl(var(--cyber-cyan))] to-[hsl(var(--cyber-purple))] bg-clip-text text-transparent">
            Phishing Simulation Training
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Learn to identify and defend against phishing attacks through interactive challenges
          </p>
        </div>

        {/* What is Phishing */}
        <div className="cyber-card p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
            <Eye className="w-8 h-8 text-[hsl(var(--cyber-cyan))]" />
            What is Phishing?
          </h2>
          <p className="text-muted-foreground leading-relaxed text-lg">
            Phishing is a cybercrime where attackers impersonate trusted entities to steal sensitive information 
            like passwords, credit card numbers, or personal data. These attacks commonly arrive via email, 
            text messages, or fake websites designed to look legitimate.
          </p>
        </div>

        {/* Common Signs */}
        <div className="cyber-card p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Common Signs of Phishing</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {phishingSigns.map((sign, index) => (
              <div key={index} className="flex items-start gap-4 p-4 rounded-xl bg-background/50 border border-border/50">
                <div className="p-2 rounded-lg bg-primary/20">
                  <sign.icon className="w-6 h-6 text-[hsl(var(--cyber-cyan))]" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">{sign.title}</h3>
                  <p className="text-sm text-muted-foreground">{sign.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* How to Stay Safe */}
        <div className="cyber-card p-8 mb-12">
          <h2 className="text-2xl font-bold mb-4">How to Stay Safe</h2>
          <ul className="space-y-3 text-muted-foreground">
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-[hsl(var(--cyber-cyan))] mt-2"></div>
              <span>Always verify the sender's identity through official channels</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-[hsl(var(--cyber-cyan))] mt-2"></div>
              <span>Hover over links to preview the destination URL before clicking</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-[hsl(var(--cyber-cyan))] mt-2"></div>
              <span>Never provide sensitive information via email or unsecured websites</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-[hsl(var(--cyber-cyan))] mt-2"></div>
              <span>Enable two-factor authentication whenever possible</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-[hsl(var(--cyber-cyan))] mt-2"></div>
              <span>Keep your software and security tools up to date</span>
            </li>
          </ul>
        </div>

        {/* Start Button */}
        <div className="text-center">
          <Button 
            size="lg" 
            className="cyber-button px-12 py-6 text-lg font-semibold"
            onClick={() => navigate('/phishing-game')}
          >
            Start Playing
          </Button>
          <p className="text-sm text-muted-foreground mt-4">
            Test your skills with 10 real-world email examples
          </p>
        </div>
      </div>
    </div>
  );
};

export default PhishingIntro;