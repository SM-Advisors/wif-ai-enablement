import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface AccordionItem {
  icon: LucideIcon;
  title: string;
  content: string[];
}

interface SingleAccordionProps {
  items: AccordionItem[];
}

const SingleAccordion = ({ items }: SingleAccordionProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-3">
      {items.map((item, index) => {
        const Icon = item.icon;
        const isOpen = openIndex === index;

        return (
          <div
            key={index}
            className="bg-card rounded-lg shadow-sm border border-border overflow-hidden"
          >
            <button
              onClick={() => toggleItem(index)}
              className="w-full flex items-center gap-3 p-4 text-left hover:bg-muted transition-colors"
            >
              <Icon className="h-5 w-5 text-accent flex-shrink-0" />
              <span className="font-semibold flex-1">{item.title}</span>
              <ChevronDown
                className={cn(
                  "h-5 w-5 text-muted-foreground transition-transform duration-200",
                  isOpen && "rotate-180"
                )}
              />
            </button>
            <div
              className={cn(
                "overflow-hidden transition-all duration-300 ease-in-out",
                isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              )}
            >
              <div className="px-4 pb-4 pl-12 space-y-2">
                {item.content.map((line, i) => (
                  <p key={i} className="text-sm text-muted-foreground">
                    {line}
                  </p>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SingleAccordion;