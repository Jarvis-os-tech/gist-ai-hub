import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import hero from "@/assets/hero-campus.jpg";
import labs from "@/assets/lab-computers.jpg";
import nvidia from "@/assets/lab-nvidia.jpg";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — CSE, GIST" },
      { name: "description", content: "Images of the CSE department at GIST — campus, laboratories and student activities." },
    ],
  }),
  component: GalleryPage,
});

const IMAGES = [
  { src: hero, alt: "GIST campus and academic block", caption: "Campus" },
  { src: labs, alt: "Computer laboratories with modern workstations", caption: "Computer Labs" },
  { src: nvidia, alt: "NVIDIA Jetson Nano AI lab", caption: "NVIDIA Lab" },
];

function GalleryPage() {
  return (
    <PageShell
      eyebrow="Photos"
      title="Gallery"
      description="A small selection of images from around the department."
      crumbs={[{ label: "Gallery" }]}
    >
      <div className="container-page py-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {IMAGES.map((img, i) => (
          <figure key={i} className="group overflow-hidden rounded-2xl border border-border bg-card">
            <div className="aspect-[4/3] overflow-hidden">
              <img src={img.src} alt={img.alt} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <figcaption className="p-4 text-sm text-navy-deep font-medium">{img.caption}</figcaption>
          </figure>
        ))}
      </div>
    </PageShell>
  );
}