/* ============================================================
   WorldNexora — Site Configuration
   ------------------------------------------------------------
   Edit the values below to update the website without touching
   any page layout. Every page reads from this file.
   ============================================================ */

window.WN_CONFIG = {

  /* ---- Nearloom product status ----
     Allowed status labels:
     "Concept" | "In Design" | "In Development" | "Private Testing"
     | "Beta" | "Preparing for Launch" | "Live"                    */
  nearloom: {
    status: "In Development",
    // Shown as "Expected Launch: <value>". Use e.g. "March 2027"
    // or "To be announced".
    expectedLaunch: "4th January 2027",
    // ISO timestamp used by the live countdown on the Home and Products pages.
    launchDate: "2027-01-04T00:00:00Z",
    // Set to the live Nearloom URL when it exists. Leave empty ("")
    // to show the disabled "Website Coming Soon" state instead.
    websiteUrl: ""
  },

  /* ---- Company contact ---- */
  contactEmail: "contact@wnexora.com",
  responseTime: "We normally respond within 2–3 business days.",
  location: "Operating internationally",

  /* ---- Contact form endpoint ---- */
  formEndpoint: "https://formspree.io/f/xqerjblj",

  /* ---- Social media ----
     Only accounts with a URL are displayed anywhere on the site.
     Leave a value empty ("") to hide that platform's icon.          */
  social: {
    instagram: "https://www.instagram.com/worldnexora.official?igsh=cTA1dzFnZmhpOW9k&utm_source=qr",
    linkedin: "https://www.linkedin.com/company/worldnexora/",
    x: "https://x.com/worldnexora?s=21",
    facebook: "https://www.facebook.com/share/1BrysAzEgp/?mibextid=wwXIfr",
    youtube: "",
    tiktok: ""
  }
};
