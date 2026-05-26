const copyButton = document.querySelector("[data-copy-target]");
const playerCount = document.querySelector("#playerCount");
const countdown = document.querySelector("#eventCountdown");

copyButton?.addEventListener("click", async () => {
  const targetId = copyButton.dataset.copyTarget;
  const value = document.getElementById(targetId)?.textContent?.trim();

  if (!value) return;

  try {
    await navigator.clipboard.writeText(value);
    copyButton.textContent = "Kopierad";
    window.setTimeout(() => {
      copyButton.textContent = "Kopiera IP";
    }, 1800);
  } catch {
    copyButton.textContent = value;
  }
});

window.setInterval(() => {
  if (!playerCount) return;
  const base = 42;
  const wave = Math.round(Math.sin(Date.now() / 5000) * 5);
  playerCount.textContent = String(base + wave);
}, 2200);

function updateCountdown() {
  if (!countdown) return;

  const now = new Date();
  const nextFriday = new Date(now);
  let daysUntilFriday = (5 - now.getDay() + 7) % 7;

  if (daysUntilFriday === 0 && now.getHours() >= 19) {
    daysUntilFriday = 7;
  }

  nextFriday.setDate(now.getDate() + daysUntilFriday);
  nextFriday.setHours(19, 0, 0, 0);

  const totalMinutes = Math.max(0, Math.floor((nextFriday - now) / 60000));
  const days = Math.floor(totalMinutes / 1440);
  const hours = Math.floor((totalMinutes % 1440) / 60);
  const minutes = totalMinutes % 60;

  countdown.textContent = `${String(days).padStart(2, "0")}d ${String(hours).padStart(2, "0")}h ${String(minutes).padStart(2, "0")}m`;
}

updateCountdown();
window.setInterval(updateCountdown, 30000);
