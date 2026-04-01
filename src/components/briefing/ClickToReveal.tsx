import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface ClickToRevealProps {
  title: string;
  children: React.ReactNode;
  variant?: "default" | "warning" | "dark";
}

const ClickToReveal = ({ title, children, variant = "default" }: ClickToRevealProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={cn(
        "rounded-lg overflow-hidden transition-all duration-200",
        variant === "warning" && "bg-card border-l-4 border-l-accent shadow-sm",
        variant === "dark" && "bg-primary/10",
        variant === "default" && "bg-card shadow-sm"
      )}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full flex items-center justify-between p-4 text-left font-medium transition-colors",
          variant === "warning" && "hover:bg-accent/10",
          variant === "dark" && "text-primary-foreground hover:bg-primary/20",
          variant === "default" && "hover:bg-muted"
        )}
      >
        <span>{title}</span>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 flex-shrink-0" />
        ) : (
          <ChevronDown className="h-5 w-5 flex-shrink-0" />
        )}
      </button>
      <div
        className={cn(
          "overflow-hidden transition-all duration-300 ease-in-out",
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="px-4 pb-4 text-sm text-muted-foreground">{children}</div>
      </div>
    </div>
  );
};

export default ClickToReveal;