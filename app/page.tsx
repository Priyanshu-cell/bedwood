import { BestSellerSection, BrandSection, Header, ImageSection, OfferSection, TopPicksSection } from "@/components";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <Header/>
      <ImageSection/>
      <TopPicksSection/>
      <BrandSection/>
      <BestSellerSection/>
      <OfferSection/>
    </main>
  );
}
