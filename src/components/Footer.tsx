import { HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="mt-16 pt-8 border-t border-border/50">
      {/* Motivational Message */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center space-x-2 bg-[hsl(var(--cyber-orange))]/20 text-[hsl(var(--cyber-orange))] px-4 py-2 rounded-full">
          <span className="text-xl">🔥</span>
          <span className="font-semibold">Keep going! 7-day streak achieved!</span>
        </div>
      </div>

      {/* Footer Links */}
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="flex space-x-6 mb-4 md:mb-0">
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
            About
          </a>
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
            Contact
          </a>
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
            Privacy
          </a>
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
            Terms
          </a>
        </div>
        
        <p className="text-muted-foreground text-sm">
          © 2024 CyberSec Arena. All rights reserved.
        </p>
      </div>

      {/* Help Button - Fixed Position */}
      <Button 
        variant="outline" 
        size="icon"
        className="fixed bottom-6 right-6 w-12 h-12 rounded-full border-primary/50 hover:border-primary shadow-lg"
      >
        <HelpCircle className="w-6 h-6" />
      </Button>
    </footer>
  );
};

export default Footer;