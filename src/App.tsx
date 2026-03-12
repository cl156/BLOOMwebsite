import MouseGlow from "./components/MouseGlow";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Moment from "./components/Moment";
import WhatBloomIs from "./components/WhatBloomIs";
import HowItWorks from "./components/HowItWorks";
import ConversationsOptionA from "./components/ConversationsOptionA";
import SmarterTogether from "./components/SmarterTogether";
import ForCommunities from "./components/ForCommunities";
import AIAlly from "./components/AIAlly";
import Federated from "./components/Federated";
import ForPartners from "./components/ForPartners";
import Principles from "./components/Principles";
import Team from "./components/Team";
import GetInvolved from "./components/GetInvolved";
import Footer from "./components/Footer";

/**
 * BLOOM Marketing Site — single-page layout
 *
 * Section order follows the narrative arc:
 *   Hero → Moment → What BLOOM Is → How It Works → Active Conversations →
 *   Smarter Together → For Civic Hosts → AI Ally → Federated →
 *   For Partners → Not Another Platform → Team → The Invitation → Footer
 */
export default function App() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <MouseGlow />
      <Header />
      <main>
        <Hero />
        <Moment />
        <WhatBloomIs />
        <HowItWorks />
        <ConversationsOptionA />
        <SmarterTogether />
        <ForCommunities />
        <AIAlly />
        <Federated />
        <ForPartners />
        <Principles />
        <Team />
        <GetInvolved />
      </main>
      <Footer />
    </div>
  );
}
