import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { Timer, Lightbulb, SkipForward, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Import level images
import level1Image from "@/assets/level-1-file.jpg";
import level2Image from "@/assets/level-2-desktop.jpg";
import level3Image from "@/assets/level-3-email.jpg";
import level4Image from "@/assets/level-4-messages.jpg";
import level5Image from "@/assets/level-5-documents.jpg";
import level6Image from "@/assets/level-6-harddrive.jpg";
import level7Image from "@/assets/level-7-network.jpg";
import level8Image from "@/assets/level-8-database.jpg";
import level9Image from "@/assets/level-9-corrupted.jpg";
import level10Image from "@/assets/level-10-master.jpg";

interface Level {
  id: number;
  title: string;
  scenario: string;
  image: string;
  encryptedText: string;
  correctAnswer: string;
  hints: string[];
  timeSeconds: number;
  basePoints: number;
  hintCost: { points: number; time: number };
  maxAttempts: number;
}

const levels: Level[] = [
  {
    id: 1,
    title: "File 1 — Welcome Note",
    scenario: "Found in the Desktop folder, appears to be the hacker's entry message.",
    image: level1Image,
    encryptedText: "KHOOR ZRUOG",
    correctAnswer: "HELLO WORLD",
    hints: ["Shift likely between 1 and 5", "Try shifting each letter back 3 positions"],
    timeSeconds: 60,
    basePoints: 10,
    hintCost: { points: 3, time: 10 },
    maxAttempts: 5
  },
  {
    id: 2,
    title: "File 2 — Meeting Notes",
    scenario: "Located in Documents/Personal, mentions a meeting location.",
    image: level2Image,
    encryptedText: "PHHW DW FDIH PLGQLJKW",
    correctAnswer: "MEET AT CAFE MIDNIGHT",
    hints: ["Same shift pattern as previous file", "Check the cafe name - common shift of 3"],
    timeSeconds: 75,
    basePoints: 12,
    hintCost: { points: 4, time: 12 },
    maxAttempts: 5
  },
  {
    id: 3,
    title: "File 3 — Email Draft",
    scenario: "Draft email found in temp folder, never sent but contains plans.",
    image: level3Image,
    encryptedText: "SODQ LV UHDGB IRU DWWDFN",
    correctAnswer: "PLAN IS READY FOR ATTACK",
    hints: ["Continue with the established pattern", "D becomes A, shift back by 3"],
    timeSeconds: 90,
    basePoints: 15,
    hintCost: { points: 5, time: 15 },
    maxAttempts: 5
  },
  {
    id: 4,
    title: "File 4 — Chat Backup",
    scenario: "Encrypted chat messages from secure messaging app backup.",
    image: level4Image,
    encryptedText: "WDUJHW LV EDQN PDQDJHU MRKQ",
    correctAnswer: "TARGET IS BANK MANAGER JOHN",
    hints: ["Same cipher method continues", "WDUJHW starts with T - count the shift"],
    timeSeconds: 110,
    basePoints: 18,
    hintCost: { points: 6, time: 18 },
    maxAttempts: 5
  },
  {
    id: 5,
    title: "File 5 — Operations Log",
    scenario: "Found in hidden system folder, tracks operational timeline.",
    image: level5Image,
    encryptedText: "DFWLYDWH EDFNGRRU DW 3000",
    correctAnswer: "ACTIVATE BACKDOOR AT 3000",
    hints: ["Numbers stay the same, only letters shift", "A becomes D when shifted forward by 3"],
    timeSeconds: 140,
    basePoints: 22,
    hintCost: { points: 7, time: 21 },
    maxAttempts: 5
  },
  {
    id: 6,
    title: "File 6 — Double Encrypted",
    scenario: "Complex file with two-part encryption found on encrypted drive.",
    image: level6Image,
    encryptedText: "ILUVW KDOI: FDVK VHFRQG KDOI: GLDJRQ",
    correctAnswer: "FIRST HALF: CASH SECOND HALF: DRAGON",
    hints: ["Two segments, both use Caesar shift", "Both halves use the same shift pattern"],
    timeSeconds: 160,
    basePoints: 26,
    hintCost: { points: 9, time: 24 },
    maxAttempts: 5
  },
  {
    id: 7,
    title: "File 7 — Network Logs",
    scenario: "Network access logs with decoy characters inserted.",
    image: level7Image,
    encryptedText: "D#F#F#H#V#V L#Q# W#U#D#Q#V#I#H#U",
    correctAnswer: "ACCESS IN TRANSFER",
    hints: ["Ignore every character with # symbol", "Remove # characters first, then apply Caesar shift"],
    timeSeconds: 180,
    basePoints: 30,
    hintCost: { points: 10, time: 30 },
    maxAttempts: 5
  },
  {
    id: 8,
    title: "File 8 — Database Query",
    scenario: "Encrypted database access query with mixed case preserved.",
    image: level8Image,
    encryptedText: "VhOhFW * IURP XvHu_WdEOh ZKhUh DJh > 25",
    correctAnswer: "SeLeCT * FROM uSeR_TaBLe WHeRe AGe > 25",
    hints: ["Preserve exact case pattern", "Shift each letter but keep upper/lower case intact"],
    timeSeconds: 210,
    basePoints: 35,
    hintCost: { points: 12, time: 36 },
    maxAttempts: 5
  },
  {
    id: 9,
    title: "File 9 — Corrupted Evidence",
    scenario: "Partially corrupted file with missing characters marked as #.",
    image: level9Image,
    encryptedText: "SD##ZRUG LV # KDQG OH ## FDVK",
    correctAnswer: "PASSWORD IS HANDLE WITH CASH",
    hints: ["Missing letters marked with #, deduce from context", "Common words: PASSWORD, HANDLE, WITH, CASH"],
    timeSeconds: 240,
    basePoints: 40,
    hintCost: { points: 15, time: 48 },
    maxAttempts: 5
  },
  {
    id: 10,
    title: "File 10 — Master Plan",
    scenario: "The final encrypted master plan document from the main evidence folder.",
    image: level10Image,
    encryptedText: "ILQDO DWWDFN RQ EDQN VDXUGDB DW GDZQ. HVFDSH SODQ DFWLYH. DOO WHDPV UHDGB IRU RSHUDWLRQ EOXH ILEHU.",
    correctAnswer: "FINAL ATTACK ON BANK SATURDAY AT DAWN. ESCAPE PLAN ACTIVE. ALL TEAMS READY FOR OPERATION BLUE FIBER.",
    hints: ["Longest message but same pattern throughout", "ILQDO = FINAL, apply same shift to entire message"],
    timeSeconds: 300,
    basePoints: 50,
    hintCost: { points: 20, time: 60 },
    maxAttempts: 5
  }
];

const EncryptionGame = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentLevel, setCurrentLevel] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [timeLeft, setTimeLeft] = useState(levels[0].timeSeconds);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [gameResults, setGameResults] = useState<any[]>([]);
  const [isLocked, setIsLocked] = useState(false);

  // Timer effect
  useEffect(() => {
    if (timeLeft > 0 && !isLocked) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !isLocked) {
      handleTimeout();
    }
  }, [timeLeft, isLocked]);

  // Initialize timer when level changes
  useEffect(() => {
    if (currentLevel < levels.length) {
      setTimeLeft(levels[currentLevel].timeSeconds);
      setUserInput("");
      setAttempts(0);
      setHintsUsed(0);
      setFeedback("");
      setIsLocked(false);
    }
  }, [currentLevel]);

  const caesarDecrypt = (text: string, shift: number): string => {
    return text
      .split('')
      .map(char => {
        if (char.match(/[A-Z]/)) {
          return String.fromCharCode(((char.charCodeAt(0) - 65 - shift + 26) % 26) + 65);
        } else if (char.match(/[a-z]/)) {
          return String.fromCharCode(((char.charCodeAt(0) - 97 - shift + 26) % 26) + 97);
        }
        return char;
      })
      .join('');
  };

  const handleTimeout = useCallback(() => {
    setIsLocked(true);
    const result = {
      level: currentLevel + 1,
      points: 0,
      timeTaken: levels[currentLevel].timeSeconds,
      hintsUsed,
      attempts,
      status: 'timeout',
      correctAnswer: levels[currentLevel].correctAnswer
    };
    setGameResults(prev => [...prev, result]);
    setFeedback(`Time's up! The correct answer was: ${levels[currentLevel].correctAnswer}`);
    
    toast({
      title: "Time's Up!",
      description: "Moving to next file...",
      variant: "destructive"
    });

    setTimeout(() => nextLevel(), 3000);
  }, [currentLevel, hintsUsed, attempts, toast]);

  const handleSubmit = () => {
    if (isLocked || userInput.trim() === "") return;

    const currentLevelData = levels[currentLevel];
    const isCorrect = userInput.toUpperCase().trim() === currentLevelData.correctAnswer;

    if (isCorrect) {
      const points = currentLevelData.basePoints;
      setScore(prev => prev + points);
      setIsLocked(true);
      
      const result = {
        level: currentLevel + 1,
        points,
        timeTaken: currentLevelData.timeSeconds - timeLeft,
        hintsUsed,
        attempts: attempts + 1,
        status: 'success',
        correctAnswer: currentLevelData.correctAnswer
      };
      setGameResults(prev => [...prev, result]);
      
      setFeedback(`Correct! The message reads: ${currentLevelData.correctAnswer}. Evidence logged for incident report.`);
      
      toast({
        title: "File Decrypted!",
        description: `+${points} points`,
      });

      setTimeout(() => nextLevel(), 3000);
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      
      if (newAttempts >= currentLevelData.maxAttempts) {
        setIsLocked(true);
        const result = {
          level: currentLevel + 1,
          points: 0,
          timeTaken: currentLevelData.timeSeconds - timeLeft,
          hintsUsed,
          attempts: newAttempts,
          status: 'failed',
          correctAnswer: currentLevelData.correctAnswer
        };
        setGameResults(prev => [...prev, result]);
        setFeedback(`Maximum attempts reached. The correct answer was: ${currentLevelData.correctAnswer}`);
        setTimeout(() => nextLevel(), 3000);
      } else {
        setFeedback(`Incorrect. Check shift, case, and any special characters. Attempts left: ${currentLevelData.maxAttempts - newAttempts}`);
      }
    }
  };

  const handleHint = (hintIndex: number) => {
    if (isLocked || hintsUsed > hintIndex) return;
    
    const currentLevelData = levels[currentLevel];
    const hint = currentLevelData.hints[hintIndex];
    
    setScore(prev => prev - currentLevelData.hintCost.points);
    setTimeLeft(prev => Math.max(0, prev - currentLevelData.hintCost.time));
    setHintsUsed(hintIndex + 1);
    
    toast({
      title: `Hint ${hintIndex + 1}`,
      description: hint,
    });
  };

  const handleSkip = () => {
    setIsLocked(true);
    const result = {
      level: currentLevel + 1,
      points: 0,
      timeTaken: levels[currentLevel].timeSeconds - timeLeft,
      hintsUsed,
      attempts,
      status: 'skipped',
      correctAnswer: levels[currentLevel].correctAnswer
    };
    setGameResults(prev => [...prev, result]);
    setFeedback(`Skipped. The correct answer was: ${levels[currentLevel].correctAnswer}`);
    setTimeout(() => nextLevel(), 2000);
  };

  const nextLevel = () => {
    if (currentLevel + 1 >= levels.length) {
      // Save results and navigate to final report
      localStorage.setItem('encryption-results', JSON.stringify({
        score,
        results: gameResults,
        totalLevels: levels.length
      }));
      navigate('/encryption-results');
    } else {
      setCurrentLevel(prev => prev + 1);
    }
  };

  const showAnswer = () => {
    setFeedback(`The correct answer is: ${levels[currentLevel].correctAnswer}`);
  };

  if (currentLevel >= levels.length) {
    return <div>Game Complete</div>;
  }

  const currentLevelData = levels[currentLevel];
  const progress = ((currentLevel + 1) / levels.length) * 100;

  return (
    <div className="min-h-screen cyber-background p-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="cyber-card p-4 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Digital Forensics Lab</h1>
            <div className="flex items-center gap-4">
              <span className="text-[hsl(var(--cyber-cyan))] font-bold">Score: {score}</span>
              <div className="flex items-center gap-2">
                <Timer className="w-4 h-4" />
                <span className={`font-mono ${timeLeft <= 30 ? 'text-red-400' : 'text-[hsl(var(--cyber-cyan))]'}`}>
                  {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                </span>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress: {currentLevel + 1}/{levels.length}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>

        {/* Main Game Area */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left Column - File Info */}
          <div className="space-y-6">
            <div className="cyber-card p-6">
              <h2 className="text-xl font-bold mb-4">{currentLevelData.title}</h2>
              <img 
                src={currentLevelData.image} 
                alt={`Level ${currentLevel + 1} evidence`}
                className="w-full rounded-lg mb-4"
              />
              <p className="text-muted-foreground text-sm">
                {currentLevelData.scenario}
              </p>
            </div>

            {/* Encrypted Content */}
            <div className="cyber-card p-6">
              <h3 className="font-bold mb-4">Encrypted File Content:</h3>
              <div className="bg-background/50 p-4 rounded-lg font-mono text-[hsl(var(--cyber-cyan))] break-all">
                {currentLevelData.encryptedText}
              </div>
            </div>
          </div>

          {/* Right Column - Controls */}
          <div className="space-y-6">
            {/* Decryption Input */}
            <div className="cyber-card p-6">
              <h3 className="font-bold mb-4">Decryption Input:</h3>
              <textarea
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Enter decrypted message here..."
                className="w-full h-24 p-3 rounded-lg bg-background/50 border border-border font-mono"
                disabled={isLocked}
              />
              <div className="flex gap-2 mt-4">
                <Button 
                  onClick={handleSubmit}
                  disabled={isLocked || userInput.trim() === ""}
                  className="cyber-button flex-1"
                >
                  Submit
                </Button>
                <Button 
                  variant="outline"
                  onClick={handleSkip}
                  disabled={isLocked}
                  className="flex items-center gap-2"
                >
                  <SkipForward className="w-4 h-4" />
                  Skip
                </Button>
              </div>
            </div>

            {/* Hints */}
            <div className="cyber-card p-6">
              <h3 className="font-bold mb-4">Investigation Tools:</h3>
              <div className="space-y-2">
                {currentLevelData.hints.map((_, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    onClick={() => handleHint(index)}
                    disabled={isLocked || hintsUsed > index}
                    className="w-full flex items-center gap-2"
                  >
                    <Lightbulb className="w-4 h-4" />
                    Hint {index + 1} 
                    {hintsUsed > index ? ' (Used)' : ` (-${currentLevelData.hintCost.points}pts, -${currentLevelData.hintCost.time}s)`}
                  </Button>
                ))}
                {(isLocked || attempts >= currentLevelData.maxAttempts) && (
                  <Button
                    variant="outline"
                    onClick={showAnswer}
                    className="w-full flex items-center gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    Show Answer
                  </Button>
                )}
              </div>
            </div>

            {/* Feedback */}
            {feedback && (
              <div className="cyber-card p-6">
                <h3 className="font-bold mb-2">Analysis Result:</h3>
                <p className="text-sm text-muted-foreground">{feedback}</p>
              </div>
            )}

            {/* Attempts Info */}
            <div className="cyber-card p-4">
              <div className="text-sm text-muted-foreground">
                Attempts: {attempts}/{currentLevelData.maxAttempts} | 
                Hints Used: {hintsUsed}/{currentLevelData.hints.length}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EncryptionGame;