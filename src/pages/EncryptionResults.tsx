import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Trophy, FileText, RotateCcw, Share } from "lucide-react";
import finalReportImage from "@/assets/final-report.jpg";

interface GameResult {
  level: number;
  points: number;
  timeTaken: number;
  hintsUsed: number;
  attempts: number;
  status: 'success' | 'failed' | 'timeout' | 'skipped';
  correctAnswer: string;
}

interface EncryptionResults {
  score: number;
  results: GameResult[];
  totalLevels: number;
}

const EncryptionResults = () => {
  const navigate = useNavigate();
  const [results, setResults] = useState<EncryptionResults | null>(null);

  useEffect(() => {
    const savedResults = localStorage.getItem('encryption-results');
    if (savedResults) {
      setResults(JSON.parse(savedResults));
      
      // Update progress in localStorage for dashboard
      const progressData = {
        completed: JSON.parse(savedResults).results.filter((r: GameResult) => r.status === 'success').length,
        total: 10
      };
      localStorage.setItem('encryption-progress', JSON.stringify(progressData));
    }
  }, []);

  const getRank = (score: number) => {
    if (score >= 300) return { title: "Encryption Expert", color: "text-yellow-400" };
    if (score >= 200) return { title: "Forensics Specialist", color: "text-[hsl(var(--cyber-cyan))]" };
    if (score >= 100) return { title: "Investigator in Training", color: "text-blue-400" };
    return { title: "Needs More Practice", color: "text-gray-400" };
  };

  const generateIncidentReport = (results: GameResult[]) => {
    const successfulDecryptions = results.filter(r => r.status === 'success');
    const evidence = successfulDecryptions.map(r => r.correctAnswer);
    
    let narrative = "INCIDENT ANALYSIS REPORT\n\n";
    narrative += "Based on decrypted evidence from the suspect's device:\n\n";
    
    if (evidence.length > 0) {
      narrative += "RECOVERED EVIDENCE:\n";
      evidence.forEach((item, index) => {
        narrative += `${index + 1}. ${item}\n`;
      });
      
      narrative += "\nTIMELINE RECONSTRUCTION:\n";
      narrative += "The attacker planned a coordinated operation targeting financial institutions. ";
      narrative += "Evidence suggests the use of insider knowledge and systematic reconnaissance. ";
      narrative += "The encryption methods indicate intermediate technical capability.\n\n";
      
      narrative += "THREAT ASSESSMENT:\n";
      narrative += "High-risk operation with potential for significant financial damage. ";
      narrative += "The suspect demonstrates knowledge of social engineering and technical exploitation.\n\n";
    } else {
      narrative += "INSUFFICIENT EVIDENCE:\n";
      narrative += "Critical files could not be decrypted, weakening the case. ";
      narrative += "Additional forensic analysis may be required.\n\n";
    }
    
    narrative += "RECOMMENDATION:\n";
    narrative += "Immediate containment measures and enhanced monitoring protocols advised.";
    
    return narrative;
  };

  const downloadReport = () => {
    if (!results) return;
    
    const report = generateIncidentReport(results.results);
    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'forensic-analysis-report.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!results) {
    return (
      <div className="min-h-screen cyber-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[hsl(var(--cyber-cyan))] mx-auto mb-4"></div>
          <p>Loading results...</p>
        </div>
      </div>
    );
  }

  const rank = getRank(results.score);
  const successCount = results.results.filter(r => r.status === 'success').length;
  const totalTime = results.results.reduce((sum, r) => sum + r.timeTaken, 0);

  return (
    <div className="min-h-screen cyber-background p-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">
            Investigation <span className="text-[hsl(var(--cyber-cyan))]">Complete</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Forensic analysis report generated
          </p>
        </div>

        {/* Final Report Image */}
        <div className="cyber-card p-8 mb-8 text-center">
          <img 
            src={finalReportImage} 
            alt="Final forensic investigation scene"
            className="w-full max-w-4xl mx-auto rounded-xl mb-6"
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Score Summary */}
          <div className="cyber-card p-6">
            <div className="flex items-center mb-6">
              <Trophy className="w-8 h-8 text-[hsl(var(--cyber-cyan))] mr-3" />
              <h2 className="text-2xl font-bold">Final Score</h2>
            </div>
            
            <div className="text-center space-y-4">
              <div className="text-6xl font-bold text-[hsl(var(--cyber-cyan))]">
                {results.score}
              </div>
              <div className={`text-2xl font-bold ${rank.color}`}>
                {rank.title}
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="p-3 bg-background/50 rounded-lg">
                  <div className="font-semibold">Files Decrypted</div>
                  <div className="text-[hsl(var(--cyber-cyan))]">{successCount}/{results.totalLevels}</div>
                </div>
                <div className="p-3 bg-background/50 rounded-lg">
                  <div className="font-semibold">Total Time</div>
                  <div className="text-[hsl(var(--cyber-cyan))]">{Math.floor(totalTime / 60)}m {totalTime % 60}s</div>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Results */}
          <div className="cyber-card p-6">
            <h2 className="text-2xl font-bold mb-6">Level-by-Level Analysis</h2>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {results.results.map((result, index) => (
                <div key={index} className="p-3 bg-background/50 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-semibold">File {result.level}</div>
                      <div className="text-sm text-muted-foreground">
                        {Math.floor(result.timeTaken / 60)}m {result.timeTaken % 60}s | 
                        {result.attempts} attempts | 
                        {result.hintsUsed} hints
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`font-bold ${result.points > 0 ? 'text-[hsl(var(--cyber-cyan))]' : 'text-gray-400'}`}>
                        {result.points} pts
                      </div>
                      <div className={`text-xs px-2 py-1 rounded ${
                        result.status === 'success' ? 'bg-green-500/20 text-green-400' :
                        result.status === 'failed' ? 'bg-red-500/20 text-red-400' :
                        result.status === 'timeout' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-gray-500/20 text-gray-400'
                      }`}>
                        {result.status}
                      </div>
                    </div>
                  </div>
                  {result.status !== 'success' && (
                    <div className="text-xs text-muted-foreground mt-2">
                      Answer: {result.correctAnswer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Incident Report Summary */}
        <div className="cyber-card p-6 mt-8">
          <div className="flex items-center mb-4">
            <FileText className="w-8 h-8 text-[hsl(var(--cyber-cyan))] mr-3" />
            <h2 className="text-2xl font-bold">Incident Summary</h2>
          </div>
          <div className="bg-background/50 p-4 rounded-lg">
            <pre className="whitespace-pre-wrap text-sm text-muted-foreground">
              {generateIncidentReport(results.results)}
            </pre>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-center gap-4 mt-8">
          <Button 
            className="cyber-button flex items-center gap-2"
            onClick={downloadReport}
          >
            <FileText className="w-4 h-4" />
            Download Report
          </Button>
          <Button 
            variant="outline"
            onClick={() => navigate('/encryption-game')}
            className="flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Replay Lab
          </Button>
          <Button 
            variant="outline"
            onClick={() => navigate('/')}
            className="flex items-center gap-2"
          >
            Return to Dashboard
          </Button>
        </div>

        {/* Learning Takeaways */}
        <div className="cyber-card p-6 mt-8">
          <h2 className="text-xl font-bold mb-4 text-[hsl(var(--cyber-cyan))]">Key Learning Takeaways</h2>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <h3 className="font-semibold mb-2">Forensic Analysis Skills:</h3>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>Pattern recognition in encrypted data</li>
                <li>Systematic approach to decryption</li>
                <li>Evidence correlation and timeline reconstruction</li>
                <li>Time-critical decision making under pressure</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Encryption Concepts:</h3>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>Caesar cipher mechanics and variations</li>
                <li>Frequency analysis techniques</li>
                <li>Handling corrupted and obfuscated data</li>
                <li>Multi-layer encryption strategies</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EncryptionResults;