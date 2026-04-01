import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";
import { useEffect, useCallback } from "react";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Code,
  Minus,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Indent,
  Outdent,
  Undo,
  Redo,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface RichTextEditorProps {
  content: string;
  onChange: (html: string) => void;
  onPaste?: (e: ClipboardEvent) => void;
  placeholder?: string;
}

const ToolbarButton = ({
  onClick,
  isActive,
  icon: Icon,
  label,
  disabled,
}: {
  onClick: () => void;
  isActive?: boolean;
  icon: React.ElementType;
  label: string;
  disabled?: boolean;
}) => (
  <Tooltip>
    <TooltipTrigger asChild>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className={cn("h-7 w-7", isActive && "bg-accent text-accent-foreground")}
        onClick={onClick}
        disabled={disabled}
      >
        <Icon className="h-3.5 w-3.5" />
      </Button>
    </TooltipTrigger>
    <TooltipContent side="top" className="text-xs">
      {label}
    </TooltipContent>
  </Tooltip>
);

const Separator = () => <div className="w-px h-5 bg-border mx-0.5" />;

const RichTextEditor = ({ content, onChange, onPaste, placeholder }: RichTextEditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      Underline,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Placeholder.configure({
        placeholder: placeholder || "Start typing...",
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-sm max-w-none min-h-[150px] px-3 py-2 focus:outline-none [&_ul]:list-disc [&_ol]:list-decimal [&_ul]:pl-6 [&_ol]:pl-6 [&_blockquote]:border-l-2 [&_blockquote]:border-muted-foreground/30 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-muted-foreground [&_code]:bg-muted [&_code]:px-1 [&_code]:rounded [&_h1]:text-xl [&_h1]:font-bold [&_h1]:mt-4 [&_h1]:mb-2 [&_h2]:text-lg [&_h2]:font-bold [&_h2]:mt-3 [&_h2]:mb-1 [&_h3]:text-base [&_h3]:font-semibold [&_h3]:mt-2 [&_h3]:mb-1 [&_hr]:my-3 [&_p]:my-1",
      },
      handlePaste: (view, event) => {
        // Check for image paste
        const items = event.clipboardData?.items;
        if (items) {
          for (const item of items) {
            if (item.type.startsWith("image/")) {
              event.preventDefault();
              onPaste?.(event as unknown as ClipboardEvent);
              return true;
            }
          }
        }
        return false;
      },
    },
  });

  // Sync content from parent when sessionId changes
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [editor, content]);

  const handleIndent = useCallback(() => {
    if (!editor) return;
    if (editor.isActive("bulletList") || editor.isActive("orderedList")) {
      editor.chain().focus().sinkListItem("listItem").run();
    } else {
      // For non-list content, wrap in blockquote as indent
      editor.chain().focus().toggleBlockquote().run();
    }
  }, [editor]);

  const handleOutdent = useCallback(() => {
    if (!editor) return;
    if (editor.isActive("bulletList") || editor.isActive("orderedList")) {
      editor.chain().focus().liftListItem("listItem").run();
    } else if (editor.isActive("blockquote")) {
      editor.chain().focus().toggleBlockquote().run();
    }
  }, [editor]);

  if (!editor) return null;

  return (
    <TooltipProvider delayDuration={300}>
      <div className="border border-input rounded-md overflow-hidden">
        {/* Toolbar */}
        <div className="flex items-center gap-0.5 flex-wrap bg-muted/50 px-1 py-1 border-b border-input">
          <ToolbarButton
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            icon={Undo}
            label="Undo (Ctrl+Z)"
          />
          <ToolbarButton
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            icon={Redo}
            label="Redo (Ctrl+Y)"
          />

          <Separator />

          <ToolbarButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            isActive={editor.isActive("heading", { level: 1 })}
            icon={Heading1}
            label="Heading 1"
          />
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            isActive={editor.isActive("heading", { level: 2 })}
            icon={Heading2}
            label="Heading 2"
          />
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            isActive={editor.isActive("heading", { level: 3 })}
            icon={Heading3}
            label="Heading 3"
          />

          <Separator />

          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            isActive={editor.isActive("bold")}
            icon={Bold}
            label="Bold (Ctrl+B)"
          />
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            isActive={editor.isActive("italic")}
            icon={Italic}
            label="Italic (Ctrl+I)"
          />
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            isActive={editor.isActive("underline")}
            icon={UnderlineIcon}
            label="Underline (Ctrl+U)"
          />
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleStrike().run()}
            isActive={editor.isActive("strike")}
            icon={Strikethrough}
            label="Strikethrough"
          />
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleCode().run()}
            isActive={editor.isActive("code")}
            icon={Code}
            label="Inline Code"
          />

          <Separator />

          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            isActive={editor.isActive("bulletList")}
            icon={List}
            label="Bullet List"
          />
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            isActive={editor.isActive("orderedList")}
            icon={ListOrdered}
            label="Numbered List"
          />
          <ToolbarButton
            onClick={handleOutdent}
            icon={Outdent}
            label="Decrease Indent"
          />
          <ToolbarButton
            onClick={handleIndent}
            icon={Indent}
            label="Increase Indent"
          />

          <Separator />

          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
            isActive={editor.isActive({ textAlign: "left" })}
            icon={AlignLeft}
            label="Align Left"
          />
          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            isActive={editor.isActive({ textAlign: "center" })}
            icon={AlignCenter}
            label="Align Center"
          />
          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
            isActive={editor.isActive({ textAlign: "right" })}
            icon={AlignRight}
            label="Align Right"
          />

          <Separator />

          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            isActive={editor.isActive("blockquote")}
            icon={Quote}
            label="Quote"
          />
          <ToolbarButton
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
            icon={Minus}
            label="Divider"
          />
        </div>

        {/* Editor */}
        <EditorContent editor={editor} className="bg-background text-sm" />
      </div>
    </TooltipProvider>
  );
};

export default RichTextEditor;
