/* Confirmed 239-only alternate photos. No external staff assets are referenced. */
window.get239HoverImages = function (person) {
  const key = String(person?.name || "").toLowerCase().replace(/\s+\d.*$/, "").trim();
  const sets = {
    anna: ["images/anna.jpg", "images/3.1.jpg", "images/1.jpg"],
    regina: ["images/regina.jpg", "images/1.1.jpg", "images/6.jpg"],
    linda: ["images/8.1.jpg", "images/4.jpg"],
    venessa: ["images/venessa.jpg", "images/5.1.jpg"],
    sasa: ["images/sasa.jpg", "images/5.jpg"],
    aya: ["images/4.1 2.jpg", "images/4.1.jpg"]
  };
  const original = person?.image || "";
  return (sets[key] || []).filter(src => src && src !== original).slice(0, 4);
};
