export type MediaType = "image" | "reel" | "youtube" | "poster";
export type MediaCategory =
  | "all"
  | "hackathons"
  | "workshops"
  | "celebrations"
  | "visits"
  | "project-expo"
  | "labs"
  | "posters"
  | "achievements"
  | "events"
  | "reels";

export interface MediaContentItem {
  id: string;
  type: MediaType;
  category: MediaCategory;
  title: string;
  description?: string;
  src: string;
  thumbnailUrl?: string;
  embedUrl?: string;
  aspectRatio?: "vertical" | "landscape" | "square";
  date?: string;
  author?: string;
  tags?: string[];
  viewsCount?: string;
  likesCount?: string;
  externalLink?: string;
}
