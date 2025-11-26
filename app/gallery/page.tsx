import { Navbar } from "@/components/Navbar";
import { OptimizedGallery } from "@/components/OptimizedGallery";

export default function GalleryPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <section className="relative pt-12 pb-8">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-semibold">
              <span className="text-gilded-400">Gallery</span>
            </h1>
            <p className="mt-2 text-white/70 max-w-prose">
              Explore the complete fourHundred collection of 9,400 Gilded Age dog portraits.
            </p>
          </div>
          <OptimizedGallery />
        </div>
      </section>
    </main>
  );
}