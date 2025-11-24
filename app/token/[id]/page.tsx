import { Navbar } from "@/components/Navbar";
import { TokenDetail } from "@/components/TokenDetail";

export default function TokenPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <section className="relative pt-12 pb-8">
        <div className="mx-auto max-w-6xl px-4">
          <TokenDetail />
        </div>
      </section>
    </main>
  );
}