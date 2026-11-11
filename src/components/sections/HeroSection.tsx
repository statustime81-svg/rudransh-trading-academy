import { useEffect, useRef, useState } from "react";
import { ArrowDownRight, ArrowUpRight, BookOpen, MapPin } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { siteConfig } from "@/config/site";
import "@/styles/hero.css";
import "@/styles/hero-gold-overrides.css";

gsap.registerPlugin(ScrollTrigger);

const HERO_IMAGE = "/assets/hero/trading-hand-chart.png";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.fromTo("[data-hero-kicker]", { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.65 })
          .fromTo("[data-hero-line]", { yPercent: 108, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.85, stagger: 0.12 }, "-=0.22")
          .fromTo("[data-hero-desc]", { y: 25, opacity: 0 }, { y: 0, opacity: 1, duration: 0.65 }, "-=0.42")
          .fromTo("[data-hero-actions]", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.65 }, "-=0.4")
          .fromTo("[data-hero-art]", { y: 48, scale: 0.94, opacity: 0 }, { y: 0, scale: 1, opacity: 1, duration: 1.2 }, 0.15)
          .fromTo("[data-hero-footer]", { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, "-=0.35");

        gsap.to("[data-hero-halo]", {
          scale: 1.12, opacity: 0.8, duration: 5, yoyo: true, repeat: -1, ease: "sine.inOut",
        });
        gsap.to("[data-hero-art]", {
          y: -12, duration: 4.2, yoyo: true, repeat: -1, ease: "sine.inOut",
        });
      }, section);
      return () => ctx.revert();
    });

    media.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        gsap.to("[data-hero-art-wrap]", {
          yPercent: -9,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: 0.8,
          },
        });
      }, section);
      return () => ctx.revert();
    });

    return () => media.revert();
  }, []);

  return (
    <section ref={sectionRef} id="home" className="rta-new-hero" aria-labelledby="rta-hero-heading">
      <div className="rta-new-hero__grain" aria-hidden="true" />
      <div className="rta-new-hero__container container-premium">
        <div className="rta-new-hero__copy">
          <div data-hero-kicker className="rta-new-hero__eyebrow">
            <span className="rta-new-hero__eyebrow-dot" aria-hidden="true" />
            STOCK MARKET EDUCATION · PATNA
          </div>

          <h1 id="rta-hero-heading" className="rta-new-hero__heading">
            <span className="rta-new-hero__line-mask"><span data-hero-line>Understand</span></span>
            <span className="rta-new-hero__line-mask"><span data-hero-line>the <em>Market.</em></span></span>
            <span className="rta-new-hero__line-mask rta-new-hero__line-mask--small"><span data-hero-line>Start with knowledge.</span></span>
          </h1>

          <p data-hero-desc className="rta-new-hero__description">
            From market fundamentals to technical analysis and futures &amp; options, explore a structured learning path at {siteConfig.name}.
          </p>

          <div data-hero-actions className="rta-new-hero__actions">
            <a className="rta-new-hero__primary" href="#courses">
              Explore Our Course <ArrowUpRight size={19} aria-hidden="true" />
            </a>
            <a className="rta-new-hero__secondary" href="#admission">
              Admission Enquiry <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </div>

          <div data-hero-footer className="rta-new-hero__meta">
            <span><BookOpen size={17} aria-hidden="true" /> One course · Four learning modules</span>
            <span><MapPin size={17} aria-hidden="true" /> Punpun, Patna</span>
          </div>
        </div>

        <div data-hero-art-wrap className="rta-new-hero__art-column">
          <div data-hero-halo className="rta-new-hero__halo" aria-hidden="true" />
          {imageFailed ? (
            <div className="rta-new-hero__art-fallback" role="img" aria-label="Rudransh Trading Academy market education visual">
              <span>RTA</span>
              <strong>Market Knowledge</strong>
            </div>
          ) : (
            <img
              data-hero-art
              className="rta-new-hero__art"
              src={HERO_IMAGE}
              alt="Illustration of a hand presenting an upward trending financial market chart"
              fetchPriority="high"
              decoding="async"
              onError={() => setImageFailed(true)}
            />
          )}
          <span className="rta-new-hero__art-caption">ILLUSTRATIVE MARKET VISUAL · NOT LIVE DATA</span>
        </div>
      </div>
      <a className="rta-new-hero__scroll" href="#about" aria-label="Scroll to About Academy">
        DISCOVER THE ACADEMY <ArrowDownRight size={17} aria-hidden="true" />
      </a>
    </section>
  );
}
