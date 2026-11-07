/*
 * Client-side behavior for Smyan Reddy's portfolio.
 * Vanilla JavaScript: content binding, theme toggle, sticky nav state,
 * mobile disclosure menu, section reveal, and clipboard helper.
 */

(function () {
  "use strict";

  var prefersReducedMotion = false;
  try {
    prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch (e) {
    prefersReducedMotion = false;
  }

  function getByPath(obj, path) {
    if (!obj || !path) return undefined;
    var parts = path.split(".");
    var cur = obj;
    for (var i = 0; i < parts.length; i += 1) {
      if (cur == null) return undefined;
      cur = cur[parts[i]];
    }
    return cur;
  }

  /* Synchronize DOM nodes carrying data-bind attributes with window.SITE_CONTENT */
  function syncContentBindings() {
    var data = window.SITE_CONTENT;
    if (!data) return;

    var nodes = document.querySelectorAll("[data-bind]");
    for (var i = 0; i < nodes.length; i += 1) {
      var el = nodes[i];
      var val = getByPath(data, el.getAttribute("data-bind"));
      if (typeof val === "string" && el.textContent !== val) {
        el.textContent = val;
      }
    }

    var hrefNodes = document.querySelectorAll("[data-bind-href]");
    for (var j = 0; j < hrefNodes.length; j += 1) {
      var linkEl = hrefNodes[j];
      var hrefVal = getByPath(data, linkEl.getAttribute("data-bind-href"));
      if (typeof hrefVal === "string" && hrefVal.length > 0) {
        var prefix = linkEl.getAttribute("data-href-prefix") || "";
        linkEl.setAttribute("href", prefix + hrefVal);
      }
    }
  }

  /* Sticky header hairline on scroll */
  function initHeaderScroll() {
    var header = document.querySelector(".site-header");
    if (!header) return;

    function onScroll() {
      if (window.scrollY > 12) {
        header.classList.add("is-scrolled");
      } else {
        header.classList.remove("is-scrolled");
      }
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* Mobile "Menu" text disclosure */
  function initMobileMenu() {
    var btn = document.getElementById("nav-toggle");
    var list = document.getElementById("site-nav-list");
    if (!btn || !list) return;

    function closeMenu(returnFocus) {
      btn.setAttribute("aria-expanded", "false");
      btn.textContent = "Menu";
      list.classList.remove("is-open");
      if (returnFocus) {
        btn.focus();
      }
    }

    function openMenu() {
      btn.setAttribute("aria-expanded", "true");
      btn.textContent = "Close";
      list.classList.add("is-open");
    }

    btn.addEventListener("click", function () {
      var expanded = btn.getAttribute("aria-expanded") === "true";
      if (expanded) {
        closeMenu(false);
      } else {
        openMenu();
      }
    });

    var links = list.querySelectorAll("a");
    for (var i = 0; i < links.length; i += 1) {
      links[i].addEventListener("click", function () {
        closeMenu(false);
      });
    }

    document.addEventListener("keydown", function (ev) {
      if (ev.key === "Escape" && btn.getAttribute("aria-expanded") === "true") {
        closeMenu(true);
      }
    });

    document.addEventListener("click", function (ev) {
      if (
        btn.getAttribute("aria-expanded") === "true" &&
        !list.contains(ev.target) &&
        !btn.contains(ev.target)
      ) {
        closeMenu(false);
      }
    });
  }

  /* Active navigation highlight via IntersectionObserver */
  function initActiveNavObserver() {
    var navLinks = document.querySelectorAll('.nav-list a[href^="#"]');
    if (navLinks.length < 3 || !("IntersectionObserver" in window)) return;

    var linkMap = {};
    var sections = [];

    for (var i = 0; i < navLinks.length; i += 1) {
      var hash = navLinks[i].getAttribute("href");
      if (hash && hash.length > 1) {
        var target = document.getElementById(hash.slice(1));
        if (target) {
          linkMap[target.id] = navLinks[i];
          sections.push(target);
        }
      }
    }

    if (!sections.length) return;

    function setActive(id) {
      for (var k = 0; k < navLinks.length; k += 1) {
        navLinks[k].classList.remove("is-active");
        navLinks[k].removeAttribute("aria-current");
      }
      if (id && linkMap[id]) {
        linkMap[id].classList.add("is-active");
        linkMap[id].setAttribute("aria-current", "true");
      }
    }

    var visibleIds = {};
    var observer = new IntersectionObserver(
      function (entries) {
        for (var m = 0; m < entries.length; m += 1) {
          var entry = entries[m];
          visibleIds[entry.target.id] = entry.isIntersecting;
        }

        for (var s = 0; s < sections.length; s += 1) {
          var secId = sections[s].id;
          if (visibleIds[secId]) {
            setActive(secId);
            return;
          }
        }
      },
      {
        rootMargin: "-18% 0px -64% 0px",
        threshold: 0
      }
    );

    for (var n = 0; n < sections.length; n += 1) {
      observer.observe(sections[n]);
    }
  }

  /* Minimal one-time section fade-and-rise + hairline draw */
  function initSectionReveal() {
    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      return;
    }

    var sections = document.querySelectorAll(".reveal-section");
    if (!sections.length) return;

    var vh = window.innerHeight || document.documentElement.clientHeight;
    for (var i = 0; i < sections.length; i += 1) {
      var rect = sections[i].getBoundingClientRect();
      if (rect.top < vh * 0.92) {
        sections[i].classList.add("is-visible");
      }
    }

    document.documentElement.classList.add("js-ready");

    var revealObserver = new IntersectionObserver(
      function (entries, obs) {
        for (var j = 0; j < entries.length; j += 1) {
          if (entries[j].isIntersecting) {
            entries[j].target.classList.add("is-visible");
            obs.unobserve(entries[j].target);
          }
        }
      },
      {
        rootMargin: "0px 0px -8% 0px",
        threshold: 0.04
      }
    );

    for (var k = 0; k < sections.length; k += 1) {
      if (!sections[k].classList.contains("is-visible")) {
        revealObserver.observe(sections[k]);
      }
    }
  }

  /* Copy email address button with live status confirmation */
  function initEmailCopy() {
    var btn = document.getElementById("copy-email-btn");
    var status = document.getElementById("copy-status");
    if (!btn) return;

    var email =
      (window.SITE_CONTENT &&
        window.SITE_CONTENT.person &&
        window.SITE_CONTENT.person.email) ||
      "mathlete.world@gmail.com";

    function announce(msg) {
      if (!status) return;
      status.textContent = msg;
      window.setTimeout(function () {
        if (status.textContent === msg) {
          status.textContent = "";
        }
      }, 3500);
    }

    btn.addEventListener("click", function () {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(
          function () {
            announce("Copied " + email);
          },
          function () {
            fallbackCopy(email, announce);
          }
        );
      } else {
        fallbackCopy(email, announce);
      }
    });
  }

  function fallbackCopy(text, cb) {
    try {
      var area = document.createElement("textarea");
      area.value = text;
      area.setAttribute("readonly", "");
      area.style.position = "fixed";
      area.style.opacity = "0";
      document.body.appendChild(area);
      area.select();
      document.execCommand("copy");
      document.body.removeChild(area);
      cb("Copied " + text);
    } catch (e) {
      cb("Select mathlete.world@gmail.com to copy");
    }
  }

  /* Theme toggle respecting system default and persisting in localStorage via try/catch */
  function initThemeToggle() {
    var lightBtn = document.querySelector('[data-theme-choice="light"]');
    var darkBtn = document.querySelector('[data-theme-choice="dark"]');
    if (!lightBtn || !darkBtn) return;

    function getSystemTheme() {
      try {
        return window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";
      } catch (e) {
        return "light";
      }
    }

    function getStoredTheme() {
      try {
        var saved = window.localStorage.getItem("sr-theme");
        if (saved === "light" || saved === "dark") {
          return saved;
        }
      } catch (e) {
        return null;
      }
      return null;
    }

    function applyThemeState() {
      var stored = getStoredTheme();
      var effective = stored || getSystemTheme();
      if (stored) {
        document.documentElement.setAttribute("data-theme", stored);
      } else {
        document.documentElement.removeAttribute("data-theme");
      }
      lightBtn.setAttribute("aria-pressed", effective === "light" ? "true" : "false");
      darkBtn.setAttribute("aria-pressed", effective === "dark" ? "true" : "false");
    }

    function selectTheme(choice) {
      try {
        window.localStorage.setItem("sr-theme", choice);
      } catch (e) {
        /* Ignore storage errors in private browsing modes */
      }
      document.documentElement.setAttribute("data-theme", choice);
      lightBtn.setAttribute("aria-pressed", choice === "light" ? "true" : "false");
      darkBtn.setAttribute("aria-pressed", choice === "dark" ? "true" : "false");
    }

    lightBtn.addEventListener("click", function () {
      selectTheme("light");
    });

    darkBtn.addEventListener("click", function () {
      selectTheme("dark");
    });

    try {
      var mq = window.matchMedia("(prefers-color-scheme: dark)");
      if (mq && mq.addEventListener) {
        mq.addEventListener("change", function () {
          if (!getStoredTheme()) {
            applyThemeState();
          }
        });
      }
    } catch (e) {
      /* MatchMedia listener unsupported */
    }

    applyThemeState();
  }

  syncContentBindings();
  initHeaderScroll();
  initMobileMenu();
  initActiveNavObserver();
  initSectionReveal();
  initEmailCopy();
  initThemeToggle();
})();
