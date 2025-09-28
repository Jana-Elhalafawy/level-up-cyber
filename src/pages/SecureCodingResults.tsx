import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Star, Target, RefreshCw, Home } from "lucide-react";

const SecureCodingResults = () => {
  const navigate = useNavigate();
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [rank, setRank] = useState("");
  const [rankColor, setRankColor] = useState("");

  useEffect(() => {
    const savedScore = localStorage.getItem("secureCodingScore");
    const savedTotal = localStorage.getItem("secureCodingTotal");
    
    if (savedScore && savedTotal) {
      const scoreNum = parseInt(savedScore);
      const totalNum = parseInt(savedTotal);
      const maxScore = totalNum * 10; // 10 points per question
      const percent = Math.round((scoreNum / maxScore) * 100);
      
      setScore(scoreNum);
      setTotal(totalNum);
      setPercentage(percent);
      
      // Determine rank based on percentage
      if (percent >= 90) {
        setRank("Cybersecurity Expert");
        setRankColor("text-yellow-500");
      } else if (percent >= 80) {
        setRank("Security Specialist");
        setRankColor("text-blue-500");
      } else if (percent >= 70) {
        setRank("Security Analyst");
        setRankColor("text-green-500");
      } else if (percent >= 60) {
        setRank("Security Trainee");
        setRankColor("text-purple-500");
      } else {
        setRank("Needs More Practice");
        setRankColor("text-gray-500");
      }
    }
  }, []);

  const handleRetakeQuiz = () => {
    localStorage.removeItem("secureCodingScore");
    localStorage.removeItem("secureCodingTotal");
    navigate("/secure-coding-intro");
  };

  const handleBackHome = () => {
    navigate("/");
  };

  const getRankIcon = () => {
    if (percentage >= 90) return <Trophy className="h-8 w-8 text-yellow-500" />;
    if (percentage >= 80) return <Star className="h-8 w-8 text-blue-500" />;
    if (percentage >= 70) return <Target className="h-8 w-8 text-green-500" />;
    return <Target className="h-8 w-8 text-gray-500" />;
  };

  const getEncouragementMessage = () => {
    if (percentage >= 90) {
      return "Outstanding! You have excellent cybersecurity knowledge and are ready to tackle advanced security challenges.";
    } else if (percentage >= 80) {
      return "Great job! You have solid cybersecurity fundamentals with room to master a few advanced concepts.";
    } else if (percentage >= 70) {
      return "Good work! You understand the basics well. Focus on practicing advanced scenarios to improve further.";
    } else if (percentage >= 60) {
      return "You're on the right track! Review the explanations and take the quiz again to strengthen your knowledge.";
    } else {
      return "Keep learning! Cybersecurity takes practice. Review the topics and try again - you've got this!";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-4">Quiz Complete!</h1>
          <p className="text-xl text-muted-foreground">
            Here's how you performed on the Secure Coding Quiz
          </p>
        </div>

        {/* Score Card */}
        <Card className="mb-6">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center mb-4">
              {getRankIcon()}
            </div>
            <CardTitle className="text-2xl mb-2">Your Results</CardTitle>
            <div className="text-6xl font-bold text-primary mb-2">
              {percentage}%
            </div>
            <Badge variant="outline" className={`text-lg px-4 py-2 ${rankColor}`}>
              {rank}
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="space-y-2">
                <div className="text-2xl font-bold text-primary">{score}</div>
                <div className="text-sm text-muted-foreground">Points Earned</div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-primary">{total}</div>
                <div className="text-sm text-muted-foreground">Questions Completed</div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-primary">{total * 10}</div>
                <div className="text-sm text-muted-foreground">Maximum Possible</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Encouragement */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <p className="text-muted-foreground text-center leading-relaxed">
              {getEncouragementMessage()}
            </p>
          </CardContent>
        </Card>

        {/* Knowledge Areas */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Quiz Topics Covered</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 rounded-full p-2">
                  <Target className="h-4 w-4 text-primary" />
                </div>
                <span>Phishing Link Detection</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 rounded-full p-2">
                  <Target className="h-4 w-4 text-primary" />
                </div>
                <span>QR Code Security</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 rounded-full p-2">
                  <Target className="h-4 w-4 text-primary" />
                </div>
                <span>Email Header Analysis</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 rounded-full p-2">
                  <Target className="h-4 w-4 text-primary" />
                </div>
                <span>Malicious Attachments</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 rounded-full p-2">
                  <Target className="h-4 w-4 text-primary" />
                </div>
                <span>Password Security</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 rounded-full p-2">
                  <Target className="h-4 w-4 text-primary" />
                </div>
                <span>Social Engineering</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={handleRetakeQuiz} size="lg" className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            Retake Quiz
          </Button>
          <Button onClick={handleBackHome} variant="outline" size="lg" className="flex items-center gap-2">
            <Home className="h-4 w-4" />
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SecureCodingResults;