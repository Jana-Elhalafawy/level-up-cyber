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
    encryptedText: "KHOOR",
    correctAnswer: "HELLO",
    hints: ["Try shift 3", "H becomes K when shifted forward by 3"],
    timeSeconds: 400,
    basePoints: 10,
    hintCost: { points: 3, time: 10 },
    maxAttempts: 5
  },
  {
    id: 2,
    title: "File 2 — Meeting Notes",
    scenario: "Located in Documents/Personal, mentions a meeting location.",
    image: level2Image,
    encryptedText: "PHHW DW FDIH",
    correctAnswer: "MEET AT CAFE",
    hints: ["Same shift as previous", "Shift back by 3"],
    timeSeconds: 300,
    basePoints: 10,
    hintCost: { points: 3, time: 10 },
    maxAttempts: 5
  },
  {
    id: 3,
    title: "File 3 — Email Draft",
    scenario: "Draft email found in temp folder, never sent but contains plans.",
    image: level3Image,
    encryptedText: "SODQ LV UHDGB",
    correctAnswer: "PLAN IS READY",
    hints: ["Try shift 3 again", "Same pattern as before"],
    timeSeconds: 300,
    basePoints: 10,
    hintCost: { points: 3, time: 10 },
    maxAttempts: 5
  },
  {
    id: 4,
    title: "File 4 — Chat Backup",
    scenario: "Encrypted chat messages from secure messaging app backup.",
    image: level4Image,
    encryptedText: "XEVKIX MW FERQ QEREKIV NSLR",
    correctAnswer: "TARGET IS BANK MANAGER JOHN",
    hints: ["Try shift 4", "X becomes T when shifted back by 4"],
    timeSeconds: 300,
    basePoints: 10,
    hintCost: { points: 3, time: 10 },
    maxAttempts: 5
  },
  {
    id: 5,
    title: "File 5 — Operations Log",
    scenario: "Found in hidden system folder, tracks operational timeline.",
    image: level5Image,
    encryptedText: "FHYNAFYJ GFHPITTU FY 3000",
    correctAnswer: "ACTIVATE BACKDOOR AT 3000",
    hints: ["Numbers stay the same", "Try shift 6"],
    timeSeconds: 300,
    basePoints: 10,
    hintCost: { points: 3, time: 10 },
    maxAttempts: 5
  },
  {
    id: 6,
    title: "File 6 — Double Message",
    scenario: "Complex file with important information found on encrypted drive.",
    image: level6Image,
    encryptedText: "NKTUV JCNM: ECUJ UGEQPF JCNM: FTCIQP",
    correctAnswer: "FIRST HALF: CASH SECOND HALF: DRAGON",
    hints: ["All one shift pattern", "Try shift 10"],
    timeSeconds: 300,
    basePoints: 10,
    hintCost: { points: 3, time: 10 },
    maxAttempts: 5
  },
  {
    id: 7,
    title: "File 7 — Network Logs",
    scenario: "Network access logs with important security information.",
    image: level7Image,
    encryptedText: "NPPRFF VA GENAFSR",
    correctAnswer: "ACCESS IN TRANSFER",
    hints: ["Try shift 13", "A becomes N when shifted forward by 13"],
    timeSeconds: 300,
    basePoints: 10,
    hintCost: { points: 3, time: 10 },
    maxAttempts: 5
  },
  {
    id: 8,
    title: "File 8 — Database Query",
    scenario: "Encrypted database access query with mixed case preserved.",
    image: level8Image,
    encryptedText: "FrYrPG * SEBZ hFrE_GnOYr JUrEr NTr > 25",
    correctAnswer: "SeLeCT * FROM uSeR_TaBLe WHeRe AGe > 25",
    hints: ["Preserve case pattern", "Try shift 13 but keep upper/lower case"],
    timeSeconds: 300,
    basePoints: 10,
    hintCost: { points: 3, time: 10 },
    maxAttempts: 5
  },
  {
    id: 9,
    title: "File 9 — Security Protocol",
    scenario: "Important security protocol document with access instructions.",
    image: level9Image,
    encryptedText: "MYVVELYK PZ OHUKSL DPAO JHZO HUK ZLHZ MVPZ",
    correctAnswer: "PASSWORD IS HANDLE WITH CASH AND SEAS FOIS",
    hints: ["Try a larger shift", "Shift 19 - letters wrap around"],
    timeSeconds: 300,
    basePoints: 10,
    hintCost: { points: 3, time: 10 },
    maxAttempts: 5
  },
  {
    id: 10,
    title: "File 10 — Master Plan",
    scenario: "The final encrypted master plan document from the main evidence folder.",
    image: level10Image,
    encryptedText: "QVMZO OEEORX TM YOMU DOENCSOL OE SKVM. VDROTTV UZOM OREVPV. OZZ EVOLD CVOSB QTC YUVCOETYM YZEV QVYVC.",
    correctAnswer: "FINAL ATTACK ON BANK SATURDAY AT DAWN. ESCAPE PLAN ACTIVE. ALL TEAMS READY FOR OPERATION BLUE FIBER.",
    hints: ["Maximum shift - try 22", "This is the hardest one"],
    timeSeconds: 300,
    basePoints: 10,
    hintCost: { points: 3, time: 10 },
    maxAttempts: 5
  }
];

