"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import {
  GraduationCap,
  HeartHandshake,
  Moon,
  Stethoscope,
  Trash2,
  Users,
  Utensils,
} from "lucide-react";
import Lightbox from "yet-another-react-lightbox";
import Video from "yet-another-react-lightbox/plugins/video";
import { getSupabaseClient } from "@/lib/supabase";
import { AUTHORIZED_GALLERY_USER_ID, GALLERY_BUCKET_NAME } from "@/lib/gallery";
import GalleryUpload from "@/components/GalleryUpload";

type GalleryItem = {
  id: string;
  name: string;
  url: string;
  contentType: string;
};

type MediaFilter = "all" | "images" | "videos";

const activityAreas = [
  {
    title: "Medical Camps",
    description:
      "Providing free healthcare checkups and medicines to underprivileged communities.",
    Icon: Stethoscope,
    iconClassName: "bg-[#eef5f8] text-[#315f7d]",
  },
  {
    title: "Educational Support",
    description:
      "Distributing school supplies and funding tuition for bright students in need.",
    Icon: GraduationCap,
    iconClassName: "bg-[#fbf3e9] text-[#b87537]",
  },
  {
    title: "Food Distribution",
    description:
      "Organizing weekly ration drives to eliminate hunger among vulnerable families.",
    Icon: Utensils,
    iconClassName: "bg-[#eef4ee] text-[#4e806b]",
  },
  {
    title: "Youth Empowerment",
    description:
      "Hosting skill-development workshops and career guidance seminars.",
    Icon: Users,
    iconClassName: "bg-[#f1eff8] text-[#66578f]",
  },
  {
    title: "Community Building",
    description:
      "Fostering unity through local gatherings and social welfare programs.",
    Icon: HeartHandshake,
    iconClassName: "bg-[#f9eef0] text-[#a45469]",
  },
  {
    title: "Religious & Cultural Events",
    description:
      "Celebrating festivals and promoting peace and harmony in the region.",
    Icon: Moon,
    iconClassName: "bg-[#eef1f8] text-[#4d628f]",
  },
];

function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : "An unexpected error occurred.";
}

function isVideo(item: GalleryItem): boolean {
  return item.contentType.startsWith("video/") || /\.(mp4|mov|webm|m4v|ogv)$/i.test(item.name);
}

function getVideoContentType(item: GalleryItem): string {
  if (item.contentType.startsWith("video/")) {
    return item.contentType;
  }

  const extension = item.name.split(".").at(-1)?.toLowerCase();
  const contentTypes: Record<string, string> = {
    m4v: "video/mp4",
    mov: "video/quicktime",
    mp4: "video/mp4",
    ogv: "video/ogg",
    webm: "video/webm",
  };

  return contentTypes[extension ?? ""] ?? "video/mp4";
}

