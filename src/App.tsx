import Header, { ScrollArrow } from "./components/Header";
import Hero from "./components/Hero";
import Vision from "./components/Vision";
import CaseStudies from "./components/CaseStudies";
import WhatBloomIs from "./components/WhatBloomIs";
import CohortCard from "./components/CohortCard";
import Approach from "./components/Approach";
import Partners from "./components/Partners";
import LatestNews from "./components/LatestNews";
import Footer from "./components/Footer";
import { CohortFormModal } from "./components/CohortForm";

/**
 * BLOOM homepage — Public Assemblies on AI
 *
 * Section order:
 *   Hero → Vision (why) → The Work (Utah, Central Oregon) → What we do (how) →
 *   Our Approach ("How we work") → 2027 Cohort teaser → Partners (staging only for now) → Latest news → Footer
 *
 * Other pages: /cohort/ (theory of change + application), /people/ (team), /news/ (press).
 */
export default function App() {
  return (
    <div className="min-h-screen bg-cream text-maroon-900">
      <Header />
      <main>
        <Hero />
        <Vision />
        <CaseStudies />
        <WhatBloomIs />
        <Approach />
        <CohortCard />
        <Partners />
        <LatestNews />
      </main>
      <Footer />
      <ScrollArrow />
      <CohortFormModal />
    </div>
  );
}
