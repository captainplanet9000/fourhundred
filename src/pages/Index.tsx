"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { GradientDivider } from "@/components/layout/GradientDivider";
import { OrnateDivider } from "@/components/layout/OrnateDivider";
import { Button } from "@/components/ui/button";
import { SafeImage } from "@/components/common/SafeImage";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Reveal } from "@/components/common/Reveal";
import { GoldenBorder } from "@/components/common/GoldenBorder";
import { useParallax } from "@/hooks/use-parallax";
import { CHAIN, COLLECTION, MINT, MINT_DATE_LABEL } from "@/lib/launch";

const Index: React.FC = () => {
  const parallax = useParallax(0.15);

  const mintDate = useMemo(() => new Date(MINT.dateISO), []);
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);
  const countdown = useMemo(() => {
    const diffMs = Math.max(0, mintDate.getTime() - now);
    const totalSeconds = Math.floor(diffMs / 1000);
    return {
      totalSeconds,
      days: Math.floor(totalSeconds / 86400),
      hours: Math.floor((totalSeconds % 86400) / 3600),
      minutes: Math.floor((totalSeconds % 3600) / 60),
      seconds: totalSeconds % 60,
    };
  }, [mintDate, now]);

  return (
    <>
      <Helmet>
        <title>{COLLECTION.name} — Free claim on {CHAIN.name}</title>
        <meta
          name="description"
          content={`${COLLECTION.supply.toLocaleString()} Gilded Age dog portraits. Free claim on ${CHAIN.name} L2. Opens ${MINT_DATE_LABEL}. ${MINT.royaltyPct}% royalty on secondary funds the project.`}
        />
        <meta property="og:title" content={`${COLLECTION.name} — Free claim on ${CHAIN.name}`} />
      </Helmet>

      <div className="relative overflow-hidden min-h-screen bg-black">
        {/* Background image layer */}
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            backgroundImage: `url('/images/collection/landing_banner_full_prod.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
            opacity: 0.7,
          }}
        />

        {/* Gradient overlay */}
        <div
          className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-b from-black/40 via-black/30 to-black/60"
          style={{ transform: `translateY(${parallax}px)` }}
        />

        {/* Hero */}
        <section className="relative z-20 min-h-screen flex items-center py-0">
          <Container className="px-4 sm:px-6">
            <div className="mx-auto max-w-5xl rounded-2xl bg-black/75 backdrop-blur-md border border-white/10 px-6 sm:px-10 py-10 sm:py-14 text-center">
              {/* MegaETH chain badge */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-6"
              >
                <span className="inline-flex items-center gap-2 rounded-full border border-amber-600/40 bg-amber-600/10 px-4 py-1.5 text-xs sm:text-sm font-medium text-amber-300">
                  <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
                  Launching on {CHAIN.name} · chain {CHAIN.chainId}
                </span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, filter: "blur(10px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 1.2 }}
              >
                <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl leading-tight md:leading-[1.05] font-semibold tracking-tight">
                  <span className="text-white">Claim your seat at the </span>
                  <span
                    className="bg-clip-text text-transparent"
                    style={{ backgroundImage: "var(--gilded-gradient)" }}
                  >
                    400 Club.
                  </span>
                  <br />
                  <span className="text-white">Free.</span>
                </h1>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-xs sm:max-w-xl md:max-w-3xl lg:max-w-4xl mx-auto">
                  {COLLECTION.supply.toLocaleString()} one-of-one Gilded Age portraits on {CHAIN.name},
                  the realtime Ethereum L2. One per wallet. Funded by an {MINT.royaltyPct}% royalty
                  on secondary — we win when you do.
                </p>
              </motion.div>

              {/* Countdown */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="mt-8"
              >
                {countdown.totalSeconds > 0 ? (
                  <>
                    <p className="text-amber-400 text-sm sm:text-base font-semibold uppercase tracking-widest">
                      Free claim opens {MINT_DATE_LABEL}
                    </p>
                    <div className="mt-3 flex items-center justify-center gap-2 sm:gap-3 text-white">
                      {[
                        { label: "Days", value: countdown.days },
                        { label: "Hours", value: countdown.hours },
                        { label: "Min", value: countdown.minutes },
                        { label: "Sec", value: countdown.seconds },
                      ].map((item) => (
                        <div
                          key={item.label}
                          className="min-w-[60px] sm:min-w-[80px] rounded-lg border border-amber-600/40 bg-black/60 px-3 py-2"
                        >
                          <div className="text-xl sm:text-2xl md:text-3xl font-bold tabular-nums">
                            {String(item.value).padStart(2, "0")}
                          </div>
                          <div className="text-[10px] sm:text-xs text-white/70 uppercase">
                            {item.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <p className="text-amber-400 text-2xl sm:text-3xl font-bold">
                    Free claim is live
                  </p>
                )}
              </motion.div>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1 }}
              >
                <div className="mt-6 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Button
                    asChild
                    className="bg-primary text-primary-foreground hover:brightness-110 text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-6 w-full sm:w-auto"
                  >
                    <Link to="/mint">Get ready for mint</Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="border-primary/50 text-foreground hover:bg-muted/50 text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-6 w-full sm:w-auto"
                  >
                    <Link to="/gallery">Enter the gallery</Link>
                  </Button>
                </div>
                <p className="mt-4 text-xs sm:text-sm text-white/50">
                  No paid mint. Pay only {CHAIN.name} gas — fractions of a cent.
                </p>
              </motion.div>
            </div>
          </Container>
        </section>
      </div>

      {/* Page-wide background for sections after hero */}
      <div
        className="relative"
        style={{
          backgroundImage: `url('/images/paintedbg_7.jpeg')`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-black/85 pointer-events-none" />
        <div className="relative z-10">
          <OrnateDivider />

          <Section
            title="The Algorithm of Aristocracy"
            subtitle="A technical marvel disguised as fine art."
          >
            <Container>
              <Reveal>
                <div className="grid md:grid-cols-2 gap-8 text-left text-muted-foreground text-lg leading-relaxed">
                  <p>
                    The 400 Club is not just a collection; it is a technical marvel disguised as
                    fine art. We have trained our generative models on the aesthetics of the Gilded
                    Age — the oil paintings, the velvet textures, the stoic expressions of the
                    elite. But instead of a brush, we use code. Instead of a canvas, we use the
                    blockchain.
                  </p>
                  <p>
                    Each of the {COLLECTION.supply.toLocaleString()} portraits is the result of a
                    complex, probabilistic interplay of hundreds of traits. From the sheen of a
                    monocle to the fabric weight of a velvet smoking jacket, every detail is
                    calculated to ensure aesthetic harmony. The result is a collection where no two
                    pieces are alike, yet every piece feels like it belongs on the wall of a
                    19th-century manor.
                  </p>
                </div>
              </Reveal>
            </Container>
          </Section>

          <GradientDivider />

          <Section
            title="Free claim. Funded by royalties."
            subtitle="The 400 Club is the first major free PFP on MegaETH. Here's why."
          >
            <Container>
              <Reveal>
                <ul className="grid md:grid-cols-3 gap-6 text-left">
                  {[
                    {
                      title: "Maximum distribution",
                      desc: `${COLLECTION.supply.toLocaleString()} unique holders is the floor. One per wallet, no whales.`,
                    },
                    {
                      title: "MegaETH-native",
                      desc: `Built for the realtime L2. Mints feel instant. Gas is fractions of a cent.`,
                    },
                    {
                      title: `${MINT.royaltyPct}% royalty, forever`,
                      desc: `We earn when you trade. Aligned incentives — we keep building, you get appreciation.`,
                    },
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

          <Section
            title="100% Unique. Mathematically Proven."
            subtitle="True rarity is not just about scarcity; it's about singularity."
          >
            <Container>
              <Reveal>
                <ul className="grid md:grid-cols-3 gap-6 text-left">
                  {[
                    {
                      title: "Generative DNA",
                      desc: "Every token carries a unique genetic code that dictates its visual properties.",
                    },
                    {
                      title: "Curated Chaos",
                      desc: "Algorithms introduce controlled randomness to create unexpected, delightful combinations.",
                    },
                    {
                      title: "The 1/1 Experience",
                      desc: `While there are ${COLLECTION.supply.toLocaleString()} in the collection, the piece you hold is the only one of its kind.`,
                    },
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
                    In the late 19th century, society was defined by a list of four hundred names —
                    the only people who 'mattered' in New York society. But history forgot the
                    others. The loyal companions. The silent observers who sat by the fireplaces of
                    the Vanderbilts and the Astors.
                  </p>
                  <p>
                    We have reimagined this lost history. In an alternate timeline where the Gilded
                    Age never ended, these {COLLECTION.supply.toLocaleString()} aristocratic canines
                    rule the drawing rooms. They are the barons of industry, the dowagers of Fifth
                    Avenue, and the tycoons of the telegraph. They are the 400 Club. And now, they
                    are immortalized on {CHAIN.name}.
                  </p>
                </div>
              </Reveal>
            </Container>
          </Section>

          <GradientDivider />

          <Section title="Featured Portraits" subtitle="A glimpse into the collection's breadth.">
            <Container>
              <Reveal>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
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
                          alt="Featured 400 Club portrait"
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

          <Section title="Your seat is waiting" subtitle="One per wallet. First-come, first-served.">
            <Container className="text-center">
              <Reveal>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Button
                    asChild
                    className="bg-primary text-primary-foreground hover:brightness-110 text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-6 w-full sm:w-auto"
                  >
                    <Link to="/mint">Get ready for mint</Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="border-primary/50 text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-6 w-full sm:w-auto"
                  >
                    <Link to="/gallery">Discover the gallery</Link>
                  </Button>
                </div>
              </Reveal>
            </Container>
          </Section>
        </div>
      </div>
    </>
  );
};

export default Index;
