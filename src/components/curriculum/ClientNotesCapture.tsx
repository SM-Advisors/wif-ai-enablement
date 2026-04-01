import { useState, useEffect, useRef, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Upload, Image, FileText, X, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface Attachment {
  id: string;
  file_name: string;
  file_path: string;
  file_type: string;
  file_size: number | null;
}

interface ClientNotesCaptureProps {
  sessionId: string;
}

const ClientNotesCapture = ({ sessionId }: ClientNotesCaptureProps) => {
  const { user } = useAuth();
  const [notes, setNotes] = useState("");
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [noteId, setNoteId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Fetch existing notes and attachments
  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;

      const [notesResult, attachmentsResult] = await Promise.all([
        supabase
          .from("user_session_notes")
          .select("*")
          .eq("session_id", sessionId)
          .eq("user_id", user.id)
          .maybeSingle(),
        supabase
          .from("user_session_attachments")
          .select("*")
          .eq("session_id", sessionId)
          .eq("user_id", user.id)
          .order("created_at", { ascending: false }),
      ]);

      if (notesResult.data) {
        setNotes(notesResult.data.notes_markdown || "");
        setNoteId(notesResult.data.id);
      }

      if (attachmentsResult.data) {
        setAttachments(attachmentsResult.data);
      }

      setIsLoading(false);
    };

    fetchData();
  }, [sessionId, user]);

  // Save notes with debounce
  const saveNotes = useCallback(
    async (content: string) => {
      if (!user) return;

      if (noteId) {
        await supabase
          .from("user_session_notes")
          .update({ notes_markdown: content })
          .eq("id", noteId);
      } else {
        const { data } = await supabase
          .from("user_session_notes")
          .insert({
            user_id: user.id,
            session_id: sessionId,
            notes_markdown: content,
          })
          .select()
          .single();
        if (data) setNoteId(data.id);
      }
    },
    [noteId, sessionId, user]
  );

  const handleNotesChange = (value: string) => {
    setNotes(value);

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => {
      saveNotes(value);
    }, 500);
  };

  // Handle paste for screenshots
  const handlePaste = async (e: React.ClipboardEvent) => {
    const items = e.clipboardData.items;
    for (const item of items) {
      if (item.type.startsWith("image/")) {
        e.preventDefault();
        const file = item.getAsFile();
        if (file) {
          await uploadFile(file);
        }
        break;
      }
    }
  };

  // Upload file to storage
  const uploadFile = async (file: File) => {
    if (!user) return;

    setIsUploading(true);
    try {
      const fileExt = file.name.split(".").pop() || "png";
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `${user.id}/${sessionId}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("session-attachments")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Save reference to database
      const { data, error: dbError } = await supabase
        .from("user_session_attachments")
        .insert({
          user_id: user.id,
          session_id: sessionId,
          file_name: file.name,
          file_path: filePath,
          file_type: file.type,
          file_size: file.size,
        })
        .select()
        .single();

      if (dbError) throw dbError;

      if (data) {
        setAttachments((prev) => [data, ...prev]);
      }
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setIsUploading(false);
    }
  };

  // Handle file input change
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      for (const file of files) {
        await uploadFile(file);
      }
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Delete attachment
  const deleteAttachment = async (attachment: Attachment) => {
    try {
      await supabase.storage
        .from("session-attachments")
        .remove([attachment.file_path]);

      await supabase
        .from("user_session_attachments")
        .delete()
        .eq("id", attachment.id);

      setAttachments((prev) => prev.filter((a) => a.id !== attachment.id));
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  // Get signed URL for viewing
  const getFileUrl = async (filePath: string): Promise<string | null> => {
    const { data } = await supabase.storage
      .from("session-attachments")
      .createSignedUrl(filePath, 3600);
    return data?.signedUrl || null;
  };

  const isImage = (fileType: string) => fileType.startsWith("image/");

  if (isLoading) {
    return (
      <Card className="border-2">
        <CardContent className="py-8 flex items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card id="notes" className="border-2">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">My Notes</CardTitle>
        <p className="text-xs text-muted-foreground">
          Your notes are private and only visible to you
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="client-notes" className="text-sm font-medium">
            Notes
          </Label>
          <Textarea
            id="client-notes"
            placeholder="Add your notes here... You can paste screenshots directly (Ctrl+V / Cmd+V)"
            value={notes}
            onChange={(e) => handleNotesChange(e.target.value)}
            onPaste={handlePaste}
            className="min-h-[150px] text-sm"
          />
        </div>

        {/* Upload Button */}
        <div className="flex items-center gap-2">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt"
            multiple
            onChange={handleFileChange}
            className="hidden"
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="gap-2"
          >
            {isUploading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Upload className="h-4 w-4" />
            )}
            Upload Document
          </Button>
          <span className="text-xs text-muted-foreground">
            or paste a screenshot (Ctrl+V)
          </span>
        </div>

        {/* Attachments List */}
        {attachments.length > 0 && (
          <div className="space-y-2">
            <Label className="text-sm font-medium">Attachments</Label>
            <div className="grid gap-2">
              {attachments.map((attachment) => (
                <AttachmentItem
                  key={attachment.id}
                  attachment={attachment}
                  getFileUrl={getFileUrl}
                  onDelete={() => deleteAttachment(attachment)}
                  isImage={isImage(attachment.file_type)}
                />
              ))}
            </div>
          </div>
        )}

        <p className="text-xs text-muted-foreground">
          Changes are saved automatically.
        </p>
      </CardContent>
    </Card>
  );
};

// Separate component for attachments to handle async URL fetching
const AttachmentItem = ({
  attachment,
  getFileUrl,
  onDelete,
  isImage,
}: {
  attachment: Attachment;
  getFileUrl: (path: string) => Promise<string | null>;
  onDelete: () => void;
  isImage: boolean;
}) => {
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    getFileUrl(attachment.file_path).then(setUrl);
  }, [attachment.file_path, getFileUrl]);

  return (
    <div className="flex items-center gap-3 p-2 bg-muted rounded-lg">
      {isImage && url ? (
        <a href={url} target="_blank" rel="noopener noreferrer">
          <img
            src={url}
            alt={attachment.file_name}
            className="h-12 w-12 object-cover rounded"
          />
        </a>
      ) : (
        <div className="h-12 w-12 flex items-center justify-center bg-background rounded">
          {isImage ? (
            <Image className="h-5 w-5 text-muted-foreground" />
          ) : (
            <FileText className="h-5 w-5 text-muted-foreground" />
          )}
        </div>
      )}
      <div className="flex-1 min-w-0">
        <a
          href={url || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium truncate block hover:underline"
        >
          {attachment.file_name}
        </a>
        <p className="text-xs text-muted-foreground">
          {attachment.file_size
            ? `${(attachment.file_size / 1024).toFixed(1)} KB`
            : ""}
        </p>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 shrink-0"
        onClick={onDelete}
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default ClientNotesCapture;
