import { Button } from "@/components/ui/button";
import { Bold, Italic, List, ListOrdered, Heading2, Quote, Code, Minus } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { RefObject } from "react";

interface NotesToolbarProps {
  textareaRef: RefObject<HTMLTextAreaElement>;
  value: string;
  onChange: (value: string) => void;
}

type FormatAction = {
  icon: React.ElementType;
  label: string;
  apply: (text: string, start: number, end: number) => { newText: string; newStart: number; newEnd: number };
};

const wrapSelection = (
  text: string,
  start: number,
  end: number,
  prefix: string,
  suffix: string
) => {
  const before = text.slice(0, start);
  const selected = text.slice(start, end);
  const after = text.slice(end);
  const newText = `${before}${prefix}${selected || "text"}${suffix}${after}`;
  const newStart = start + prefix.length;
  const newEnd = newStart + (selected.length || 4);
  return { newText, newStart, newEnd };
};

const prefixLines = (
  text: string,
  start: number,
  end: number,
  prefixFn: (index: number) => string
) => {
  const before = text.slice(0, start);
  const selected = text.slice(start, end) || "Item";
  const after = text.slice(end);
  const lines = selected.split("\n");
  const prefixed = lines.map((line, i) => `${prefixFn(i)}${line}`).join("\n");
  return {
    newText: `${before}${prefixed}${after}`,
    newStart: start,
    newEnd: start + prefixed.length,
  };
};

const actions: FormatAction[] = [
  {
    icon: Bold,
    label: "Bold",
    apply: (t, s, e) => wrapSelection(t, s, e, "**", "**"),
  },
  {
    icon: Italic,
    label: "Italic",
    apply: (t, s, e) => wrapSelection(t, s, e, "_", "_"),
  },
  {
    icon: Heading2,
    label: "Heading",
    apply: (t, s, e) => {
      const before = t.slice(0, s);
      const selected = t.slice(s, e) || "Heading";
      const after = t.slice(e);
      const needsNewline = before.length > 0 && !before.endsWith("\n") ? "\n" : "";
      const prefix = `${needsNewline}## `;
      const newText = `${before}${prefix}${selected}${after}`;
      return { newText, newStart: s + prefix.length, newEnd: s + prefix.length + selected.length };
    },
  },
  {
    icon: List,
    label: "Bullet list",
    apply: (t, s, e) => prefixLines(t, s, e, () => "- "),
  },
  {
    icon: ListOrdered,
    label: "Numbered list",
    apply: (t, s, e) => prefixLines(t, s, e, (i) => `${i + 1}. `),
  },
  {
    icon: Quote,
    label: "Quote",
    apply: (t, s, e) => prefixLines(t, s, e, () => "> "),
  },
  {
    icon: Code,
    label: "Code",
    apply: (t, s, e) => wrapSelection(t, s, e, "`", "`"),
  },
  {
    icon: Minus,
    label: "Divider",
    apply: (t, s, e) => {
      const before = t.slice(0, s);
      const after = t.slice(e);
      const needsNewline = before.length > 0 && !before.endsWith("\n") ? "\n" : "";
      const divider = `${needsNewline}\n---\n\n`;
      return { newText: `${before}${divider}${after}`, newStart: s + divider.length, newEnd: s + divider.length };
    },
  },
];

const NotesToolbar = ({ textareaRef, value, onChange }: NotesToolbarProps) => {
  const applyFormat = (action: FormatAction) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const { newText, newStart, newEnd } = action.apply(value, start, end);

    onChange(newText);

    // Restore cursor position after React re-render
    requestAnimationFrame(() => {
      textarea.focus();
      textarea.setSelectionRange(newStart, newEnd);
    });
  };

  return (
    <TooltipProvider delayDuration={300}>
      <div className="flex items-center gap-0.5 border border-input rounded-t-md bg-muted/50 px-1 py-1">
        {actions.map((action) => (
          <Tooltip key={action.label}>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-7 w-7"
                onClick={() => applyFormat(action)}
              >
                <action.icon className="h-3.5 w-3.5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top" className="text-xs">
              {action.label}
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
};

export default NotesToolbar;
