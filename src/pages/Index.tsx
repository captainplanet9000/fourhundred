"use client";

import React from "react";
import { Helmet } from "react-helmet-async";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { GradientDivider } from "@/components/layout/GradientDivider";
import { OrnateDivider } from "@/components/layout/OrnateDivider";
import { Button } from "@/components/ui/button";
import { SafeImage } from "@/components/common/SafeImage";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
// fourHundred components
import { Reveal } from "@/components/common/Reveal";
import { GoldenBorder } from "@/components/common/GoldenBorder";
import { useParallax } from "@/hooks/use-parallax";

const Index: React.FC = () => {
  const parallax = useParallax(0.15);

  return (
    <>
      <Helmet>
        <title>fourHundred — Where Legacy Lives Forever</title>
        <meta
          name="description"
          content="Witness the first generative collection dedicated to the high society of the canine world. 9,400 unique, algorithmically curated masterpieces."
        />
        <meta property="og:title" content="fourHundred — Where Legacy Lives Forever" />
      </Helmet>

      <div className="relative overflow-hidden min-h-screen bg-black">
        {/* Background image layer */}
        <div 
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            backgroundImage: `url('/images/collection/landing_banner_full_prod.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            opacity: 0.7
          }}
        />

        {/* Gradient overlay above image for readability */}
        <div
          className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-b from-black/40 via-black/30 to-black/60"
          style={{ transform: `translateY(${parallax}px)` }}
        />

        {/* Content wrapper only for the first (hero) section */}
        <section className="relative z-20 min-h-screen flex items-center py-0">
          <Container className="px-4 sm:px-6">
            <div className="mx-auto max-w-5xl rounded-2xl bg-black/75 backdrop-blur-md border border-white/10 px-6 sm:px-10 py-10 sm:py-14 text-center">
              <motion.div
                initial={{ opacity: 0, filter: "blur(10px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 1.2 }}
              >
                <h1
                  className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl leading-tight md:leading-[1.05] font-semibold tracking-tight"
                >
                  <span className="text-white">Where </span>
                  <span className="bg-clip-text text-transparent" style={{ backgroundImage: "var(--gilded-gradient)" }}>Legacy</span><br />
                  <span className="text-white">Lives Forever.</span>
                </h1>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-muted-foreground max-w-xs sm:max-w-xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl mx-auto">
                  Witness the first generative art NFT collection dedicated to the high society of the canine world.
                  Every stroke, every texture, every expression is algorithmically curated to create a masterpiece that is yours and yours alone.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1 }}
              >
                <div className="mt-6 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Button asChild className="bg-primary text-primary-foreground hover:brightness-110 text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-6 w-full sm:w-auto">
                    <Link to="/mint">Commission Portrait</Link>
                  </Button>
                  <Button asChild variant="outline" className="border-primary/50 text-foreground hover:bg-muted/50 text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-6 w-full sm:w-auto">
                    <Link to="/gallery">Enter the Gallery</Link>
                  </Button>
                </div>
              </motion.div>
            </div>
          </Container>
        </section>
      </div>

      <OrnateDivider />

      <Section
        title="The Algorithm of Aristocracy"
        subtitle="A technical marvel disguised as fine art."
      >
        <Container>
          <Reveal>
            <div className="grid md:grid-cols-2 gap-8 text-left text-muted-foreground text-lg leading-relaxed">
              <p>
                fourHundred is not just a collection; it is a technical marvel disguised as fine art. We have trained our generative models on the aesthetics of the Gilded Age—the oil paintings, the velvet textures, the stoic expressions of the elite. But instead of a brush, we use code. Instead of a canvas, we use the blockchain.
              </p>
              <p>
                Each of the 9,400 portraits is the result of a complex, probabilistic interplay of hundreds of traits. From the sheen of a monocle to the fabric weight of a velvet smoking jacket, every detail is calculated to ensure aesthetic harmony. The result is a collection where no two pieces are alike, yet every piece feels like it belongs on the wall of a 19th-century manor.
              </p>
            </div>
          </Reveal>
        </Container>
      </Section>

      <GradientDivider />

      <Section
        title="100% Unique. Mathematically Proven."
        subtitle="True rarity is not just about scarcity; it's about singularity."
      >
        <Container>
          <Reveal>
            <ul className="grid md:grid-cols-3 gap-6 text-left">
              {[
                { title: "Generative DNA", desc: "Every token carries a unique genetic code that dictates its visual properties." },
                { title: "Curated Chaos", desc: "Algorithms introduce controlled randomness to create unexpected, delightful combinations." },
                { title: "The 1/1 Experience", desc: "While there are 9,400 in the collection, the piece you hold is the only one of its kind." },
              ].map((item) => (
                <GoldenBorder key={item.title}>
                  <div className="p-6 h-full">
                    <h3 className="text-xl font-semibold text-primary mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.desc}</p>
                  </div>
                </GoldenBorder>
              ))}
            </ul>
          </Reveal>
        </Container>
      </Section>

      <GradientDivider />

      <Section title="The Legend of the 400" subtitle="An alternate timeline where the Gilded Age never ended.">
        <Container>
          <Reveal>
            <div className="max-w-4xl mx-auto text-center text-muted-foreground text-lg leading-relaxed space-y-6">
              <p>
                In the late 19th century, society was defined by a list of four hundred names—the only people who 'mattered' in New York society. But history forgot the others. The loyal companions. The silent observers who sat by the fireplaces of the Vanderbilts and the Astors.
              </p>
              <p>
                We have reimagined this lost history. In an alternate timeline where the Gilded Age never ended, these 9,400 aristocratic canines rule the drawing rooms. They are the barons of industry, the dowagers of Fifth Avenue, and the tycoons of the telegraph. They are the fourHundred. And now, they are immortalized on the blockchain.
              </p>
            </div>
          </Reveal>
        </Container>
      </Section>

      <GradientDivider />

      <Section title="Featured Portraits" subtitle="A glimpse into the collection’s breadth.">
        <Container>
          <Reveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                // Using specific Member images from the collection
                "Member_113.png",
                "Member_124.png",
                "Member_6912.png",
                "Member_7873.png",
              ].map((file) => (
                <motion.div
                  key={file}
                  whileHover={{ scale: 1.05, zIndex: 10 }}
                  transition={{ duration: 0.3 }}
                  className="relative overflow-hidden rounded-md border border-primary/40 bg-black/40 cursor-pointer"
                >
                  <div className="relative w-full aspect-square">
                    <SafeImage
                      src={`/images/collection/${file}`}

                      alt="Featured fourHundred portrait"
                      className="absolute inset-0 h-full w-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <span className="text-primary font-serif text-sm">View Details</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Reveal>
        </Container>
      </Section>

      <GradientDivider />

      <Section title="Your Story Awaits" subtitle="Find the portrait that reflects your story.">
        <Container className="text-center">
          <Reveal>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button asChild className="bg-primary text-primary-foreground hover:brightness-110 text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-6 w-full sm:w-auto">
                <Link to="/gallery">Discover the Gallery</Link>
              </Button>
              <Button asChild variant="outline" className="border-primary/50 text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-6 w-full sm:w-auto">
                <Link to="/traits">Explore Traits</Link>
              </Button>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
};

export default Index;