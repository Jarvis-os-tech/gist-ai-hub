import type { MediaContentItem } from "./types/media-content";
import { DEPARTMENT_GALLERY_PHOTOS, gallerySourceUrl } from "@/data/gallery-photos";

export { gallerySourceUrl, DEPARTMENT_GALLERY_PHOTOS };

/**
 * GIST CSE Official Media Fetcher & API Integration Engine
 * Integrates department gallery photos, YouTube featured videos, and laboratory reels.
 */

export const OFFICIAL_GIST_LINKS = {
  website: "https://gist.edu.in/gist/gist-home/",
  gallery: gallerySourceUrl,
  instagram: "https://www.instagram.com/gist_nellore_official_insta",
  youtube: "https://www.youtube.com/@geethanjaliinstituteofscie2569",
};

export const FEATURED_VIDEO_ITEMS: MediaContentItem[] = [
  {
    id: "college-promo",
    type: "youtube",
    category: "events",
    title: "GIST Campus Promo Video",
    description: "Official Geethanjali Institute of Science & Technology Campus & Infrastructure Promo Video",
    src: "https://youtu.be/wYN_wds3Mlw?si=DWTFj9xZJ3WdJm-3",
    embedUrl: "https://www.youtube-nocookie.com/embed/wYN_wds3Mlw",
    thumbnailUrl: "https://img.youtube.com/vi/wYN_wds3Mlw/hqdefault.jpg",
    aspectRatio: "landscape",
    date: "2026",
    author: "GIST Official",
  },
  {
    id: "computer-laboratory-reel",
    type: "reel",
    category: "labs",
    title: "Computer Laboratory Tour Reel",
    description: "CSE Department High-Speed Computing & Software Engineering Laboratory Tour Reel",
    src: "https://youtube.com/shorts/v8g-3P7EYWw?si=4pvF1QksiXXh7A_W",
    embedUrl: "https://www.youtube-nocookie.com/embed/v8g-3P7EYWw",
    thumbnailUrl: "https://img.youtube.com/vi/v8g-3P7EYWw/hqdefault.jpg",
    aspectRatio: "vertical",
    date: "2026",
    author: "GIST CSE Lab",
  },
  {
    id: "gist-first-ai-campus",
    type: "youtube",
    category: "events",
    title: "Nellore's First AI Campus - Geethanjali Institute",
    description: "Special media coverage by SumanTV Nellore highlighting Geethanjali Institute of Science & Technology as Nellore's first AI campus.",
    src: "https://youtu.be/PH93YXJ3WuE?si=EwraJ1SKG0lV0qMY",
    embedUrl: "https://www.youtube-nocookie.com/embed/PH93YXJ3WuE",
    thumbnailUrl: "https://img.youtube.com/vi/PH93YXJ3WuE/hqdefault.jpg",
    aspectRatio: "landscape",
    date: "2026",
    author: "SumanTV Nellore",
  },
];

export const INTEGRATED_MEDIA_DATABASE: MediaContentItem[] = [
  ...DEPARTMENT_GALLERY_PHOTOS,
  ...FEATURED_VIDEO_ITEMS,
];

export function getYouTubeVideoId(url?: string): string | null {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|shorts\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
}

export function getMediaThumbnailUrl(item: MediaContentItem): string {
  if (item.type === "image") return item.src;
  if (item.thumbnailUrl) return item.thumbnailUrl;
  const ytId = getYouTubeVideoId(item.embedUrl || item.src);
  if (ytId) return `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`;
  return item.src || "/gist-banner.jpg";
}

export function getMediaEmbedUrl(item: MediaContentItem, autoplay: boolean = false): string | null {
  if (item.type === "image") return null;
  const ytId = getYouTubeVideoId(item.embedUrl || item.src);
  if (ytId) {
    return `https://www.youtube-nocookie.com/embed/${ytId}${autoplay ? "?autoplay=1&rel=0" : "?rel=0"}`;
  }
  if (item.embedUrl) {
    const cleanUrl = item.embedUrl.replace("youtube.com", "youtube-nocookie.com");
    return autoplay ? `${cleanUrl}?autoplay=1` : cleanUrl;
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
    if (type === "video") {
      items = items.filter((item) => item.type === "youtube" || item.type === "reel");
    } else {
      items = items.filter((item) => item.type === type);
    }
  }

  return items;
}
