import type { MediaContentItem } from "./types/media-content";

/**
 * GIST CSE Official Media Fetcher & API Integration Engine
 * Ready to receive user-provided items, thumbnails, titles, and media content one by one.
 */

export const OFFICIAL_GIST_LINKS = {
  website: "https://gist.edu.in/gist/gist-home/",
  instagram: "https://www.instagram.com/gist_nellore_official_insta",
  youtube: "https://www.youtube.com/@geethanjaliinstituteofscie2569",
};

export const INTEGRATED_MEDIA_DATABASE: MediaContentItem[] = [
  {
    id: "college-promo",
    type: "youtube",
    category: "events",
    title: "College Promo",
    description: "Official Geethanjali Institute of Science & Technology Promo Video",
    src: "https://youtu.be/wYN_wds3Mlw?si=DWTFj9xZJ3WdJm-3",
    embedUrl: "https://www.youtube.com/embed/wYN_wds3Mlw",
    thumbnailUrl: "https://img.youtube.com/vi/wYN_wds3Mlw/hqdefault.jpg",
    aspectRatio: "landscape",
    date: "2026",
    author: "GIST Official",
  },
  {
    id: "computer-laboratory-reel",
    type: "reel",
    category: "labs",
    title: "Computer Laboratory Reel",
    description: "CSE Department Computer Laboratory Reel & Hands-on Lab Tour",
    src: "https://youtube.com/shorts/v8g-3P7EYWw?si=4pvF1QksiXXh7A_W",
    embedUrl: "https://www.youtube.com/embed/v8g-3P7EYWw",
    thumbnailUrl: "https://img.youtube.com/vi/v8g-3P7EYWw/hqdefault.jpg",
    aspectRatio: "vertical",
    date: "2026",
    author: "GIST CSE Lab",
  },
];

export function getYouTubeVideoId(url?: string): string | null {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|shorts\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
}

export function getMediaThumbnailUrl(item: MediaContentItem): string {
  if (item.thumbnailUrl) return item.thumbnailUrl;
  const ytId = getYouTubeVideoId(item.embedUrl || item.src);
  if (ytId) return `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`;
  return "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80";
}

export function getMediaEmbedUrl(item: MediaContentItem, autoplay: boolean = false): string | null {
  const ytId = getYouTubeVideoId(item.embedUrl || item.src);
  if (ytId) {
    return `https://www.youtube.com/embed/${ytId}${autoplay ? "?autoplay=1&rel=0" : "?rel=0"}`;
  }
  if (item.embedUrl) {
    return autoplay ? `${item.embedUrl}?autoplay=1` : item.embedUrl;
  }
  return null;
}

/**
 * Fetch filtered media items based on category and type filters
 */
export async function getMediaItems(
  category: string = "all",
  type: string = "all",
): Promise<MediaContentItem[]> {
  let items = [...INTEGRATED_MEDIA_DATABASE];

  if (category !== "all") {
    items = items.filter((item) => item.category === category);
  }

  if (type !== "all") {
    items = items.filter((item) => item.type === type);
  }

  return items;
}
