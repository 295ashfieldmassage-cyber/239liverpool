(() => {
  const key = "239-age-confirmed";
  if (sessionStorage.getItem(key) === "yes") return;

  const gate = document.createElement("div");
  gate.className = "age-gate";
  gate.setAttribute("role", "dialog");
  gate.setAttribute("aria-modal", "true");
  gate.setAttribute("aria-labelledby", "age-gate-title");
  gate.innerHTML = `
    <div class="age-gate-card">
      <span class="age-gate-mark">239</span>
      <p class="age-gate-eyebrow">ADULTS ONLY · 仅限成人</p>
      <h1 id="age-gate-title">Are you 18 or older?</h1>
      <p>You must be at least 18 years old to enter this website.<br>您必须年满 18 岁才能进入本网站。</p>
      <div class="age-gate-actions">
        <button class="age-gate-enter" type="button">Yes, enter site · 已满 18 岁</button>
        <a class="age-gate-leave" href="https://www.google.com/">No, leave · 未满 18 岁</a>
      </div>
    </div>`;
  document.body.append(gate);
  document.documentElement.classList.add("age-gate-open");
  gate.querySelector("button").focus();
  gate.querySelector("button").addEventListener("click", () => {
    sessionStorage.setItem(key, "yes");
    gate.remove();
    document.documentElement.classList.remove("age-gate-open");
  });
})();
