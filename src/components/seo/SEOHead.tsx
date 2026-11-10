
import { useEffect } from "react";

import {
  getBusinessStructuredData,
  getCanonicalUrl,
  getCourseStructuredData,
  seoConfig,
} from "@/config/seo";

function upsertMeta(
  attribute: "name" | "property",
  key: string,
  content: string
) {
  let element = document.head.querySelector<HTMLMetaElement>(
    `meta[${attribute}="${key}"]`
  );

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.content = content;
}

function upsertCanonical(url: string) {
  let link = document.head.querySelector<HTMLLinkElement>(
    'link[rel="canonical"]'
  );

  if (!link) {
    link = document.createElement("link");
    link.rel = "canonical";
    document.head.appendChild(link);
  }

  link.href = url;
}

function removeCanonical() {
  document.head
    .querySelectorAll('link[rel="canonical"]')
    .forEach((element) => element.remove());
}

function upsertStructuredData(data: unknown) {
  let script = document.head.querySelector<HTMLScriptElement>(
    'script[data-rta-seo="structured-data"]'
  );

  if (!script) {
    script = document.createElement("script");
    script.type = "application/ld+json";
    script.dataset.rtaSeo = "structured-data";
    document.head.appendChild(script);
  }

  script.textContent = JSON.stringify(data).replace(
    /</g,
    "\\u003c"
  );
}

export default function SEOHead() {
  useEffect(() => {
    document.title = seoConfig.title;

    upsertMeta("name", "description", seoConfig.description);
    upsertMeta("name", "robots", seoConfig.robots);
    upsertMeta("name", "theme-color", seoConfig.themeColor);

    upsertMeta(
      "name",
      "keywords",
      seoConfig.keywords.join(", ")
    );

    upsertMeta(
      "property",
      "og:title",
      seoConfig.openGraph.title
    );

    upsertMeta(
      "property",
      "og:description",
      seoConfig.openGraph.description
    );

    upsertMeta("property", "og:type", "website");
    upsertMeta(
      "property",
      "og:site_name",
      seoConfig.siteName
    );

    upsertMeta("property", "og:locale", seoConfig.locale);
    upsertMeta("name", "twitter:card", "summary_large_image");

    const canonicalUrl = getCanonicalUrl();

    if (canonicalUrl) {
      upsertCanonical(canonicalUrl);
      upsertMeta("property", "og:url", canonicalUrl);
    } else {
      removeCanonical();
      document.head
        .querySelectorAll('meta[property="og:url"]')
        .forEach((element) => element.remove());
    }

    if (canonicalUrl && seoConfig.ogImage) {
      const imageUrl = new URL(
        seoConfig.ogImage,
        canonicalUrl
      ).href;

      upsertMeta("property", "og:image", imageUrl);
      upsertMeta("name", "twitter:image", imageUrl);
    }

    upsertStructuredData({
      "@context": "https://schema.org",
      "@graph": [
        (() => {
          const { ["@context"]: _context, ...business } =
            getBusinessStructuredData();
          void _context;
          return business;
        })(),
        (() => {
          const { ["@context"]: _context, ...course } =
            getCourseStructuredData();
          void _context;
          return course;
        })(),
      ],
    });
  }, []);

  return null;
}
