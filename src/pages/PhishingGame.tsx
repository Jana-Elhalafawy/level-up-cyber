import { useState, useEffect } from "react";
import { Shield, CheckCircle, XCircle, Home, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

// Import all email images
import email1 from "@/assets/phishing-email-1.jpg";
import email2 from "@/assets/phishing-email-2.jpg";
import email3 from "@/assets/phishing-email-3.jpg";
import email4 from "@/assets/phishing-email-4.jpg";
import email5 from "@/assets/phishing-email-5.jpg";
import email6 from "@/assets/phishing-email-6.jpg";
import email7 from "@/assets/phishing-email-7.jpg";
import email8 from "@/assets/phishing-email-8.jpg";
import email9 from "@/assets/phishing-email-9.jpg";
import email10 from "@/assets/phishing-email-10.jpg";

interface Challenge {
  id: number;
  image: string;
  isPhishing: boolean;
  explanation: string;
  content: string;
}

const challenges: Challenge[] = [
  {
    id: 1,
    image: email1,
    isPhishing: true,
    content: "Your PayPal account has been suspended. Please verify your account immediately by clicking the link below. Failure to do so will result in permanent closure.",
    explanation: "This email is phishing because:It creates a sense of concern by suggesting someone submitted negative or sensitive feedback. It urges you to click a link to view details instead of using official HR communication channels.The sender name “Automated HR Solutions” and the generic company reference are vague and not verifiable."
  },
  {
    id: 2,
    image: email2,
    isPhishing: true,
    content: "You have received an email that looks like an Apple invoice, claiming you were charged $89.99 for iCloud+ storage and giving fake details such as an order ID, document number, and masked card number. The message urges you to click a link to cancel or dispute the charge. This is phishing because the details are fabricated, and Apple never sends invoice disputes through email links—real billing information is only available in your official Apple account or App Store.",
    explanation: "Why this is phishing? This email is phishing because it pretends to be an Apple invoice to make you believe you were wrongly charged. It uses fake billing details and an urgent link to trick you into clicking. Real Apple invoices only appear in your official Apple account or App Store, not through random email links."
  },
  {
    id: 3,
    image: email3,
    isPhishing: true,
    content: "We detected unusual login attempts on your email account. Please reset your password immediately using the link below.",
    explanation: "This is phishing because it uses generic warnings about login attempts and provides a fake password reset link to steal credentials."
  },
  {
    id: 4,
    image: email4,
    isPhishing: true,
    content: "Congratulations! You've won a $500 gift card. Click here to claim your prize before it expires in 24 hours.",
    explanation: "This is phishing because it's too good to be true, uses urgency (24-hour expiration), and you didn't enter any contest."
  },
  {
    id: 5,
    image: email5,
    isPhishing: false,
    content: "Your Google account storage is almost full. Please upgrade your plan by visiting Google One.",
    explanation: "This is legitimate because it's a standard notification from Google about storage limits and directs to the official upgrade service."
  },
  {
    id: 6,
    image: email6,
    isPhishing: true,
    content: "Your bank account has been locked due to suspicious activity. Click here to unlock it now.",
    explanation: "This is phishing because legitimate banks never send clickable unlock links in emails. They would direct you to call or visit a branch."
  },
  {
    id: 7,
    image: email7,
    isPhishing: true,
    content: "Attached is your invoice. Please open the file to confirm payment.",
    explanation: "This is phishing because unexpected attachments are common malware delivery methods, and legitimate invoices come with proper context."
  },
  {
    id: 8,
    image: email8,
    isPhishing: false,
    content: "Reminder: Your dentist appointment is scheduled for Tuesday at 10:30 AM. Please call if you need to reschedule.",
    explanation: "This is legitimate because it's a normal appointment reminder with no suspicious links or requests for personal data."
  },
  {
    id: 9,
    image: email9,
    isPhishing: true,
    content: "We couldn't deliver your package. Click here to schedule redelivery.",
    explanation: "This is phishing because it lacks specific tracking details, shipping company information, and uses a generic delivery failure message."
  },
  {
    id: 10,
    image: email10,
    isPhishing: true,
    content: "Security Alert: Someone tried to log in from China. Confirm your identity by entering your password here.",
    explanation: "This is phishing because legitimate security alerts never ask you to enter your password directly in an email response."
  }
];

const PhishingGame = () => {
  const navigate = useNavigate();
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [userAnswer, setUserAnswer] = useState<boolean | null>(null);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(((currentChallenge) / challenges.length) * 100);
  }, [currentChallenge]);

  const handleAnswer = (isPhishing: boolean) => {
    if (answered) return;
    
    setUserAnswer(isPhishing);
    setAnswered(true);
    
    const correct = isPhishing === challenges[currentChallenge].isPhishing;
    if (correct) {
      setScore(score + 10);
      toast.success("Correct! +10 points", {
        description: "Well spotted!"
      });
    } else {
      toast.error("Incorrect", {
        description: "Review the explanation to learn more"
      });
    }
  };

  const nextChallenge = () => {
    if (currentChallenge < challenges.length - 1) {
      setCurrentChallenge(currentChallenge + 1);
      setAnswered(false);
      setUserAnswer(null);
    } else {
      setGameCompleted(true);
      // Update progress in localStorage for the dashboard
      localStorage.setItem('phishing-progress', JSON.stringify({
        completed: challenges.length,
        total: challenges.length,
        score: score + (userAnswer === challenges[currentChallenge].isPhishing ? 10 : 0)
      }));
    }
  };

  const restartGame = () => {
    setCurrentChallenge(0);
    setScore(0);
    setAnswered(false);
    setUserAnswer(null);
    setGameCompleted(false);
  };

  if (gameCompleted) {
    const finalScore = score + (userAnswer === challenges[currentChallenge].isPhishing ? 10 : 0);
    const percentage = (finalScore / 100) * 100;
    
    return (
      <div className="min-h-screen p-6 lg:p-8 flex items-center justify-center">
        <div className="max-w-2xl mx-auto text-center">
          <div className="cyber-card p-12">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20">
                <Shield className="w-16 h-16 text-[hsl(var(--cyber-cyan))]" />
              </div>
            </div>
            
            <h1 className="text-3xl font-bold mb-4">Training Complete!</h1>
            <p className="text-xl text-muted-foreground mb-8">
              You scored {finalScore} out of 100 points ({percentage}%)
            </p>
            
            <div className="mb-8">
              <div className="text-lg font-semibold mb-2">Performance Rating</div>
              <div className="text-2xl font-bold text-[hsl(var(--cyber-cyan))]">
                {percentage >= 80 ? "Expert Defender 🛡️" :
                 percentage >= 60 ? "Security Aware 🔍" :
                 percentage >= 40 ? "Learning Progress 📚" :
                 "Needs Practice ⚠️"}
              </div>
            </div>
            
            <div className="flex gap-4 justify-center">
              <Button 
                onClick={restartGame}
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

  const challenge = challenges[currentChallenge];

  return (
    <div className="min-h-screen p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold">Phishing Detection Challenge</h1>
            <p className="text-muted-foreground">
              Challenge {currentChallenge + 1} of {challenges.length}
            </p>
          </div>
          <div className="text-right">
            <div className="text-lg font-semibold">Score: {score}</div>
            <div className="text-sm text-muted-foreground">
              Progress: {Math.round(progress)}%
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <Progress value={progress} className="h-3" />
        </div>

        {/* Challenge Content */}
        <div className="cyber-card p-8 mb-8">
          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold mb-4">
              Is this email phishing or legitimate?
            </h2>
          </div>

          {/* Email Image */}
          <div className="bg-background/50 rounded-xl p-4 mb-6 border border-border/50">
            <img 
              src={challenge.image} 
              alt={`Email challenge ${challenge.id}`}
              className="w-full max-w-2xl mx-auto rounded-lg shadow-lg"
            />
          </div>

          {/* Answer Buttons */}
          {!answered && (
            <div className="flex gap-4 justify-center mb-6">
              <Button
                onClick={() => handleAnswer(true)}
                variant="destructive"
                size="lg"
                className="flex items-center gap-2 px-8 py-4"
              >
                <XCircle className="w-5 h-5" />
                Phishing
              </Button>
              <Button
                onClick={() => handleAnswer(false)}
                size="lg"
                className="cyber-button flex items-center gap-2 px-8 py-4"
              >
                <CheckCircle className="w-5 h-5" />
                Not Phishing
              </Button>
            </div>
          )}

          {/* Feedback */}
          {answered && (
            <div className="space-y-4">
              <div className={`p-4 rounded-xl border ${
                userAnswer === challenge.isPhishing 
                  ? 'bg-green-500/10 border-green-500/20 text-green-400' 
                  : 'bg-red-500/10 border-red-500/20 text-red-400'
              }`}>
                <div className="font-semibold mb-2">
                  {userAnswer === challenge.isPhishing ? '✅ Correct!' : '❌ Incorrect'}
                </div>
                <div className="text-sm">
                  This email is {challenge.isPhishing ? 'phishing' : 'legitimate'}.
                </div>
              </div>

              <div className="p-4 rounded-xl bg-background/50 border border-border/50">
                <div className="font-semibold mb-2">Explanation:</div>
                <p className="text-sm text-muted-foreground">
                  {challenge.explanation}
                </p>
              </div>

              <div className="text-center">
                <Button 
                  onClick={nextChallenge}
                  className="cyber-button px-8"
                >
                  {currentChallenge < challenges.length - 1 ? 'Next Challenge' : 'Complete Training'}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PhishingGame;
