import Seo from '../components/ui/Seo';
import Hero from '../components/home/Hero';
import ServicesIntro from '../components/home/ServicesIntro';
import WhyChooseUs from '../components/home/WhyChooseUs';
import RecentWork from '../components/home/RecentWork';
import ProcessSplit from '../components/home/ProcessSplit';
import Testimonials from '../components/home/Testimonials';
import ModernApproach from '../components/home/ModernApproach';
import CtaBand from '../components/home/CtaBand';

/** Home — dark theme; sections alternate ink / ink-soft. */
export default function Home() {
  return (
    <>
      <Seo description="Platinum Interior Design transforms houses into elegant, modern and comfortable homes in Harare, Zimbabwe: wainscoting, TV wall units, fitted kitchens, home cinemas, ceilings and more." />
      <Hero />
      <ServicesIntro />
      <WhyChooseUs />
      <RecentWork />
      <ProcessSplit />
      <ModernApproach />
      <CtaBand />
      <Testimonials />
    </>
  );
}
