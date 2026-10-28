"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { LockKeyhole, LogOut, Upload, X } from "lucide-react";
import { getSupabaseClient } from "@/lib/supabase";
import { AUTHORIZED_GALLERY_USER_ID, GALLERY_BUCKET_NAME } from "@/lib/gallery";

const MAX_FILE_SIZE = 50 * 1024 * 1024;

type GalleryUploadProps = {
  onUploadComplete: () => Promise<void>;
};

function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : "An unexpected error occurred.";
}

export default function GalleryUpload({ onUploadComplete }: GalleryUploadProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const isAuthorized = userId === AUTHORIZED_GALLERY_USER_ID;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isDialogOpen && !dialog.open) {
      dialog.showModal();
    } else if (!isDialogOpen && dialog.open) {
      dialog.close();
    }
  }, [isDialogOpen]);

  useEffect(() => {
    let isMounted = true;
    let unsubscribe = () => {};

    void (async () => {
      await Promise.resolve();
      if (!isMounted) return;

      try {
        const supabase = getSupabaseClient();
        const { data } = supabase.auth.onAuthStateChange((_event, session) => {
          if (isMounted) {
            setUserId(session?.user.id ?? null);
            setIsCheckingAuth(false);
          }
        });
        unsubscribe = () => data.subscription.unsubscribe();

        const { data: sessionData, error } = await supabase.auth.getSession();
        if (!isMounted) return;
        if (error) {
          throw new Error(`Could not check sign-in status: ${error.message}`);
        }

        setUserId(sessionData.session?.user.id ?? null);
        setIsCheckingAuth(false);
      } catch (error) {
        if (isMounted) {
          setErrorMessage(getErrorMessage(error));
          setIsCheckingAuth(false);
        }
      }
    })();

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

  async function handleSignIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    setIsSigningIn(true);

    try {
      const supabase = getSupabaseClient();
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        throw new Error(`Sign-in failed: ${error.message}`);
      }
      if (!data.user || !data.session) {
        throw new Error("Sign-in completed without an active session.");
      }
      if (data.user.id !== AUTHORIZED_GALLERY_USER_ID) {
        const { error: signOutError } = await supabase.auth.signOut();
        if (signOutError) {
          throw new Error(
            `This account is not authorized to upload gallery activities. Sign-out failed: ${signOutError.message}`,
          );
        }
        throw new Error("This account is not authorized to upload gallery activities.");
      }

      setUserId(data.user.id);
      setPassword("");
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    } finally {
      setIsSigningIn(false);
      setPassword("");
    }
  }

  async function handleSignOut() {
    setErrorMessage(null);
    try {
      const { error } = await getSupabaseClient().auth.signOut();
      if (error) {
        throw new Error(`Could not sign out: ${error.message}`);
      }
      setUserId(null);
      setSelectedFiles([]);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      setSuccessMessage(null);
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    }
  }

  async function handleUpload(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (selectedFiles.length === 0) {
      setErrorMessage("Choose one or more images or videos to upload.");
      return;
    }

    const unsupportedFiles = selectedFiles.filter(
      (file) => !file.type.startsWith("image/") && !file.type.startsWith("video/"),
    );
    if (unsupportedFiles.length > 0) {
      setErrorMessage(
        `Unsupported file type: ${unsupportedFiles.map((file) => file.name).join(", ")}. Choose image or video files.`,
      );
      return;
    }

    const oversizedFiles = selectedFiles.filter((file) => file.size > MAX_FILE_SIZE);
    if (oversizedFiles.length > 0) {
      setErrorMessage(
        `These files exceed the 50 MB per-file limit: ${oversizedFiles.map((file) => file.name).join(", ")}.`,
      );
      return;
    }

    setIsUploading(true);
    try {
      const supabase = getSupabaseClient();
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

      if (sessionError) {
        throw new Error(`Could not verify your sign-in: ${sessionError.message}`);
      }
      if (sessionData.session?.user.id !== AUTHORIZED_GALLERY_USER_ID) {
        setUserId(sessionData.session?.user.id ?? null);
        throw new Error("Sign in with the authorized gallery account before uploading.");
      }

      let uploadedCount = 0;
      const uploadFailures: string[] = [];

      for (const file of selectedFiles) {
        const safeFileName = file.name
          .normalize("NFKD")
          .replace(/[^a-zA-Z0-9._-]+/g, "-")
          .replace(/^-+|-+$/g, "");
        const filePath = `${crypto.randomUUID()}-${safeFileName || "upload"}`;

        try {
          const { error: uploadError } = await supabase.storage
            .from(GALLERY_BUCKET_NAME)
            .upload(filePath, file, {
              cacheControl: "3600",
              contentType: file.type,
              upsert: false,
            });

          if (uploadError) {
            uploadFailures.push(`${file.name}: ${uploadError.message}`);
          } else {
            uploadedCount += 1;
          }
        } catch (error) {
          uploadFailures.push(`${file.name}: ${getErrorMessage(error)}`);
        }
      }

      if (uploadedCount > 0) {
        setSelectedFiles([]);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        setSuccessMessage(
          `${uploadedCount} ${uploadedCount === 1 ? "file" : "files"} uploaded successfully.`,
        );
        await onUploadComplete();
      }

      if (uploadFailures.length > 0) {
        setErrorMessage(
          `Some files could not be uploaded:\n${uploadFailures.join("\n")}`,
        );
      }
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setErrorMessage(null);
          setSuccessMessage(null);
          setIsDialogOpen(true);
        }}
        disabled={isCheckingAuth}
        className="inline-flex min-h-10 shrink-0 items-center justify-center gap-2 rounded-full border border-[#cbd7e0] bg-white/70 px-4 py-2 text-sm font-medium text-[#315b78] transition-colors hover:border-[#173a5e] hover:bg-white hover:text-[#173a5e] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#173a5e] disabled:cursor-wait disabled:opacity-70"
      >
        <Upload aria-hidden="true" size={15} />
        Upload Media
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby="gallery-upload-title"
        onCancel={() => setIsDialogOpen(false)}
        onClose={() => setIsDialogOpen(false)}
        onClick={(event) => {
          if (event.target === dialogRef.current) {
            setIsDialogOpen(false);
          }
        }}
        className="m-auto max-h-[calc(100%-2rem)] w-[calc(100%-2rem)] max-w-lg rounded-3xl border border-slate-200 bg-white p-0 text-[#173a5e] shadow-2xl backdrop:bg-slate-950/50 backdrop:backdrop-blur-sm"
      >
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 px-6 py-5 sm:px-7">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#b87537]">
              Activities gallery
            </p>
            <h2 id="gallery-upload-title" className="mt-2 text-xl font-semibold">
              {isAuthorized ? "Share an activity" : "Sign in to continue"}
            </h2>
          </div>
          <button
            type="button"
            onClick={() => setIsDialogOpen(false)}
            aria-label="Close upload dialog"
            className="grid size-9 shrink-0 place-items-center rounded-full text-slate-500 transition-colors hover:bg-slate-100 hover:text-[#173a5e] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d99149]"
          >
            <X aria-hidden="true" size={19} />
          </button>
        </div>

        <div className="px-6 py-6 sm:px-7">
          {isAuthorized ? (
            <>
              <p className="text-sm leading-6 text-slate-600">
                Choose multiple images or videos to add them to the public activities gallery.
              </p>
              <form onSubmit={handleUpload} className="mt-5 space-y-4">
                <label className="block text-sm font-medium text-[#173a5e]" htmlFor="gallery-file">
                  Activity photos or videos
                </label>
                <input
                  ref={fileInputRef}
                  id="gallery-file"
                  type="file"
                  accept="image/*,video/*"
                  multiple
                  onChange={(event) => {
                    setSelectedFiles(Array.from(event.target.files ?? []));
                    setErrorMessage(null);
                    setSuccessMessage(null);
                  }}
                  className="block w-full rounded-xl border border-slate-200 p-3 text-sm text-slate-600 file:mr-3 file:rounded-full file:border-0 file:bg-slate-100 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-[#173a5e] hover:file:bg-slate-200"
                />
                <p className="text-xs text-slate-500">
                  {selectedFiles.length > 0
                    ? `${selectedFiles.length} ${selectedFiles.length === 1 ? "file" : "files"} selected`
                    : "Select multiple files. Images or videos up to 50 MB each."}
                </p>
                <button
                  type="submit"
                  disabled={isUploading || selectedFiles.length === 0}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#173a5e] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#244d73] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Upload aria-hidden="true" size={16} />
                  {isUploading
                    ? "Uploading…"
                    : selectedFiles.length > 0
                      ? `Upload ${selectedFiles.length} ${selectedFiles.length === 1 ? "file" : "files"}`
                      : "Upload"}
                </button>
              </form>
              <button
                type="button"
                onClick={() => void handleSignOut()}
                className="mt-5 inline-flex items-center gap-2 text-xs font-medium text-slate-500 transition-colors hover:text-[#173a5e]"
              >
                <LogOut aria-hidden="true" size={14} />
                Sign out
              </button>
            </>
          ) : (
            <>
              <div className="flex items-start gap-3 rounded-xl bg-[#f5f8fb] p-4 text-sm leading-6 text-slate-600">
                <LockKeyhole aria-hidden="true" size={18} className="mt-0.5 shrink-0 text-[#315f7d]" />
                <p>Sign in with the authorized trust account to upload an activity.</p>
              </div>
              {userId && (
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
                  <span>This signed-in account cannot upload activities.</span>
                  <button
                    type="button"
                    onClick={() => void handleSignOut()}
                    className="font-semibold underline underline-offset-4"
                  >
                    Sign out
                  </button>
                </div>
              )}
              <form onSubmit={handleSignIn} className="mt-5 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#173a5e]" htmlFor="upload-email">
                    Email
                  </label>
                  <input
                    id="upload-email"
                    type="email"
                    autoComplete="username"
                    required
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="mt-1.5 min-h-11 w-full rounded-xl border border-slate-200 px-3.5 text-sm outline-none transition focus:border-[#315f7d] focus:ring-2 focus:ring-[#315f7d]/15"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#173a5e]" htmlFor="upload-password">
                    Password
                  </label>
                  <input
                    id="upload-password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="mt-1.5 min-h-11 w-full rounded-xl border border-slate-200 px-3.5 text-sm outline-none transition focus:border-[#315f7d] focus:ring-2 focus:ring-[#315f7d]/15"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSigningIn}
                  className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-[#173a5e] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#244d73] disabled:cursor-wait disabled:opacity-60"
                >
                  <LockKeyhole aria-hidden="true" size={16} />
                  {isSigningIn ? "Signing in…" : "Sign in"}
                </button>
              </form>
            </>
          )}

          {errorMessage && (
            <p className="mt-4 whitespace-pre-line text-sm text-red-700" role="alert">
              {errorMessage}
            </p>
          )}
          {successMessage && (
            <p className="mt-4 text-sm text-emerald-700" role="status">
              {successMessage}
            </p>
          )}
        </div>
      </dialog>
    </>
  );
}
