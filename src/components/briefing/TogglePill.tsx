import { cn } from "@/lib/utils";

interface TogglePillProps {
  options: string[];
  selected: number;
  onChange: (index: number) => void;
}

const TogglePill = ({ options, selected, onChange }: TogglePillProps) => {
  return (
    <div className="inline-flex bg-muted rounded-full p-1">
      {options.map((option, index) => (
        <button
          key={index}
          onClick={() => onChange(index)}
          className={cn(
            "px-4 py-2 text-sm font-medium rounded-full transition-all duration-200",
            selected === index
              ? "bg-accent text-accent-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default TogglePill;