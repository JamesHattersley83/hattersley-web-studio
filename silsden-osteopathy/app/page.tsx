import Conditions from "@/components/home/Conditions";
import FinalCTA from "@/components/home/FinalCTA";
import GoogleReviews from "@/components/home/GoogleReviews";
import Hero from "@/components/home/Hero";
import Location from "@/components/home/Location";
import MeetAmy from "@/components/home/MeetAmy";
import OsteopathyIntro from "@/components/home/OsteopathyIntro";
import PilatesFeature from "@/components/home/PilatesFeature";
import PricesPreview from "@/components/home/PricesPreview";
import TrustBar from "@/components/home/TrustBar";
import WhyChooseUs from "@/components/home/WhyChooseUs";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <MeetAmy />
      <OsteopathyIntro />
      <Conditions />
      <PilatesFeature />
      <WhyChooseUs />
      <GoogleReviews />
      <PricesPreview />
      <FinalCTA />
      <Location />
    </>
  );
}
