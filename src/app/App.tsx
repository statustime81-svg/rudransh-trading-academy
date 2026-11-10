
import {
  useCallback,
  useState,
  type MouseEvent,
} from "react";

// Layout
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ScrollProgress from "@/components/layout/ScrollProgress";

// Animations
import Preloader from "@/components/animations/Preloader";

// Sections
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import TrainerSection from "@/components/sections/TrainerSection";
import MarketGrowthSection from "@/components/sections/MarketGrowthSection";
import CoursesSection from "@/components/sections/CoursesSection";
import BenefitsSection from "@/components/sections/BenefitsSection";
import GallerySection from "@/components/sections/GallerySection";
import ReviewsSection from "@/components/sections/ReviewsSection";
import AdmissionSection from "@/components/sections/AdmissionSection";
import ContactSection from "@/components/sections/ContactSection";

// UI
import FloatingActions from "@/components/ui/FloatingActions";
import AdmissionModal from "@/components/ui/AdmissionModal";
import SEOHead from "@/components/seo/SEOHead";

// Data
import { approvedGalleryMedia } from "@/data/media";
import { getVerifiedReviews } from "@/data/reviews";

export default function App() {
  const [admissionOpen, setAdmissionOpen] =
    useState(false);

  const openAdmission = useCallback(() => {
    setAdmissionOpen(true);
  }, []);

  const closeAdmission = useCallback(() => {
    setAdmissionOpen(false);
  }, []);

  // Open the admission popup for #admission links.
  const handleAdmissionClick = (
    event: MouseEvent<HTMLDivElement>
  ) => {
    const target = event.target;

    if (!(target instanceof Element)) {
      return;
    }

    const admissionLink =
      target.closest<HTMLAnchorElement>(
        'a[href="#admission"]'
      );

    if (!admissionLink) {
      return;
    }

    // Preserve browser shortcuts.
    if (
      event.button !== 0 ||
      event.ctrlKey ||
      event.metaKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    event.preventDefault();
    openAdmission();
  };

  return (
    <div
      onClickCapture={handleAdmissionClick}
      className="min-h-screen overflow-x-hidden bg-[#0B0D10] text-[#F5F3EE]"
    >
      {/* SEO */}
      <SEOHead />

      {/* Loading Screen */}
      <Preloader />

      {/* Scroll Indicator */}
      <ScrollProgress />

      {/* Navbar */}
      <Header />

      {/* Website Sections */}
      <main id="main-content">
        {/* 01 - Hero */}
        <HeroSection />

        {/* 02 - About Academy */}
        <AboutSection />

        {/* 03 - Trainer */}
        <TrainerSection />

        {/* 04 - Explore the Market */}
        <MarketGrowthSection />

        {/* 05 - Explore Our Curriculum */}
        <CoursesSection />

        {/* 06 - Benefits */}
        <BenefitsSection />

        {/* 07 - Gallery */}
        <GallerySection
          photos={approvedGalleryMedia}
        />

        {/* 08 - Reviews */}
        <ReviewsSection
          reviews={getVerifiedReviews()}
        />

        {/* 09 - Admission */}
        <AdmissionSection />

        {/* 10 - Contact */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Contact Buttons */}
      <FloatingActions />

      {/* Global Admission Popup */}
      <AdmissionModal
        isOpen={admissionOpen}
        onClose={closeAdmission}
      />
    </div>
  );
}
