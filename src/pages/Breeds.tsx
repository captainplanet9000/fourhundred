"use client";

import React from "react";
import { Helmet } from "react-helmet-async";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const commonBreeds = [
  "Golden Retriever","Labrador Retriever","German Shepherd","Bulldog (English)","French Bulldog","Beagle","Poodle (Standard)","Rottweiler","Yorkshire Terrier","Dachshund","Siberian Husky","Boxer","Great Dane","Pomeranian","Boston Terrier","Shih Tzu","Cocker Spaniel","Border Collie","Chihuahua","Pug","Australian Shepherd","Maltese","Mastiff","Cavalier King Charles Spaniel","English Springer Spaniel","Bernese Mountain Dog","Doberman Pinscher","Miniature Schnauzer","Chow Chow","Saint Bernard","Akita Inu","Newfoundland","Weimaraner","Collie","Samoyed","Basset Hound","Great Pyrenees","Brittany","Vizsla","Irish Setter","Bloodhound","Bull Terrier","Whippet","Chinese Shar-Pei",
];

const uncommonBreeds = [
  "Afghan Hound","Alaskan Malamute","Airedale Terrier","Borzoi","Greyhound","Irish Wolfhound","Scottish Deerhound","Rhodesian Ridgeback","Saluki","Standard Schnauzer","Giant Schnauzer","Portuguese Water Dog","Leonberger","Anatolian Shepherd Dog","Cane Corso","Bullmastiff","German Shorthaired Pointer","Gordon Setter","English Setter","Pointer","Chesapeake Bay Retriever","Flat-Coated Retriever","Curly-Coated Retriever","Nova Scotia Duck Tolling Retriever","Wirehaired Pointing Griffon","Spinone Italiano","Welsh Springer Spaniel","Irish Water Spaniel","American Water Spaniel","Boykin Spaniel","Clumber Spaniel","Sussex Spaniel","Norwegian Elkhound","Keeshond","Finnish Spitz","Schipperke","Belgian Malinois","Belgian Tervuren","Belgian Sheepdog","Bouvier des Flandres","Old English Sheepdog","Bearded Collie","Polish Lowland Sheepdog","Puli","Komondor","Kuvasz","Tibetan Mastiff","Tibetan Terrier","Lhasa Apso","Shiba Inu","Basenji","Pharaoh Hound","Ibizan Hound","American Foxhound","English Foxhound","Treeing Walker Coonhound","Black and Tan Coonhound",
];

const rareBreeds = [
  "Xoloitzcuintli (Mexican Hairless)","Chinese Crested","Peruvian Inca Orchid","Thai Ridgeback","Azawakh","Sloughi","Cirneco dell'Etna","Otterhound","Petit Basset Griffon Vendeen","Grand Basset Griffon Vendeen","Briquet Griffon Vendeen","Harrier","Plott","Redbone Coonhound","Bluetick Coonhound","American English Coonhound","Norwegian Lundehund","Swedish Vallhund","Icelandic Sheepdog","Finnish Lapphund","Norwegian Buhund","Karelian Bear Dog","East Siberian Laika","West Siberian Laika","Russian-European Laika","Yakutian Laika","Greenland Dog","Canadian Eskimo Dog","Chinook","Carolina Dog","New Guinea Singing Dog","Dingo","Telomian","Kai Ken","Kishu Ken","Shikoku","Hokkaido","Jindo","Pungsan Dog","Donggyeongi","Nureongi","Phu Quoc Ridgeback","Hmong Dog","Catalburun","Turkish Pointer","Braque du Bourbonnais","Braque Francais","Spanish Water Dog","Portuguese Podengo","Podenco Canario","Podenco Ibicenco","Lagotto Romagnolo","Barbet","Russian Toy","Prague Ratter","Russian Tsvetnaya Bolonka",
];