const EncryptionGame = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentLevel, setCurrentLevel] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [selectedShift, setSelectedShift] = useState(1);
  const [timeLeft, setTimeLeft] = useState(levels[0].timeSeconds);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [gameResults, setGameResults] = useState<any[]>([]);
  const [isLocked, setIsLocked] = useState(false);
  const [evidenceFragments, setEvidenceFragments] = useState<string[]>([]);

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

  const generateShiftedAlphabet = (shift: number): string => {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return alphabet.split('').map(letter => 
      String.fromCharCode(((letter.charCodeAt(0) - 65 + shift) % 26) + 65)
    ).join(' ');
  };

  const getEvidenceFragment = (levelId: number): string => {
    const fragments = [
      "Hacker's welcome message confirmed",
      "Meeting location: downtown cafe",
      "Attack plan is ready",
      "Target: bank manager John",
      "Backdoor activation at 3AM",
      "Two-part security bypass",
      "Network access compromised",
      "Database credentials stolen",
      "Password security breached",
      "Full operation scheduled for Saturday dawn"
    ];
    return fragments[levelId - 1] || "Evidence fragment recovered";
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
      
      const evidenceFragment = getEvidenceFragment(currentLevel + 1);
      setEvidenceFragments(prev => [...prev, evidenceFragment]);
      
      const result = {
        level: currentLevel + 1,
        points,
        timeTaken: currentLevelData.timeSeconds - timeLeft,
        hintsUsed,
        attempts: attempts + 1,
        status: 'success',
        correctAnswer: currentLevelData.correctAnswer,
        evidence: evidenceFragment
      };
      setGameResults(prev => [...prev, result]);
      
      setFeedback(`Decrypted successfully! File unlocked. Evidence: ${evidenceFragment}`);
      
      toast({
        title: "File Decrypted!",
        description: `Evidence recovered: ${evidenceFragment}`,
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
        setFeedback(`Decryption failed. File remains locked. Attempts left: ${currentLevelData.maxAttempts - newAttempts}. Remember: weak encryption allows hackers to succeed.`);
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
        totalLevels: levels.length,
        evidenceFragments
      }));
      navigate('/encryption-results');
    } else {
      setCurrentLevel(prev => prev + 1);
      setSelectedShift(1); // Reset shift selection for next level
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

        {/* Alphabet Helper */}
        <div className="cyber-card p-4 mb-6">
          <h3 className="font-bold mb-3">Caesar Cipher Helper:</h3>
          <div className="space-y-2">
            <div className="text-sm">
              <span className="font-mono">Normal:  A B C D E F G H I J K L M N O P Q R S T U V W X Y Z</span>
            </div>
            <div className="text-sm">
              <span className="font-mono text-[hsl(var(--cyber-cyan))]">Shift {selectedShift}: {generateShiftedAlphabet(selectedShift)}</span>
            </div>
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
              <div className="bg-background/50 p-4 rounded-lg font-mono text-[hsl(var(--cyber-cyan))] break-all text-lg">
                {currentLevelData.encryptedText}
              </div>
            </div>
          </div>

          {/* Right Column - Controls */}
          <div className="space-y-6">
            {/* Shift Selection */}
            <div className="cyber-card p-6">
              <h3 className="font-bold mb-4">Select Caesar Shift:</h3>
              <div className="flex items-center gap-4">
                <label htmlFor="shift-select" className="text-sm">Shift by:</label>
                <select
                  id="shift-select"
                  value={selectedShift}
                  onChange={(e) => setSelectedShift(Number(e.target.value))}
                  className="bg-background border border-border rounded-lg p-2 font-mono"
                  disabled={isLocked}
                >
                  {Array.from({ length: 25 }, (_, i) => i + 1).map(shift => (
                    <option key={shift} value={shift}>{shift} letters</option>
                  ))}
                </select>
                <span className="text-sm text-muted-foreground">letters</span>
              </div>
            </div>

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
