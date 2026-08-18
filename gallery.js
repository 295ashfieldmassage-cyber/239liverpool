const detailValue = value => value || "Please enquire";
const labelledFacts = person => [
  `Nationality: ${detailValue(person.nationality || person.hours)}`,
  `Height: ${detailValue(person.height)}`,
  `Weight: ${detailValue(person.weight)}`,
  `Bra cup: ${detailValue(person.cup)}`
];

/* The studio can update this profile in roster-config.js. */
const featuredSpaProfile = window.FEATURED_SPA_PROFILE;

const galleryRoot = document.querySelector("#all-girls-gallery");
if (galleryRoot) {
  const people = [featuredSpaProfile, ...getCompleteTeamData()].filter(Boolean);
  galleryRoot.innerHTML = people.map(person => {
    const facts = labelledFacts(person);
    return `<article class="gallery-person" tabindex="0">
      <div class="therapist-image hover-gallery" data-hover-images='${JSON.stringify(getHoverImages(person))}'>
        <img src="${person.image}" data-original-src="${person.image}" alt="${person.name}" loading="lazy">
        <div class="gallery-profile-overlay">
          <h3>${person.name}</h3>
          ${person.description ? `<p>${person.description}</p>` : ""}
          <div>${facts.map(fact => `<span>${fact}</span>`).join("")}</div>
        </div>
      </div>
      <div class="therapist-info"><h3>${person.name}</h3><p>${detailValue(person.nationality || person.hours)}</p></div>
    </article>`;
  }).join("");
  initialiseHoverGalleries(galleryRoot);
}
