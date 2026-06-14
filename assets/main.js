// RiseUp Consulting — Shared interactions (v2)

document.addEventListener("DOMContentLoaded", () => {
  /* ---------- Drawer navigation ---------- */
  const drawer = document.querySelector(".drawer");
  const overlay = document.querySelector(".drawer-overlay");
  const openTriggers = document.querySelectorAll("[data-drawer-open]");
  const closeTriggers = document.querySelectorAll("[data-drawer-close]");

  function openDrawer() {
    drawer?.classList.add("open");
    overlay?.classList.add("open");
    openTriggers.forEach((b) => b.classList.add("open"));
    document.body.style.overflow = "hidden";
  }

  function closeDrawer() {
    drawer?.classList.remove("open");
    overlay?.classList.remove("open");
    openTriggers.forEach((b) => b.classList.remove("open"));
    document.body.style.overflow = "";
  }

  openTriggers.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (drawer?.classList.contains("open")) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });
  });

  closeTriggers.forEach((btn) => btn.addEventListener("click", closeDrawer));
  overlay?.addEventListener("click", closeDrawer);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeDrawer();
  });

  /* ---------- Language toggle (EN / ES) ---------- */
  const langToggles = document.querySelectorAll("[data-lang-toggle]");
  const storedLang = localStorage.getItem("riseup-lang") || "en";

  function applySelectLang(lang) {
    document.querySelectorAll("select option[data-en]").forEach((opt) => {
      const text = lang === "es" ? opt.getAttribute("data-es") : opt.getAttribute("data-en");
      if (text) opt.textContent = text;
    });
  }

  document.documentElement.setAttribute("data-lang", storedLang);
  langToggles.forEach((el) => el.setAttribute("data-current", storedLang));
  applySelectLang(storedLang);

  langToggles.forEach((toggle) => {
    toggle.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-lang") || "en";
      const next = current === "en" ? "es" : "en";
      document.documentElement.setAttribute("data-lang", next);
      localStorage.setItem("riseup-lang", next);
      langToggles.forEach((el) => el.setAttribute("data-current", next));
      applySelectLang(next);
    });
  });

  /* ---------- Duplicate marquee content for seamless loop ---------- */
  document.querySelectorAll(".marquee").forEach((marquee) => {
    const track = marquee.querySelector(".marquee-track");
    if (track && !marquee.dataset.cloned) {
      const clone = track.cloneNode(true);
      marquee.appendChild(clone);
      marquee.dataset.cloned = "true";
    }
  });

  /* ---------- Reveal-on-scroll ---------- */
  const revealEls = document.querySelectorAll(
    ".offset-row, .timeline-row, .quote-row, .pull-block, .stat-strip .stat"
  );
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  revealEls.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(14px)";
    el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    observer.observe(el);
  });

  /* ---------- Formspree AJAX submission ---------- */
  const form = document.querySelector("#contact-form");
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const status = document.querySelector("#form-status");
      const submitBtn = form.querySelector("button[type='submit']");
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML =
        document.documentElement.getAttribute("data-lang") === "es"
          ? "Enviando..."
          : "Sending...";

      try {
        const response = await fetch(form.action, {
          method: "POST",
          body: new FormData(form),
          headers: { Accept: "application/json" },
        });

        if (response.ok) {
          form.reset();
          status.textContent =
            document.documentElement.getAttribute("data-lang") === "es"
              ? "Gracias. Tu mensaje fue enviado y te responderemos dentro de un día hábil."
              : "Thanks. Your message has been sent and we'll respond within one business day.";
          status.className = "form-status show success";
        } else {
          status.textContent =
            document.documentElement.getAttribute("data-lang") === "es"
              ? "Algo salio mal. Intenta de nuevo o llamanos directamente."
              : "Something went wrong. Please try again or call us directly.";
          status.className = "form-status show error";
        }
      } catch (err) {
        status.textContent =
          document.documentElement.getAttribute("data-lang") === "es"
            ? "Algo salio mal. Intenta de nuevo o llamanos directamente."
            : "Something went wrong. Please try again or call us directly.";
        status.className = "form-status show error";
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }
    });
  }
});
