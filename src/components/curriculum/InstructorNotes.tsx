import { useState, useEffect, useRef, useCallback } from "react";
import { toast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Upload,
  Image,
  FileText,
  X,
  Loader2,
  Link as LinkIcon,
  Save,
  Check,
  Plus,
  ExternalLink,
  MessageSquare,
} from "lucide-react";
import RichTextEditor from "./RichTextEditor";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface FileAttachment {
  id: string;
  file_name: string;
  file_path: string;
  file_type: string;
  file_size: number | null;
}

interface LinkItem {
  id: string;
  title: string;
  url: string;
}

interface InstructorNotesProps {
  sessionId: string;
}

const InstructorNotes = ({ sessionId }: InstructorNotesProps) => {
  const { user, isTrainer } = useAuth();
  const [notes, setNotes] = useState("");
  const [files, setFiles] = useState<FileAttachment[]>([]);
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const savedNotesRef = useRef("");
  const [contentId, setContentId] = useState<string | null>(null);
  const [newLinkTitle, setNewLinkTitle] = useState("");
  const [newLinkUrl, setNewLinkUrl] = useState("");
  const [showLinkForm, setShowLinkForm] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const [contentResult, filesResult, linksResult] = await Promise.all([
        supabase
          .from("instructor_session_content")
          .select("*")
          .eq("session_id", sessionId)
          .maybeSingle(),
        supabase
          .from("instructor_session_files")
          .select("*")
          .eq("session_id", sessionId)
          .order("created_at", { ascending: false }),
        supabase
          .from("instructor_session_links")
          .select("*")
          .eq("session_id", sessionId)
          .order("created_at", { ascending: false }),
      ]);

      if (contentResult.data) {
        const loaded = contentResult.data.notes_markdown || "";
        setNotes(loaded);
        savedNotesRef.current = loaded;
        setContentId(contentResult.data.id);
      }
      if (filesResult.data) setFiles(filesResult.data);
      if (linksResult.data) setLinks(linksResult.data);
      setIsLoading(false);
    };
    fetchData();
  }, [sessionId]);

  const saveNotes = useCallback(
    async (content: string, showToast = false) => {
      if (!isTrainer) return;
      if (showToast) setIsSaving(true);
      try {
        if (contentId) {
          const { error } = await supabase
            .from("instructor_session_content")
            .update({ notes_markdown: content })
            .eq("id", contentId);
          if (error) throw error;
        } else {
          const { data, error } = await supabase
            .from("instructor_session_content")
            .insert({ session_id: sessionId, notes_markdown: content })
            .select()
            .single();
          if (error) throw error;
          if (data) setContentId(data.id);
        }
        savedNotesRef.current = content;
        setIsDirty(false);
        if (showToast) {
          toast({ title: "Notes saved", description: "Your notes have been saved successfully." });
        }
      } catch (error) {
        console.error("Save error:", error);
        if (showToast) {
          toast({ title: "Save failed", description: "Could not save notes. Please try again.", variant: "destructive" });
        }
      } finally {
        if (showToast) setIsSaving(false);
      }
    },
    [contentId, sessionId, isTrainer]
  );

  const handleNotesChange = (value: string) => {
    setNotes(value);
    setIsDirty(value !== savedNotesRef.current);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => saveNotes(value), 500);
  };

  const handleManualSave = () => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    saveNotes(notes, true);
  };

  const handlePaste = async (e: React.ClipboardEvent) => {
    if (!isTrainer) return;
    const items = e.clipboardData.items;
    for (const item of items) {
      if (item.type.startsWith("image/")) {
        e.preventDefault();
        const file = item.getAsFile();
        if (file) await uploadFile(file);
        break;
      }
    }
  };

  const uploadFile = async (file: File) => {
    if (!isTrainer || !user) return;
    setIsUploading(true);
    try {
      const fileExt = file.name.split(".").pop() || "png";
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `${sessionId}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("instructor-files")
        .upload(filePath, file);
      if (uploadError) throw uploadError;

      const { data, error: dbError } = await supabase
        .from("instructor_session_files")
        .insert({
          session_id: sessionId,
          file_name: file.name,
          file_path: filePath,
          file_type: file.type,
          file_size: file.size,
        })
        .select()
        .single();
      if (dbError) throw dbError;
      if (data) setFiles((prev) => [data, ...prev]);
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (fileList) {
      for (const file of fileList) await uploadFile(file);
    }
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const deleteFile = async (file: FileAttachment) => {
    await supabase.storage.from("instructor-files").remove([file.file_path]);
    await supabase.from("instructor_session_files").delete().eq("id", file.id);
    setFiles((prev) => prev.filter((f) => f.id !== file.id));
  };

  const addLink = async () => {
    if (!newLinkTitle.trim() || !newLinkUrl.trim() || !isTrainer) return;
    const url = newLinkUrl.startsWith("http") ? newLinkUrl : `https://${newLinkUrl}`;
    const { data, error } = await supabase
      .from("instructor_session_links")
      .insert({ session_id: sessionId, title: newLinkTitle.trim(), url })
      .select()
      .single();
    if (!error && data) {
      setLinks((prev) => [data, ...prev]);
      setNewLinkTitle("");
      setNewLinkUrl("");
      setShowLinkForm(false);
    }
  };

  const deleteLink = async (linkId: string) => {
    await supabase.from("instructor_session_links").delete().eq("id", linkId);
    setLinks((prev) => prev.filter((l) => l.id !== linkId));
  };

  const getPublicUrl = (filePath: string) => {
    const { data } = supabase.storage.from("instructor-files").getPublicUrl(filePath);
    return data.publicUrl;
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

  const hasContent = notes.trim() || files.length > 0 || links.length > 0;

  return (
    <Card id="notes" className="border-2">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-secondary" />
          Notes from the Instructor
        </CardTitle>
        {isTrainer && (
          <p className="text-xs text-muted-foreground">
            These notes are visible to all users in this session
          </p>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Notes text */}
        {isTrainer ? (
          <div className="space-y-2">
            <Label htmlFor="instructor-notes" className="text-sm font-medium">
              Notes
            </Label>
            <RichTextEditor
              content={notes}
              onChange={handleNotesChange}
              onPaste={(e) => {
                const items = (e as any).clipboardData?.items;
                if (items) {
                  for (const item of items) {
                    if (item.type.startsWith("image/")) {
                      const file = item.getAsFile();
                      if (file) uploadFile(file);
                      break;
                    }
                  }
                }
              }}
              placeholder="Add notes for participants... You can paste screenshots (Ctrl+V / Cmd+V)"
            />
          </div>
        ) : (
          notes.trim() && (
            <div
              className="prose prose-sm max-w-none text-foreground [&_ul]:list-disc [&_ol]:list-decimal [&_ul]:pl-6 [&_ol]:pl-6 [&_blockquote]:border-l-2 [&_blockquote]:border-muted-foreground/30 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-muted-foreground [&_code]:bg-muted [&_code]:px-1 [&_code]:rounded [&_h1]:text-xl [&_h1]:font-bold [&_h2]:text-lg [&_h2]:font-bold [&_h3]:text-base [&_h3]:font-semibold [&_hr]:my-3 [&_p]:my-1"
              dangerouslySetInnerHTML={{ __html: notes }}
            />
          )
        )}

        {/* Trainer: Upload + Add Link buttons */}
        {isTrainer && (
          <div className="flex items-center gap-2 flex-wrap">
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
              Upload File
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setShowLinkForm(!showLinkForm)}
              className="gap-2"
            >
              <LinkIcon className="h-4 w-4" />
              Add Link
            </Button>
            <span className="text-xs text-muted-foreground">
              or paste a screenshot (Ctrl+V)
            </span>
          </div>
        )}

        {/* Add Link Form (trainer only) */}
        {isTrainer && showLinkForm && (
          <div className="flex flex-col sm:flex-row gap-2 p-3 bg-muted rounded-lg">
            <Input
              placeholder="Link title"
              value={newLinkTitle}
              onChange={(e) => setNewLinkTitle(e.target.value)}
              className="text-sm"
            />
            <Input
              placeholder="https://..."
              value={newLinkUrl}
              onChange={(e) => setNewLinkUrl(e.target.value)}
              className="text-sm"
            />
            <Button size="sm" onClick={addLink} className="gap-1 shrink-0">
              <Plus className="h-4 w-4" /> Add
            </Button>
          </div>
        )}

        {/* Files list */}
        {files.length > 0 && (
          <div className="space-y-2">
            <Label className="text-sm font-medium">Attachments</Label>
            <div className="grid gap-2">
              {files.map((file) => {
                const url = getPublicUrl(file.file_path);
                return (
                  <div
                    key={file.id}
                    className="flex items-center gap-3 p-2 bg-muted rounded-lg"
                  >
                    {isImage(file.file_type) && url ? (
                      <a href={url} target="_blank" rel="noopener noreferrer">
                        <img
                          src={url}
                          alt={file.file_name}
                          className="h-12 w-12 object-cover rounded"
                        />
                      </a>
                    ) : (
                      <div className="h-12 w-12 flex items-center justify-center bg-background rounded">
                        {isImage(file.file_type) ? (
                          <Image className="h-5 w-5 text-muted-foreground" />
                        ) : (
                          <FileText className="h-5 w-5 text-muted-foreground" />
                        )}
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium truncate block hover:underline"
                      >
                        {file.file_name}
                      </a>
                      <p className="text-xs text-muted-foreground">
                        {file.file_size
                          ? `${(file.file_size / 1024).toFixed(1)} KB`
                          : ""}
                      </p>
                    </div>
                    {isTrainer && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 shrink-0"
                        onClick={() => deleteFile(file)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Links list */}
        {links.length > 0 && (
          <div className="space-y-2">
            <Label className="text-sm font-medium">Links</Label>
            <div className="grid gap-2">
              {links.map((link) => (
                <div
                  key={link.id}
                  className="flex items-center gap-3 p-2 bg-muted rounded-lg"
                >
                  <div className="h-8 w-8 flex items-center justify-center bg-background rounded">
                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 min-w-0 text-sm font-medium truncate hover:underline text-secondary"
                  >
                    {link.title}
                  </a>
                  {isTrainer && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 shrink-0"
                      onClick={() => deleteLink(link.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty state for non-trainers */}
        {!isTrainer && !hasContent && (
          <p className="text-sm text-muted-foreground italic">
            No notes have been added for this session yet.
          </p>
        )}

        {isTrainer && (
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">
              {isDirty ? "Unsaved changes" : "All changes saved"}
            </p>
            <Button
              type="button"
              size="sm"
              onClick={handleManualSave}
              disabled={isSaving || !isDirty}
              className="gap-2"
            >
              {isSaving ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : isDirty ? (
                <Save className="h-4 w-4" />
              ) : (
                <Check className="h-4 w-4" />
              )}
              {isSaving ? "Saving..." : isDirty ? "Save" : "Saved"}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default InstructorNotes;
