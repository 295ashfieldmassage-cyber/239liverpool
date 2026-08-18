/* =====================================================
   WEEKLY ROSTER DATA
   每周排班资料
===================================================== */

/* =====================================================
   HOVER PHOTO BACKEND FIELDS
   Add each person's B/C/D paths here. Both the homepage
   and Gallery page use this single configuration.
===================================================== */
const hoverPhotoData = {};

function hoverPhotoKey(name) {
  return name.toLowerCase().trim().split(/\s+/)[0];
}

function getHoverImages(person) {
  return person.hoverImages || window.get239HoverImages?.(person) || hoverPhotoData[hoverPhotoKey(person.name)] || [];
}

const legacyRosterSource = "";

const rosterData = window.ORIGINAL_ROSTER || {};


/* =====================================================
   DAY LABELS
===================================================== */

const dayLabels = {
  monday: {
    english: "Monday Roster",
    chinese: "周一治疗师"
  },
  tuesday: {
    english: "Tuesday Roster",
    chinese: "周二治疗师"
  },
  wednesday: {
    english: "Wednesday Roster",
    chinese: "周三治疗师"
  },
  thursday: {
    english: "Thursday Roster",
    chinese: "周四治疗师"
  },
  friday: {
    english: "Friday Roster",
    chinese: "周五治疗师"
  },
  saturday: {
    english: "Saturday Roster",
    chinese: "周六治疗师"
  },
  sunday: {
    english: "Sunday Roster",
    chinese: "周日治疗师"
  }
};


/* =====================================================
   ROSTER ELEMENTS
===================================================== */

const scheduleContent = document.querySelector("#schedule-content");
const dayTabs = [...document.querySelectorAll(".day-tab")];
const rosterDayLabel = document.querySelector("#roster-day-label");
const rosterDayTitle = document.querySelector("#roster-day-title");
const previousButton = document.querySelector(".slider-prev");
const nextButton = document.querySelector(".slider-next");

const additionalGalleryPeople = [];

function normalisePersonKey(name = "") {
  return name
    .trim()
    .toLowerCase()
    .replace(/\s+\d{1,2}(?::\d{2})?\s*(?:am|pm)?(?:\s*[-–]\s*\d{1,2}(?::\d{2})?\s*(?:am|pm)?)?$/i, "")
    .trim();
}

function getCompleteTeamData() {
  const unique = new Map();
  const addPeople = people => people.forEach(person => {
    const key = normalisePersonKey(person.name);
    if (key && !unique.has(key)) unique.set(key, person);
  });

  addPeople(Object.values(window.WEEKLY_ROSTER?.days || {}).flat());
  addPeople(Object.values(rosterData).flat());
  addPeople(additionalGalleryPeople);

  return [...unique.values()];
}


/* =====================================================
   RENDER ROSTER
===================================================== */

function renderSchedule(day) {
  if (!scheduleContent) return;

  const people = rosterData[day] || [];
  const label = dayLabels[day];

  scheduleContent.style.opacity = "0";

  window.setTimeout(() => {
    if (rosterDayLabel && label) {
      rosterDayLabel.textContent = label.english;
    }

    if (rosterDayTitle && label) {
      rosterDayTitle.textContent = label.chinese;
    }

    if (people.length === 0) {
      scheduleContent.innerHTML = `
        <div class="empty-roster">
          <p>No practitioner availability has been published for this day.</p>
        </div>
      `;

      scheduleContent.style.opacity = "1";
      return;
    }

    scheduleContent.innerHTML = people.map(person => {
      const hoverImages = getHoverImages(person);

      return `
      <article class="therapist-card team-profile-card" tabindex="0">

        <div class="therapist-image hover-gallery" data-hover-images='${JSON.stringify(hoverImages)}'>
          <img
            src="${person.image}"
            data-original-src="${person.image}"
            alt="${person.name} — ${person.role}"
            loading="lazy"
          >
          <div class="gallery-profile-overlay team-profile-overlay">
            <h3>${person.name}</h3>
            <div>${[person.role, person.hours].filter(Boolean).map(tag => `<span>${tag}</span>`).join("")}</div>
          </div>
        </div>

        <div class="therapist-info">
          <h4>${person.name}</h4>
          <p>${person.role}</p>
          <p>${person.hours}</p>
        </div>

      </article>
    `;
    }).join("");

    initialiseHoverGalleries(scheduleContent);
    if (typeof applySiteLanguage === "function") {
      applySiteLanguage(localStorage.getItem("239-language") || "en");
    }

    scheduleContent.scrollLeft = 0;
    scheduleContent.style.opacity = "1";
    restartRosterAutoplay();
  }, 120);
}