const epicBreeds = [
  "Lundehund","Telomian","New Guinea Singing Dog","Carolina Dog","Dingo","Basenji","Azawakh","Catalburun","Mudi","Pumi","Spanish Mastiff","Pyrenean Mastiff","Neapolitan Mastiff","Fila Brasileiro","Dogo Argentino","Perro de Presa Canario","Alano Espanol","Ca de Bou","Caucasian Shepherd Dog","Central Asian Shepherd Dog","Kangal Dog","Akbash Dog","Tornjak","Sarplaninac","Karakachan Dog","Bulgarian Shepherd Dog","Carpathian Shepherd Dog","Mioritic Shepherd Dog","Bucovina Shepherd Dog","Estrela Mountain Dog","Castro Laboreiro Dog","Rafeiro do Alentejo","Cao da Serra da Estrela","Cao de Agua Portugues","Cao de Castro Laboreiro","Perdigueiro Portugues","Pointer Portugues","Perdiguero de Burgos","Pachon Navarro","Villano de Las Encartaciones","Galgo Espanol","Podenco Andaluz","Maneto","Ratonero Bodeguero Andaluz","Perro de Pastor Mallorquin","Ca Rater Mallorqui","Gos d'Atura Catala","Perro de Agua Espanol","Mastín del Pirineo","Mastín Espanol","Alano Espanol",
];

const legendaryBreeds = [
  "Tesem (Extinct Egyptian)","Salish Wool Dog (Extinct)","Hawaiian Poi Dog (Extinct)","Turnspit Dog (Extinct)","Talbot Hound (Extinct)","St. John's Water Dog (Extinct)","Molossus (Ancient Extinct)","Alaunt (Medieval Extinct)","Cuban Bloodhound (Extinct)","Paisley Terrier (Extinct)","Toy Trawler Spaniel (Extinct)","English Water Spaniel (Extinct)","Blue Paul Terrier (Extinct)","Cordoba Fighting Dog (Extinct)","Moscow Water Dog (Extinct)","Sakhalin Husky (Nearly Extinct)","Lundehund (Ultra Rare)","Mudi (Ultra Rare)","Lagotto Romagnolo (Ultra Rare)","Xolo (Ultra Rare Ancient)","Basenji (Ancient Rare)","New Guinea Singing Dog (Wild Rare)","Carolina Dog (Rare Wild)","Canaan Dog (Ancient)","Thai Ridgeback (Ultra Rare)","Phu Quoc Ridgeback (Ultra Rare)",
];

const BreedsPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Breeds — fourHundred</title>
        <meta name="description" content="Complete breed lists by rarity tier for the fourHundred collection." />
      </Helmet>
      <Section>
        <Container>
          <h1 className="text-3xl md:text-5xl font-semibold mb-6">Complete Breed Lists by Rarity Tier</h1>

          <Accordion type="multiple" className="w-full">
            <AccordionItem value="common">
              <AccordionTrigger>Common Breeds (45% — 4,500 NFTs — ~102 each)</AccordionTrigger>
              <AccordionContent>
                <p className="text-sm text-muted-foreground mb-3">Most recognizable and popular breeds with high market appeal:</p>
                <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
                  {commonBreeds.map((b) => (
                    <li key={b} className="text-foreground/90">{b}</li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="uncommon">
              <AccordionTrigger>Uncommon Breeds (30% — 3,000 NFTs — ~52 each)</AccordionTrigger>
              <AccordionContent>
                <p className="text-sm text-muted-foreground mb-3">Popular among enthusiasts but less mainstream:</p>
                <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
                  {uncommonBreeds.map((b) => (
                    <li key={b} className="text-foreground/90">{b}</li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="rare">
              <AccordionTrigger>Rare Breeds (18% — 1,800 NFTs — ~31 each)</AccordionTrigger>
              <AccordionContent>
                <p className="text-sm text-muted-foreground mb-3">Lesser-known but distinctive breeds with unique characteristics:</p>
                <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
                  {rareBreeds.map((b) => (
                    <li key={b} className="text-foreground/90">{b}</li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="epic">
              <AccordionTrigger>Epic Breeds (6% — 600 NFTs — ~11 each)</AccordionTrigger>
              <AccordionContent>
                <p className="text-sm text-muted-foreground mb-3">Extremely uncommon or regionally specific breeds:</p>
                <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
                  {epicBreeds.map((b) => (
                    <li key={b} className="text-foreground/90">{b}</li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="legendary">
              <AccordionTrigger>Legendary Breeds (1% — 100 NFTs — ~4 each)</AccordionTrigger>
              <AccordionContent>
                <p className="text-sm text-muted-foreground mb-3">Extinct breeds and ultra-rare living breeds with maximum collectibility:</p>
                <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
                  {legendaryBreeds.map((b) => (
                    <li key={b} className="text-foreground/90">{b}</li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Container>
      </Section>
    </>
  );
};

export default BreedsPage;