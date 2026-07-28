import { getMediaItems } from "@/lib/media-fetcher";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/media")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url);
        const category = url.searchParams.get("category") || "all";
        const type = url.searchParams.get("type") || "all";

        const items = await getMediaItems(category, type);

        return Response.json({
          status: "success",
          total: items.length,
          query: { category, type },
          data: items,
        });
      },
    },
  },
});