function renderTeamGallery() {
  if (!scheduleContent) return;

  const people = getCompleteTeamData();
  scheduleContent.innerHTML = people.map(person => {
    const hoverImages = getHoverImages(person);
    const nationality = person.nationality || person.hours || "";
    const role = person.role || "";
    const facts = [
      person.height,
      person.weight,
      person.age ? `${person.age} yo` : "",
      person.cup ? `${person.cup} cup` : ""
    ].filter(Boolean);

    return `
      <article class="therapist-card team-profile-card" tabindex="0">
        <div class="therapist-image hover-gallery" data-hover-images='${JSON.stringify(hoverImages)}'>
          <img src="${person.image}" data-original-src="${person.image}" alt="${person.name}" loading="lazy">
          <div class="gallery-profile-overlay team-profile-overlay">
            <h3>${person.name}</h3>
            ${person.description ? `<p>${person.description}</p>` : ""}
            <div>
              ${[nationality, role, ...facts].filter(Boolean).map(fact => `<span>${fact}</span>`).join("")}
            </div>
          </div>
        </div>
        <div class="therapist-info">
          <h4>${person.name}</h4>
          ${nationality ? `<p>${nationality}</p>` : ""}
          ${facts.length ? `<p class="team-card-facts">${facts.join(" · ")}</p>` : ""}
        </div>
      </article>
    `;
  }).join("");

  initialiseHoverGalleries(scheduleContent);
  scheduleContent.scrollLeft = 0;
  scheduleContent.style.opacity = "1";
}

/* =====================================================
   PHOTO HOVER GALLERIES
   A is the normal image. While hovered, available -b,
   -c and -d files rotate every 2 seconds.
===================================================== */

const HOVER_ROTATION_MS = 2000;

function initialiseHoverGalleries(scope = document) {
  scope.querySelectorAll(".hover-gallery").forEach(gallery => {
    if (gallery.dataset.hoverReady === "true") return;
    gallery.dataset.hoverReady = "true";

    const image = gallery.querySelector("img");
    if (!image) return;

    const original = image.dataset.originalSrc || image.currentSrc || image.src;
    let requested = [];
    try { requested = JSON.parse(gallery.dataset.hoverImages || "[]"); } catch (_) { requested = []; }

    const available = [];
    requested.forEach(src => {
      const probe = new Image();
      probe.onload = () => available.push(src);
      probe.src = src;
    });

    let timer = null;
    let index = 0;

    const showNext = () => {
      if (!available.length) return;
      image.classList.add("is-changing");
      window.setTimeout(() => {
        image.src = available[index % available.length];
        index += 1;
        image.classList.remove("is-changing");
      }, 180);
    };

    gallery.addEventListener("mouseenter", () => {
      showNext();
      timer = window.setInterval(showNext, HOVER_ROTATION_MS);
    });

    gallery.addEventListener("mouseleave", () => {
      window.clearInterval(timer);
      timer = null;
      index = 0;
      image.src = original;
      image.classList.remove("is-changing");
    });
  });
}

// Also enable the same 2-second hover rotation on standalone feature images.
initialiseHoverGalleries(document);


/* =====================================================
   DAY TAB CONTROLS
===================================================== */

// The homepage section is an all-staff carousel. The weekly announcement
// remains a separate, date-based section managed by weekly-roster.js.


/* =====================================================
   SLIDER CONTROLS
===================================================== */

let rosterAutoplayTimer = null;

function rosterCardStep() {
  const firstCard = scheduleContent?.querySelector(".therapist-card");
  if (!firstCard) return 242;
  const styles = window.getComputedStyle(scheduleContent);
  const gap = parseFloat(styles.columnGap || styles.gap || "14") || 14;
  return firstCard.getBoundingClientRect().width + gap;
}

function moveRosterCarousel(direction = 1) {
  if (!scheduleContent) return;
  const step = rosterCardStep();
  const maxScroll = Math.max(0, scheduleContent.scrollWidth - scheduleContent.clientWidth);
  const atEnd = scheduleContent.scrollLeft >= maxScroll - 8;
  const atStart = scheduleContent.scrollLeft <= 8;
  if ((direction > 0 && atEnd) || (direction < 0 && atStart)) {
    scheduleContent.scrollTo({ left: direction > 0 ? 0 : maxScroll, behavior: "smooth" });
  } else {
    scheduleContent.scrollBy({ left: direction * step, behavior: "smooth" });
  }
}

function stopRosterAutoplay() {
  window.clearInterval(rosterAutoplayTimer);
  rosterAutoplayTimer = null;
}

function restartRosterAutoplay() {
  if (!scheduleContent || scheduleContent.children.length < 2) return;
  stopRosterAutoplay();
  rosterAutoplayTimer = window.setInterval(() => moveRosterCarousel(1), 6000);
}