export default function GalleryClient() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [hoveredImageId, setHoveredImageId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [openIndex, setOpenIndex] = useState(-1);
  const [authorizedUser, setAuthorizedUser] = useState(false);
  const [selectedNames, setSelectedNames] = useState<string[]>([]);
  const [mediaFilter, setMediaFilter] = useState<MediaFilter>("all");
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const filteredItems = items.filter((item) => {
    if (mediaFilter === "images") return !isVideo(item);
    if (mediaFilter === "videos") return isVideo(item);
    return true;
  });
  const filteredNames = filteredItems.map((item) => item.name);
  const selectedVisibleCount = filteredNames.filter((name) => selectedNames.includes(name)).length;

  const loadGallery = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const supabase = getSupabaseClient();
      const { data, error } = await supabase.storage.from(GALLERY_BUCKET_NAME).list("", {
        limit: 100,
        sortBy: { column: "created_at", order: "desc" },
      });

      if (error) {
        throw new Error(`Could not load gallery: ${error.message}`);
      }

      const galleryItems = (data ?? [])
        .filter((file) => {
          const contentType = file.metadata?.mimetype ?? "";
          return (
            file.id !== null &&
            (contentType.startsWith("image/") ||
              contentType.startsWith("video/") ||
              /\.(avif|gif|jpe?g|png|svg|webp|mp4|mov|webm|m4v|ogv)$/i.test(file.name))
          );
        })
        .map((file) => {
          const { data: publicData } = supabase.storage
            .from(GALLERY_BUCKET_NAME)
            .getPublicUrl(file.name);

          return {
            id: file.id ?? file.name,
            name: file.name,
            url: publicData.publicUrl,
            contentType: file.metadata?.mimetype ?? "",
          };
        });

      setItems(galleryItems);
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    void (async () => {
      await Promise.resolve();
      if (isMounted) {
        await loadGallery();
      }
    })();

    return () => {
      isMounted = false;
    };
  }, [loadGallery]);

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
            const isAuthorized = session?.user.id === AUTHORIZED_GALLERY_USER_ID;
            setAuthorizedUser(isAuthorized);
            if (!isAuthorized) {
              setSelectedNames([]);
            }
          }
        });
        unsubscribe = () => data.subscription.unsubscribe();

        const { data: sessionData, error } = await supabase.auth.getSession();
        if (!isMounted) return;
        if (error) {
          throw new Error(`Could not verify gallery permissions: ${error.message}`);
        }
        const isAuthorized = sessionData.session?.user.id === AUTHORIZED_GALLERY_USER_ID;
        setAuthorizedUser(isAuthorized);
        if (!isAuthorized) {
          setSelectedNames([]);
        }
      } catch (error) {
        if (isMounted) {
          setDeleteError(getErrorMessage(error));
        }
      }
    })();

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

  function toggleSelected(name: string) {
    setSelectedNames((current) =>
      current.includes(name) ? current.filter((item) => item !== name) : [...current, name],
    );
    setDeleteError(null);
  }

  async function deleteSelected() {
    if (selectedNames.length === 0 || isDeleting) return;

    const namesToDelete = [...selectedNames];
    const count = namesToDelete.length;
    const confirmed = window.confirm(
      `Delete ${count} selected ${count === 1 ? "image or video" : "images and videos"}? This cannot be undone.`,
    );
    if (!confirmed) return;

    setIsDeleting(true);
    setDeleteError(null);
    try {
      const supabase = getSupabaseClient();
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      if (sessionError) {
        throw new Error(`Could not verify your sign-in: ${sessionError.message}`);
      }
      if (sessionData.session?.user.id !== AUTHORIZED_GALLERY_USER_ID) {
        setAuthorizedUser(false);
        throw new Error("Sign in with the authorized gallery account to delete media.");
      }

      const { error } = await supabase.storage
        .from(GALLERY_BUCKET_NAME)
        .remove(namesToDelete);
      if (error) {
        throw new Error(`Could not delete selected media: ${error.message}`);
      }

      setSelectedNames([]);
      setOpenIndex(-1);
      await loadGallery();
    } catch (error) {
      setDeleteError(getErrorMessage(error));
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <>
      <section className="bg-[#f5f8fb] px-5 pt-14 pb-6 sm:px-8 sm:pt-16 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.17em] text-[#b87537]">
              The United Educational &amp; Social Welfare Trust
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-[-0.055em] text-[#173a5e] sm:text-5xl">
              Activities &amp; Gallery
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600">
              Moments from our work, shared by the community we serve.
            </p>
          </div>
        </div>
      </section>

      <section
        aria-label="Our activity areas"
        className="bg-[#f5f8fb] px-5 pt-6 pb-14 sm:px-8 sm:pb-16 lg:px-12"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
            {activityAreas.map(({ title, description, Icon, iconClassName }) => (
              <article
                key={title}
                className="rounded-2xl border border-slate-200/80 bg-white p-6 transition-colors hover:border-[#cbd9e2] sm:p-7"
              >
                <span
                  aria-hidden="true"
                  className={`grid size-12 place-items-center rounded-xl ${iconClassName}`}
                >
                  <Icon size={23} strokeWidth={1.8} />
                </span>
                <h3 className="mt-5 text-lg font-semibold tracking-[-0.03em] text-[#173a5e]">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        aria-labelledby="photo-video-gallery-title"
        className="border-t border-slate-200/80 bg-white px-5 py-10 sm:px-8 sm:py-14 lg:px-12"
      >
        <div className="mx-auto max-w-7xl">
          <div className="sticky top-[76px] z-40 -mx-5 mb-7 flex flex-col gap-4 border-b border-slate-200/80 bg-white/95 px-5 py-3 backdrop-blur-md sm:-mx-8 sm:mb-8 sm:flex-row sm:items-center sm:justify-between sm:gap-5 sm:px-8 lg:-mx-12 lg:px-12">
            <h2
              id="photo-video-gallery-title"
              className="text-3xl font-semibold tracking-[-0.05em] text-[#173a5e] sm:text-4xl"
            >
              Photo &amp; Video Gallery
            </h2>
            <GalleryUpload onUploadComplete={loadGallery} />
          </div>
          {isLoading ? (
            <p className="py-12 text-center text-sm text-slate-500" role="status">
              Loading gallery…
            </p>
          ) : errorMessage ? (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-800" role="alert">
              <p>{errorMessage}</p>
              <p className="mt-2 text-red-700">
                Check that <code>.env.local</code> contains valid Supabase credentials and that
                the <code>UT-gallery</code> bucket exists with Storage policies allowing public
                listing and reading.
              </p>
              <button
                type="button"
                onClick={() => void loadGallery()}
                className="mt-4 font-semibold underline underline-offset-4"
              >
                Try again
              </button>
            </div>
          ) : items.length === 0 ? (
            <p className="py-12 text-center text-sm text-slate-500">
              No gallery media has been shared yet.
            </p>
          ) : (
            <>
          <div
            className="mb-6 flex flex-wrap items-center justify-between gap-4"
            aria-label="Filter gallery media"
          >
            <div className="flex flex-wrap gap-2" role="group" aria-label="Media type">
              {([
                ["all", "All", items.length],
                ["images", "Images", items.filter((item) => !isVideo(item)).length],
                ["videos", "Videos", items.filter(isVideo).length],
              ] as const).map(([filter, label, count]) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setMediaFilter(filter)}
                  aria-pressed={mediaFilter === filter}
                  className={`inline-flex min-h-10 items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d99149] ${
                    mediaFilter === filter
                      ? "border-[#173a5e] bg-[#173a5e] text-white"
                      : "border-slate-200 bg-slate-100 text-slate-600 hover:border-[#b9c9d4] hover:bg-slate-200 hover:text-[#173a5e]"
                  }`}
                >
                  {label}
                  <span
                    className={`rounded-full px-1.5 py-0.5 text-xs ${
                      mediaFilter === filter ? "bg-white/15 text-white" : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              ))}
            </div>
            <p className="text-sm text-slate-500" aria-live="polite">
              Showing {filteredItems.length} {mediaFilter === "all" ? "items" : mediaFilter}
            </p>
          </div>
          {authorizedUser && (
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-[#f5f8fb] p-4">
              <div className="flex flex-wrap items-center gap-4">
                <label className="inline-flex cursor-pointer items-center gap-2 text-sm font-medium text-[#173a5e]">
                  <input
                    type="checkbox"
                    checked={filteredNames.length > 0 && selectedVisibleCount === filteredNames.length}
                    onChange={() => {
                      setSelectedNames((current) =>
                        selectedVisibleCount === filteredNames.length
                          ? current.filter((name) => !filteredNames.includes(name))
                          : [...new Set([...current, ...filteredNames])],
                      );
                      setDeleteError(null);
                    }}
                    disabled={isDeleting}
                    aria-label={`Select all ${mediaFilter === "all" ? "gallery media" : mediaFilter}`}
                    className="size-4 accent-[#173a5e]"
                  />
                  Select visible
                </label>
                <span className="text-sm text-slate-500">
                  {selectedNames.length} selected
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => void deleteSelected()}
                    disabled={selectedNames.length === 0 || isDeleting}
                    className="inline-flex min-h-10 items-center justify-center gap-2 rounded-full bg-red-700 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-800 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Trash2 aria-hidden="true" size={16} />
                    {isDeleting ? "Deleting…" : `Delete${selectedNames.length ? ` (${selectedNames.length})` : ""}`}
                  </button>
                </div>
              )}
              {deleteError && (
                <p className="mb-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800" role="alert">
                  {deleteError}
                </p>
              )}
              {filteredItems.length === 0 ? (
                <p className="py-12 text-center text-sm text-slate-500">
                  No {mediaFilter === "all" ? "media" : mediaFilter} to display.
                </p>
              ) : (
                <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
              {filteredItems.map((item) => (
                <article
                  key={item.id}
                  className={`relative mb-5 break-inside-avoid overflow-hidden rounded-2xl border bg-slate-50 ${
                    selectedNames.includes(item.name)
                      ? "border-[#315f7d] ring-2 ring-[#315f7d]/20"
                      : "border-slate-200"
                  }`}
                >
                  {authorizedUser && (
                    <label className="absolute left-3 top-3 z-10 grid size-8 cursor-pointer place-items-center rounded-lg border border-white/80 bg-white/95 shadow-sm">
                      <input
                        type="checkbox"
                        checked={selectedNames.includes(item.name)}
                        onChange={() => toggleSelected(item.name)}
                        disabled={isDeleting}
                        aria-label={`Select ${item.name.split("/").at(-1)} for deletion`}
                        className="size-4 accent-[#173a5e]"
                      />
                    </label>
                  )}
                  <button
                    type="button"
                    onClick={() => setOpenIndex(items.findIndex((galleryItem) => galleryItem.id === item.id))}
                    onMouseEnter={() => setHoveredImageId(item.id)}
                    onMouseLeave={() => setHoveredImageId(null)}
                    aria-label={`Open ${isVideo(item) ? "video" : "image"}: ${item.name.split("/").at(-1)}`}
                    className="group relative block w-full cursor-zoom-in overflow-hidden rounded-2xl bg-slate-100 text-left focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-[#d99149]"
                  >
                    {isVideo(item) ? (
                      <>
                        <video
                          className="pointer-events-none h-auto w-full bg-slate-900"
                          muted
                          playsInline
                          preload="metadata"
                          src={item.url}
                        />
                        <span className="pointer-events-none absolute inset-0 grid place-items-center bg-slate-950/10 transition-colors group-hover:bg-slate-950/25">
                          <span className="grid size-14 place-items-center rounded-full border border-white/70 bg-slate-950/55 text-white backdrop-blur-sm">
                            <span aria-hidden="true" className="ml-1 text-xl">▶</span>
                          </span>
                        </span>
                      </>
                    ) : (
                      <Image
                        src={item.url}
                        alt=""
                        width={800}
                        height={600}
                        unoptimized
                        className="block h-auto w-full rounded-[inherit] object-cover"
                        style={{
                          transform: hoveredImageId === item.id ? "scale(1.02)" : "scale(1)",
                          transition: "transform 300ms ease",
                        }}
                      />
                    )}
                  </button>
                </article>
              ))}
              </div>
              )}
            </>
          )}
        </div>
      </section>

      <Lightbox
        open={openIndex >= 0}
        close={() => setOpenIndex(-1)}
        index={openIndex}
        slides={items.map((item) =>
          isVideo(item)
            ? {
                type: "video" as const,
                sources: [{ src: item.url, type: getVideoContentType(item) }],
                controls: true,
                playsInline: true,
                preload: "metadata",
              }
            : {
                src: item.url,
                alt: item.name.split("/").at(-1),
              },
        )}
        plugins={[Video]}
        controller={{ closeOnBackdropClick: true }}
        on={{ view: ({ index }) => setOpenIndex(index) }}
        styles={{
          root: { backdropFilter: "blur(8px)" },
          container: { backgroundColor: "rgba(9, 24, 39, 0.88)" },
          navigationPrev: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 52,
            height: 52,
            padding: 0,
            left: 20,
            borderRadius: "50%",
            backgroundColor: "rgba(255, 255, 255, 0.16)",
            color: "#ffffff",
            backdropFilter: "blur(8px)",
          },
          navigationNext: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 52,
            height: 52,
            padding: 0,
            right: 20,
            borderRadius: "50%",
            backgroundColor: "rgba(255, 255, 255, 0.16)",
            color: "#ffffff",
            backdropFilter: "blur(8px)",
          },
        }}
      />
    </>
  );
}
