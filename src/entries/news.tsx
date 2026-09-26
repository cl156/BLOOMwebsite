import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Header, { ScrollArrow } from "../components/Header";
import Footer from "../components/Footer";
import { CohortFormModal } from "../components/CohortForm";
import NewsPage from "../pages/NewsPage";
import "../index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div className="min-h-screen bg-cream text-maroon-900">
      <Header />
      <NewsPage />
      <Footer />
      <ScrollArrow />
      <CohortFormModal />
    </div>
  </StrictMode>,
);