if (previousButton && scheduleContent) {
  previousButton.addEventListener("click", () => {
    moveRosterCarousel(-1);
    restartRosterAutoplay();
  });
}

if (nextButton && scheduleContent) {
  nextButton.addEventListener("click", () => {
    moveRosterCarousel(1);
    restartRosterAutoplay();
  });
}

const rosterSliderWrap = document.querySelector(".roster-slider-wrap");
rosterSliderWrap?.addEventListener("mouseenter", stopRosterAutoplay);
rosterSliderWrap?.addEventListener("mouseleave", restartRosterAutoplay);
rosterSliderWrap?.addEventListener("focusin", stopRosterAutoplay);
rosterSliderWrap?.addEventListener("focusout", restartRosterAutoplay);

if (scheduleContent) {
  renderTeamGallery();
  restartRosterAutoplay();
}


/* =====================================================
   HEADER SCROLL
===================================================== */

const header = document.querySelector(".site-header");

if (header) {
  window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 20);
  });
}


/* =====================================================
   MOBILE MENU
===================================================== */

const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");

    menuToggle.setAttribute(
      "aria-expanded",
      String(isOpen)
    );
  });

  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}


/* =====================================================
   SCROLL REVEAL
===================================================== */

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });

  revealElements.forEach(element => {
    observer.observe(element);
  });
} else {
  revealElements.forEach(element => {
    element.classList.add("visible");
  });
}


/* =====================================================
   CONTACT FORM
===================================================== */

const form = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");

if (form) {
  form.addEventListener("submit", event => {
    event.preventDefault();

    if (formStatus) {
      const language = localStorage.getItem("239-language") || "en";
      const messages = {
        en: "Your enquiry has been recorded. Please connect this form to your booking system before publishing.",
        zh: "您的咨询已记录。发布网站前，请将此表单连接到预约系统。",
        vi: "Yêu cầu của bạn đã được ghi nhận. Vui lòng kết nối biểu mẫu với hệ thống đặt lịch trước khi xuất bản.",
        ar: "تم تسجيل استفسارك. يرجى ربط النموذج بنظام الحجز قبل نشر الموقع.",
        ja: "お問い合わせを受け付けました。公開前にフォームを予約システムへ接続してください。",
        ko: "문의가 기록되었습니다. 게시 전에 이 양식을 예약 시스템에 연결해 주세요."
      };
      formStatus.textContent = messages[language] || messages.en;
    }

    form.reset();
  });
}


/* =====================================================
   CURRENT YEAR
===================================================== */

const yearElement = document.querySelector("#year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

/* =====================================================
   FLOATING IMAGE PREVIEW
===================================================== */

const floatingPhotoButton = document.querySelector("#floating-photo-button");
const floatingPhotoModal = document.querySelector("#floating-photo-modal");
const floatingPhotoClose = document.querySelector("#floating-photo-close");

function openFloatingPhoto() {
  if (!floatingPhotoModal) return;
  floatingPhotoModal.classList.add("open");
  floatingPhotoModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  floatingPhotoClose?.focus();
}

function closeFloatingPhoto() {
  if (!floatingPhotoModal) return;
  floatingPhotoModal.classList.remove("open");
  floatingPhotoModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  floatingPhotoButton?.focus();
}

floatingPhotoButton?.addEventListener("click", openFloatingPhoto);
floatingPhotoClose?.addEventListener("click", closeFloatingPhoto);

floatingPhotoModal?.addEventListener("click", event => {
  if (event.target === floatingPhotoModal) closeFloatingPhoto();
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape" && floatingPhotoModal?.classList.contains("open")) {
    closeFloatingPhoto();
  }
});


/* =====================================================
   REUSABLE IMAGE LIGHTBOX
===================================================== */
const imageLightbox = document.querySelector('#image-lightbox');
const imageLightboxImg = imageLightbox?.querySelector('img');
const imageLightboxClose = imageLightbox?.querySelector('.image-lightbox-close');

document.querySelectorAll('[data-image-open]').forEach(button => {
  button.addEventListener('click', () => {
    if (!imageLightbox || !imageLightboxImg) return;
    imageLightboxImg.src = button.querySelector('img')?.src || button.dataset.imageOpen;
    imageLightbox.classList.add('open');
    imageLightbox.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
  });
});

function closeImageLightbox(){
  if (!imageLightbox) return;
  imageLightbox.classList.remove('open');
  imageLightbox.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
}
imageLightboxClose?.addEventListener('click', closeImageLightbox);
imageLightbox?.addEventListener('click', event => {
  if (event.target === imageLightbox) closeImageLightbox();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeImageLightbox();
});
