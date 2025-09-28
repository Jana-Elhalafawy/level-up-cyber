import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Code, Shield, CheckCircle } from "lucide-react";

const SecureCodingIntro = () => {
  const navigate = useNavigate();
  const [showRules, setShowRules] = useState(false);

  const handleStartQuiz = () => {
    navigate("/secure-coding-game");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Code className="h-12 w-12 text-primary" />
            <h1 className="text-4xl font-bold text-primary">Secure Coding Quiz</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Test your knowledge of cybersecurity fundamentals across multiple domains
          </p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-primary" />
              About This Quiz
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              This interactive quiz covers essential cybersecurity topics including phishing detection, 
              QR code security, email analysis, malicious attachments, and more. Each question is designed 
              to test practical knowledge that security professionals use daily.
            </p>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <h4 className="font-semibold">Multiple Choice Format</h4>
                  <p className="text-sm text-muted-foreground">
                    Each question offers 3-4 answer choices with detailed explanations
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <h4 className="font-semibold">Progressive Difficulty</h4>
                  <p className="text-sm text-muted-foreground">
                    Questions span from basic concepts to advanced security analysis
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <h4 className="font-semibold">Immediate Feedback</h4>
                  <p className="text-sm text-muted-foreground">
                    Get instant explanations for each answer to reinforce learning
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <h4 className="font-semibold">Score Tracking</h4>
                  <p className="text-sm text-muted-foreground">
                    Earn 10 points for each correct answer and track your progress
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4 justify-center">
          <Button 
            onClick={handleStartQuiz}
            size="lg"
            className="px-8"
          >
            Start Quiz
          </Button>
          
          <Button 
            onClick={() => setShowRules(!showRules)}
            variant="outline"
            size="lg"
          >
            {showRules ? "Hide Rules" : "View Rules"}
          </Button>
        </div>

        {showRules && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Quiz Rules & Scoring</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid gap-3">
                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 rounded-full p-1 mt-0.5">
                    <CheckCircle className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <strong>Scoring:</strong> Earn +10 points for each correct answer, 0 points for incorrect answers
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 rounded-full p-1 mt-0.5">
                    <CheckCircle className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <strong>Format:</strong> Multiple choice questions with immediate feedback and explanations
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 rounded-full p-1 mt-0.5">
                    <CheckCircle className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <strong>Topics:</strong> Phishing detection, QR codes, email analysis, malicious attachments, and more
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 rounded-full p-1 mt-0.5">
                    <CheckCircle className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <strong>Completion:</strong> Progress through all questions to see your final score and ranking
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default SecureCodingIntro;