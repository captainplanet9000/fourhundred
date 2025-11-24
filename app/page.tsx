import Image from 'next/image'
import Link from 'next/link'
import { MintCard } from '@/components/MintCard'
import { StatsBar } from '@/components/StatsBar'
import { Navbar } from '@/components/Navbar'
import { Gallery } from '@/components/Gallery'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <section className="relative pt-12 pb-8">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-semibold leading-tight">
                Infinite Elegance.
                <span className="text-gilded-400"> Zero Duplicates.</span>
              </h1>
              <p className="mt-4 text-white/70 max-w-prose">
                Witness the first generative collection dedicated to the high society of the canine world. Every stroke, every texture, every expression is algorithmically curated to create a masterpiece that is yours and yours alone.
              </p>
              <p className="mt-2 text-gilded-300">100% Unique Generative Art • 0.05 ETH • 10,000 Supply</p>
              <div className="mt-8"><StatsBar /></div>
            </div>
            <div className="lg:pl-6">
              <div className="card p-2 gold-border">
                <Gallery />
              </div>
              <div className="mt-4 text-center">
                <Link href="/gallery" className="btn btn-outline">
                  View Full Gallery
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-12">
            <MintCard />
          </div>

          <div className="mt-24 grid gap-16 lg:grid-cols-2">
            <section>
              <h2 className="text-3xl font-semibold text-gilded-400">The Algorithm of Aristocracy</h2>
              <div className="mt-6 space-y-4 text-white/80 leading-relaxed">
                <p>
                  fourHundred is not just a collection; it is a technical marvel disguised as fine art. We have trained our generative models on the aesthetics of the Gilded Age—the oil paintings, the velvet textures, the stoic expressions of the elite. But instead of a brush, we use code. Instead of a canvas, we use the blockchain.
                </p>
                <p>
                  Each of the 10,000 portraits is the result of a complex, probabilistic interplay of hundreds of traits. From the sheen of a monocle to the fabric weight of a velvet smoking jacket, every detail is calculated to ensure aesthetic harmony. The result is a collection where no two pieces are alike, yet every piece feels like it belongs on the wall of a 19th-century manor.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-semibold text-gilded-400">The Legend of the 400</h2>
              <div className="mt-6 space-y-4 text-white/80 leading-relaxed">
                <p>
                  In the late 19th century, society was defined by a list of four hundred names—the only people who 'mattered' in New York society. But history forgot the others. The loyal companions. The silent observers who sat by the fireplaces of the Vanderbilts and the Astors.
                </p>
                <p>
                  We have reimagined this lost history. In an alternate timeline where the Gilded Age never ended, these 10,000 aristocratic canines rule the drawing rooms. They are the barons of industry, the dowagers of Fifth Avenue, and the tycoons of the telegraph. They are the fourHundred. And now, they are immortalized on the blockchain.
                </p>
              </div>
            </section>
          </div>

        </div>
      </section>
    </main>
  )
}
