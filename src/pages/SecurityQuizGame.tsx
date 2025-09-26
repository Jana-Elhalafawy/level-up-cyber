import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { CheckCircle, XCircle } from "lucide-react";
import streetImage from "@/assets/quiz-snapchat-street.jpg";
import instagramImage from "@/assets/quiz-instagram-items.jpg";
import hackerImage from "@/assets/quiz-hacker-notebook.jpg";
import emailsImage from "@/assets/quiz-phishing-emails.jpg";
import receiptImage from "@/assets/quiz-rideshare-receipt.jpg";

interface Question {
  id: number;
  image: string;
  title: string;
  question: string;
  options: {
    text: string;
    points: number;
    isCorrect?: boolean;
  }[];
  lesson: string;
}

const questions: Question[] = [
  {
    id: 1,
    image: streetImage,
    title: "Level 1 — Snapchat Streaks",
    question: "Laila posts daily streaks showing her street, bus stop, and a café. What's the risk?",
    options: [
      { text: "Nothing dangerous", points: -5 },
      { text: "Location patterns are visible", points: 10, isCorrect: true }
    ],
    lesson: "Daily streaks can reveal location patterns and make it easy for stalkers to predict where you'll be."
  },
  {
    id: 2,
    image: instagramImage,
    title: "Level 2 — Instagram Stories", 
    question: "Laila posts her gym membership card with her name, her school logo, and a tagged food place. Which is most sensitive?",
    options: [
      { text: "School logo", points: 5 },
      { text: "Gym card with name", points: 10, isCorrect: true },
      { text: "Food photo", points: 0 }
    ],
    lesson: "Documents with personal information (names, IDs, addresses) are the most dangerous to share online."
  },
  {
    id: 3,
    image: hackerImage,
    title: "Level 3 — Hacker's Notebook",
    question: "With this collected information, what can a hacker do?",
    options: [
      { text: "Guess her address from receipts", points: 10, isCorrect: true },
      { text: "Use it to send targeted phishing", points: 10, isCorrect: true },
      { text: "Do nothing", points: -5 }
    ],
    lesson: "Hackers connect small clues from multiple posts to launch bigger, more convincing attacks."
  },
  {
    id: 4,
    image: emailsImage,
    title: "Level 4 — The Phishing Email",
    question: "Laila receives two emails, one real, one fake asking to reset her password. Which signs indicate phishing?",
    options: [
      { text: "Urgent language and suspicious sender", points: 10, isCorrect: true },
      { text: "Professional formatting", points: -5 },
      { text: "Generic greeting", points: 5 }
    ],
    lesson: "Oversharing makes phishing emails more convincing because attackers can personalize them with your information."
  },
  {
    id: 5,
    image: receiptImage,
    title: "Level 5 — Final Decision",
    question: "As investigator, what should you do when you see the hacker has her rideshare receipts?",
    options: [
      { text: "Write a forensic report to warn her", points: 10, isCorrect: true },
      { text: "Ignore it", points: -5 }
    ],
    lesson: "Awareness and reporting protect users. Rideshare receipts show exact pickup/drop-off locations and times."
  }
];

const SecurityQuizGame = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const handleAnswerSelect = (optionIndex: number) => {
    if (showFeedback) return;
    setSelectedAnswer(optionIndex);
    
    const points = questions[currentQuestion].options[optionIndex].points;
    setScore(prev => prev + points);
    setShowFeedback(true);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      setIsFinished(true);
      // Save progress to localStorage
      const progress = {
        completed: 1,
        total: 1,
        score: score
      };
      localStorage.setItem('security-quiz-progress', JSON.stringify(progress));
      
      // Navigate to results page
      navigate('/security-quiz-results', { state: { score, totalQuestions: questions.length } });
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const question = questions[currentQuestion];

  return (
    <div className="min-h-screen cyber-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold mb-2">
            Digital Forensics <span className="text-[hsl(var(--cyber-cyan))]">Investigation</span>
          </h1>
          <p className="text-muted-foreground">
            Analyze Laila's social media activity and identify security risks
          </p>
        </div>

        {/* Progress Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Investigation Progress</span>
            <span className="text-sm text-[hsl(var(--cyber-cyan))]">
              {currentQuestion + 1}/{questions.length}
            </span>
          </div>
          <Progress value={progress} className="h-3" />
        </div>

        {/* Question Card */}
        <div className="max-w-4xl mx-auto">
          <div className="cyber-card p-8">
            <h2 className="text-2xl font-bold mb-6 text-[hsl(var(--cyber-cyan))]">
              {question.title}
            </h2>

            {/* Question Image */}
            <div className="mb-6">
              <img 
                src={question.image} 
                alt={`Investigation evidence ${question.id}`}
                className="w-full max-w-2xl mx-auto rounded-xl"
              />
            </div>

            {/* Question Text */}
            <h3 className="text-xl font-semibold mb-6 text-center">
              {question.question}
            </h3>

            {/* Answer Options */}
            <div className="space-y-4 mb-6">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showFeedback}
                  className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                    selectedAnswer === index
                      ? showFeedback
                        ? option.isCorrect
                          ? 'border-green-500 bg-green-500/20'
                          : 'border-red-500 bg-red-500/20'
                        : 'border-[hsl(var(--cyber-cyan))] bg-[hsl(var(--cyber-cyan))]/20'
                      : 'border-border bg-background hover:border-[hsl(var(--cyber-cyan))]/50'
                  } ${showFeedback ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{option.text}</span>
                    {showFeedback && selectedAnswer === index && (
                      <div className="flex items-center gap-2">
                        {option.isCorrect ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-500" />
                        )}
                        <span className="text-sm">
                          {option.points > 0 ? `+${option.points}` : option.points} pts
                        </span>
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>

            {/* Feedback */}
            {showFeedback && (
              <div className="mb-6 p-4 rounded-lg bg-[hsl(var(--cyber-cyan))]/10 border border-[hsl(var(--cyber-cyan))]/30">
                <h4 className="font-semibold mb-2 text-[hsl(var(--cyber-cyan))]">Investigation Note:</h4>
                <p className="text-muted-foreground">{question.lesson}</p>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between items-center">
              <div className="text-sm text-muted-foreground">
                Score: <span className="font-bold text-[hsl(var(--cyber-cyan))]">{score}</span> points
              </div>
              
              {showFeedback && (
                <Button onClick={handleNext} className="cyber-button">
                  {currentQuestion < questions.length - 1 ? 'Next Evidence' : 'Complete Investigation'}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityQuizGame;