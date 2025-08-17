import { 
  Flag, 
  Shield, 
  Code, 
  Bug, 
  Brain 
} from "lucide-react";
import Header from "@/components/Header";
import ChallengeCard from "@/components/ChallengeCard";
import Footer from "@/components/Footer";

const Index = () => {
  const challenges = [
    {
      icon: Flag,
      title: "CTF Challenges",
      description: "Capture The Flag competitions and challenges",
      progress: 65,
      totalChallenges: 12,
      completedChallenges: 8
    },
    {
      icon: Shield,
      title: "Phishing Simulation",
      description: "Learn to identify and prevent phishing attacks",
      progress: 80,
      totalChallenges: 8,
      completedChallenges: 6
    },
    {
      icon: Code,
      title: "Secure Coding",
      description: "Master secure programming practices",
      progress: 45,
      totalChallenges: 15,
      completedChallenges: 7
    },
    {
      icon: Bug,
      title: "Vulnerability Lab",
      description: "Hands-on vulnerability assessment and exploitation",
      progress: 30,
      totalChallenges: 10,
      completedChallenges: 3
    },
    {
      icon: Brain,
      title: "Security Quiz",
      description: "Test your cybersecurity knowledge",
      progress: 90,
      totalChallenges: 25,
      completedChallenges: 23
    }
  ];

  return (
    <div className="min-h-screen p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <Header />
        
        {/* Challenge Categories */}
        <main>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {challenges.map((challenge, index) => (
              <ChallengeCard
                key={index}
                icon={challenge.icon}
                title={challenge.title}
                description={challenge.description}
                progress={challenge.progress}
                totalChallenges={challenge.totalChallenges}
                completedChallenges={challenge.completedChallenges}
              />
            ))}
          </div>
        </main>
        
        <Footer />
      </div>
    </div>
  );
};

export default Index;
