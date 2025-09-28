import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CheckCircle, XCircle, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Question {
  question: string;
  choices: string[];
  answer: string;
  explanation: string;
}

interface Module {
  module: string;
  questions: Question[];
}

const SecureCodingGame = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [modules, setModules] = useState<Module[]>([]);
  const [allQuestions, setAllQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const response = await fetch("/src/pages/Digitopia interactive lessons.json");
        const data = await response.json();
        setModules(data);
        
        // Flatten all questions from all modules
        const questions = data.flatMap((module: Module) => module.questions);
        setAllQuestions(questions);
        setLoading(false);
      } catch (error) {
        console.error("Failed to load questions:", error);
        toast({
          title: "Error",
          description: "Failed to load quiz questions. Please try again.",
          variant: "destructive",
        });
        setLoading(false);
      }
    };

    loadQuestions();
  }, [toast]);

  const handleAnswerSubmit = () => {
    if (!selectedAnswer) {
      toast({
        title: "Select an answer",
        description: "Please choose an answer before submitting.",
        variant: "destructive",
      });
      return;
    }

    const currentQuestion = allQuestions[currentQuestionIndex];
    const correct = selectedAnswer === currentQuestion.answer;
    
    setIsCorrect(correct);
    setShowFeedback(true);
    
    if (correct) {
      setScore(score + 10);
      toast({
        title: "Correct!",
        description: "You earned 10 points!",
      });
    } else {
      toast({
        title: "Incorrect",
        description: "No points awarded. Read the explanation to learn more.",
        variant: "destructive",
      });
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < allQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer("");
      setShowFeedback(false);
      setIsCorrect(false);
    } else {
      // Quiz completed - navigate to results
      localStorage.setItem("secureCodingScore", score.toString());
      localStorage.setItem("secureCodingTotal", allQuestions.length.toString());
      navigate("/secure-coding-results");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted p-6 flex items-center justify-center">
        <Card>
          <CardContent className="p-8">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading quiz questions...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (allQuestions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted p-6 flex items-center justify-center">
        <Card>
          <CardContent className="p-8 text-center">
            <XCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">No Questions Found</h2>
            <p className="text-muted-foreground mb-4">Unable to load quiz questions.</p>
            <Button onClick={() => navigate("/")}>Return Home</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentQuestion = allQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / allQuestions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-primary mb-2">Secure Coding Quiz</h1>
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-muted-foreground">
              Question {currentQuestionIndex + 1} of {allQuestions.length}
            </span>
            <span className="text-sm font-semibold">
              Score: {score} points
            </span>
          </div>
          <Progress value={progress} className="w-full" />
        </div>

        {/* Question Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">
              {currentQuestion.question}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup 
              value={selectedAnswer} 
              onValueChange={setSelectedAnswer}
              disabled={showFeedback}
            >
              {currentQuestion.choices.map((choice, index) => (
                <div key={index} className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-accent/50 transition-colors">
                  <RadioGroupItem value={choice} id={`choice-${index}`} />
                  <Label 
                    htmlFor={`choice-${index}`} 
                    className="flex-1 cursor-pointer text-sm"
                  >
                    {choice}
                  </Label>
                  {showFeedback && choice === currentQuestion.answer && (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  )}
                  {showFeedback && choice === selectedAnswer && choice !== currentQuestion.answer && (
                    <XCircle className="h-5 w-5 text-red-500" />
                  )}
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Feedback */}
        {showFeedback && (
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className={`flex items-start gap-3 ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                {isCorrect ? (
                  <CheckCircle className="h-6 w-6 text-green-500 mt-0.5" />
                ) : (
                  <XCircle className="h-6 w-6 text-red-500 mt-0.5" />
                )}
                <div>
                  <h3 className="font-semibold mb-2">
                    {isCorrect ? 'Correct!' : 'Incorrect'}
                  </h3>
                  <p className="text-muted-foreground">
                    {currentQuestion.explanation}
                  </p>
                  {!isCorrect && (
                    <p className="mt-2 text-sm">
                      <strong>Correct answer:</strong> {currentQuestion.answer}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="flex justify-center gap-4">
          {!showFeedback ? (
            <Button onClick={handleAnswerSubmit} size="lg">
              Submit Answer
            </Button>
          ) : (
            <Button onClick={handleNextQuestion} size="lg" className="flex items-center gap-2">
              {currentQuestionIndex < allQuestions.length - 1 ? (
                <>
                  Next Question
                  <ArrowRight className="h-4 w-4" />
                </>
              ) : (
                "View Results"
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SecureCodingGame;