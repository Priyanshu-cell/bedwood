import { BestSellerSection, BrandSection, Header, ImageSection, OfferSection, TopPicksSection, EssentialsSection, CollectionsSection, FurnishingSection, NewArrivalsSection, ModulersSection, ReviewSection, Footer } from "@/components";


export default function Home() {
  return (
    <main className="overflow-hidden">
      <Header/>
      <ImageSection/>
      <TopPicksSection/>
      <BrandSection/>
      <BestSellerSection/>
      <OfferSection/>
      <EssentialsSection/>
      <CollectionsSection/>
      <FurnishingSection />
      <NewArrivalsSection/>
      <ModulersSection/>
      <ReviewSection />
      <Footer/>
      
    </main>
  );
}
