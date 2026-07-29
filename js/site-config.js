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
    expectedLaunch: "To be announced",
    // Set to the live Nearloom URL when it exists. Leave empty ("")
    // to show the disabled "Website Coming Soon" state instead.
    websiteUrl: ""
  },

  /* ---- Company contact ---- */
  contactEmail: "contact@wnexora.com",
  responseTime: "We normally respond within 2–3 business days.",
  location: "Operating internationally",

  /* ---- Contact form endpoint ----
     Point this at a Formspree/Basin/own-backend endpoint that emails
     submissions to the official WorldNexora address. While empty,
     the form shows the failure message on submit (nothing is sent). */
  formEndpoint: "",

  /* ---- Social media ----
     Only accounts with a URL are displayed anywhere on the site.
     Leave a value empty ("") to hide that platform's icon.          */
  social: {
    instagram: "",
    linkedin: "",
    x: "",
    facebook: "",
    youtube: "",
    tiktok: ""
  }
};
