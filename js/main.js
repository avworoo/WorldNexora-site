/* WorldNexora — shared behaviour: nav, config-driven content,
   social links, reveal animations, contact form. */
(function () {
  "use strict";

  /* ---------- Clean page addresses ---------- */
  var currentPath = window.location.pathname;
  var cleanPath = currentPath.replace(/\/index\.html$/, "/").replace(/\.html$/, "");
  if (cleanPath !== currentPath) {
    window.history.replaceState(null, "", cleanPath + window.location.search + window.location.hash);
  }

  var cfg = window.WN_CONFIG || {};

  /* ---------- Mobile navigation ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    links.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---------- Config-driven text (status, launch date, email…) ---------- */
  document.querySelectorAll("[data-wn]").forEach(function (el) {
    var key = el.getAttribute("data-wn");
    var map = {
      "status": cfg.nearloom && cfg.nearloom.status,
      "launch": cfg.nearloom && cfg.nearloom.expectedLaunch,
      "email": cfg.contactEmail,
      "response-time": cfg.responseTime,
      "location": cfg.location
    };
    if (map[key]) el.textContent = map[key];
  });

  document.querySelectorAll("[data-wn-mailto]").forEach(function (el) {
    if (cfg.contactEmail) el.setAttribute("href", "mailto:" + cfg.contactEmail);
  });

  /* ---------- Visit Nearloom buttons ---------- */
  document.querySelectorAll("[data-wn-visit]").forEach(function (btn) {
    var url = cfg.nearloom && cfg.nearloom.websiteUrl;
    if (url) {
      btn.textContent = "Visit Nearloom";
      btn.setAttribute("href", url);
      btn.setAttribute("target", "_blank");
      btn.setAttribute("rel", "noopener");
      btn.removeAttribute("aria-disabled");
    } else {
      btn.textContent = "Website Coming Soon";
      btn.setAttribute("aria-disabled", "true");
      btn.removeAttribute("href");
      btn.setAttribute("role", "link");
      btn.setAttribute("tabindex", "0");
    }
  });

  /* ---------- Social media links ---------- */
  var PLATFORMS = {
    instagram: { label: "Instagram", icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none"/></svg>' },
    linkedin:  { label: "LinkedIn",  icon: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V23h-4V8zm7.5 0h3.8v2.05h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V23h-4v-7.9c0-1.88-.03-4.3-2.62-4.3-2.62 0-3.02 2.05-3.02 4.17V23H8V8z" transform="translate(1.6 0) scale(0.92)"/></svg>' },
    x:         { label: "X",         icon: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.9 2H22l-6.77 7.74L23.2 22h-6.23l-4.88-6.38L6.5 22H3.37l7.24-8.28L1.2 2h6.39l4.41 5.83L18.9 2zm-1.1 18.13h1.73L7.05 3.77H5.2l12.6 16.36z"/></svg>' },
    facebook:  { label: "Facebook",  icon: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.25-1.5 1.55-1.5h1.65V3.6c-.3-.04-1.3-.12-2.45-.12-2.4 0-4.05 1.47-4.05 4.17v2.25H7.5V13h2.7v8h3.3z"/></svg>' },
    youtube:   { label: "YouTube",   icon: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23 7.2s-.22-1.56-.9-2.24c-.86-.9-1.82-.91-2.26-.96C16.7 3.77 12 3.77 12 3.77h-.01s-4.7 0-7.84.23c-.44.05-1.4.06-2.26.96C1.21 5.64 1 7.2 1 7.2S.77 9.03.77 10.87v1.71C.77 14.4 1 16.24 1 16.24s.22 1.56.9 2.24c.86.9 1.99.87 2.49.97 1.81.17 7.61.22 7.61.22s4.71-.01 7.85-.23c.44-.06 1.4-.07 2.26-.97.68-.68.9-2.24.9-2.24s.22-1.83.22-3.67v-1.7C23.22 9.03 23 7.2 23 7.2zM9.7 14.85V8.4l6.06 3.24L9.7 14.85z"/></svg>' },
    tiktok:    { label: "TikTok",    icon: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16.6 3c.36 1.94 1.7 3.44 3.9 3.58v2.86c-1.42.14-2.85-.34-3.9-1.05v6.42c0 4.32-4.71 6.63-8.05 4.18-2.16-1.59-2.66-4.67-1.12-6.88 1.2-1.72 3.28-2.55 5.32-2.13v2.94a2.35 2.35 0 0 0-2.87 1.4c-.5 1.28.24 2.68 1.57 2.98 1.5.34 2.9-.77 2.9-2.3V3h2.25z"/></svg>' }
  };

  document.querySelectorAll("[data-wn-social]").forEach(function (list) {
    var social = cfg.social || {};
    var any = false;
    Object.keys(PLATFORMS).forEach(function (key) {
      var url = social[key];
      if (!url) return;
      any = true;
      var li = document.createElement("li");
      var a = document.createElement("a");
      a.href = url;
      a.target = "_blank";
      a.rel = "noopener";
      a.setAttribute("aria-label", "Visit WorldNexora on " + PLATFORMS[key].label + " (opens in a new tab)");
      a.innerHTML = PLATFORMS[key].icon;
      li.appendChild(a);
      list.appendChild(li);
    });
    if (!any) {
      var note = document.createElement("li");
      note.className = "social-empty";
      note.textContent = "Official social media accounts are coming soon.";
      list.appendChild(note);
    }
  });

  /* ---------- Auto-updating copyright year ---------- */
  document.querySelectorAll("[data-wn-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* ---------- Reveal-on-scroll (respects reduced motion) ---------- */
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var targets = document.querySelectorAll(".reveal");
  if (reduced || !("IntersectionObserver" in window)) {
    targets.forEach(function (t) { t.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    targets.forEach(function (t) { io.observe(t); });
  }

  /* ---------- Contact form ---------- */
  var form = document.getElementById("contact-form");
  if (form) {
    var statusBox = document.getElementById("form-status");
    var submitBtn = form.querySelector('button[type="submit"]');
    var loadedAt = Date.now();

    var validators = {
      name: function (v) { return v.trim() ? "" : "Please enter your name."; },
      email: function (v) {
        if (!v.trim()) return "Please enter your email address.";
        return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? "" : "Please enter a valid email address.";
      },
      reason: function (v) { return v ? "" : "Please select a reason for your enquiry."; },
      subject: function (v) { return v.trim() ? "" : "Please enter a subject."; },
      message: function (v) { return v.trim() ? "" : "Please enter your message."; },
      consent: function (v, el) { return el.checked ? "" : "Please confirm you agree so we can respond to your enquiry."; }
    };

    function validateField(el) {
      var check = validators[el.name];
      if (!check) return true;
      var msg = check(el.value, el);
      var field = el.closest(".field");
      var errEl = field.querySelector(".field-error");
      if (msg) {
        field.classList.add("invalid");
        errEl.textContent = msg;
        el.setAttribute("aria-invalid", "true");
        return false;
      }
      field.classList.remove("invalid");
      el.removeAttribute("aria-invalid");
      return true;
    }

    form.querySelectorAll("input, select, textarea").forEach(function (el) {
      el.addEventListener("blur", function () { validateField(el); });
      el.addEventListener("input", function () {
        if (el.closest(".field").classList.contains("invalid")) validateField(el);
      });
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      statusBox.className = "form-status";

      // Spam protection: honeypot + minimum fill time.
      if (form.querySelector('[name="website"]').value || Date.now() - loadedAt < 3000) return;

      var allValid = true;
      var firstInvalid = null;
      form.querySelectorAll("[name]").forEach(function (el) {
        if (el.name === "website" || el.name === "organisation") return;
        if (!validateField(el)) {
          allValid = false;
          if (!firstInvalid) firstInvalid = el;
        }
      });
      if (!allValid) { firstInvalid.focus(); return; }

      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span class="spinner" aria-hidden="true"></span>Sending…';

      var data = new FormData(form);
      data.delete("website");
      data.append("submitted_at", new Date().toISOString());

      var done = function (ok) {
        submitBtn.disabled = false;
        submitBtn.textContent = "Send Enquiry";
        if (ok) {
          statusBox.className = "form-status success";
          statusBox.textContent = "Thank you for contacting WorldNexora. Your enquiry has been received and our team will respond as soon as possible.";
          form.reset();
        } else {
          statusBox.className = "form-status error";
          statusBox.textContent = "We could not send your enquiry at this time. Please try again or contact us directly by email.";
        }
        statusBox.scrollIntoView({ block: "nearest", behavior: "smooth" });
      };

      if (!cfg.formEndpoint) {
        // No endpoint configured yet — nothing is sent.
        setTimeout(function () { done(false); }, 600);
        return;
      }

      fetch(cfg.formEndpoint, {
        method: "POST",
        body: data,
        headers: { "Accept": "application/json" }
      }).then(function (res) { done(res.ok); })
        .catch(function () { done(false); });
    });
  }
})();
