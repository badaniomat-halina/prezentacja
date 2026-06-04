const presentation = document.querySelector("#presentation");
const panels = Array.from(document.querySelectorAll(".panel"));
const menuButtons = Array.from(document.querySelectorAll(".section-menu button"));
const teamImages = Array.from(document.querySelectorAll(".team-card img"));
const parallaxPanel = document.querySelector(".panel-b");
const parallaxLayer = document.querySelector(".team-content");
const carouselStage = document.querySelector(".world-carousel-stage");
const carouselDots = Array.from(document.querySelectorAll(".world-carousel-dots button"));
const stickyNotes = Array.from(document.querySelectorAll(".sticky-note"));
const timelineItems = Array.from(document.querySelectorAll(".timeline-item"));
const nextItems = Array.from(document.querySelectorAll(".next-list li"));
const nextImageBase = document.querySelector(".next-image-base");
const nextImageOverlay = document.querySelector(".next-image-overlay");
const howDeviceScene = document.querySelector(".how-device-scene");
const howAppScene = document.querySelector(".how-app-scene");
const howDeviceImage = document.querySelector(".how-device-image");
const howMockupImage = document.querySelector(".how-mockup-image");
const howFeatureList = document.querySelector(".how-feature-list");
const howFeatureItems = Array.from(document.querySelectorAll(".how-feature-list li"));
const howLeftSequences = Array.from(document.querySelectorAll(".how-side-left .how-sequence"));
const howRightSequences = Array.from(document.querySelectorAll(".how-side-right .how-sequence"));
const riskRadarCanvas = document.querySelector(".risk-radar-canvas");
const riskPanel = document.querySelector(".panel-i");
const riskButtons = Array.from(document.querySelectorAll(".risk-point"));
const riskDialogOverlay = document.querySelector(".risk-dialog-overlay");
const riskDialogImage = document.querySelector(".risk-dialog-image");
const riskDialogTitle = document.querySelector("#risk-dialog-title");
const riskDialogDescription = document.querySelector(".risk-dialog-description");
const riskDialogAction = document.querySelector(".risk-dialog-action");
const quickNav = document.querySelector(".quick-nav");
const quickNavButtons = {
  top: document.querySelector('[data-action="top"]'),
  up: document.querySelector('[data-action="up"]'),
  down: document.querySelector('[data-action="down"]'),
};

const transitionMs = Number.parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--transition-time")) || 720;
const initialHash = window.location.hash;
const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
const carouselSlides = [
  {
    title: "Długie kolejki",
    description: "Oczekiwanie tygodniami na konsultację, nawet gdy potrzeba pilnej oceny objawów.",
    image: "assets/carousel_a.png",
  },
  {
    title: "Krótki czas wizyty",
    description: "Wizyta trwa zazwyczaj 10-15 minut. Z powodu natłoku obowiązków i pracy z dokumentacją, rzeczywisty kontakt jest często krótszy.",
    image: "assets/carousel_b.png",
  },
  {
    title: "Przeciążeni specjaliści",
    description: "Niedobór lekarzy powoduje presję i zmęczenie personelu, co niekorzystnie przekłada się na jakość świadczonych usług.",
    image: "assets/carousel_c.png",
  },
  {
    title: "Rozproszona dokumentacja",
    description: "Historia leczenia pacjenta podzielona między segregatory a systemy informatyczne różnych placówek.",
    image: "assets/carousel_d.png",
  },
  {
    title: "Kontakt z innymi chorymi",
    description: "Przychodzisz z kaszlem, wychodzisz z gruźlicą.",
    image: "assets/carousel_e.png",
  },
  {
    title: "Dobry specjalista - tylko jak się dostać?",
    description: "Specjaliści z dobrą renomą szybko stają się oblegani, a najbliższe terminy potrafią być odległe o wiele tygodni lub miesięcy. Pacjent zostaje z dylematem - czekać miesiącami na polecanego specjalistę czy iść tam, gdzie akurat jest wolne miejsce?",
    image: "assets/carousel_f.png",
  },
  {
    title: "Lekarz też człowiek!",
    description: "Jakość spotkania zależy od wielu czynników: doświadczenia lekarza, jego zmęczenia, liczby pacjentów danego dnia i poziomu skupienia.",
    image: "assets/carousel_g.png",
  },
];
let viewportHeight = 0;
let currentIndex = 0;
let isAnimating = false;
let unlockTimer = 0;
let resizeFrame = 0;
let parallaxFrame = 0;
let carouselIndex = 0;
let carouselTimer = 0;
let carouselIsAnimating = false;
let carouselCurrentSlide = null;
let stickyBoardTimer = 0;
let nextTimer = 0;
let nextImageTimer = 0;
let nextIndex = 0;
let howTimer = 0;
let howRunId = 0;
let riskDialogOpen = false;
const stickyMoveMs = 1500;
const stickyPauseMs = 2000;
const stickyAnimationOrder = ["1a", "1b", "4a", "4b", "2a", "2b", "7a", "7b", "3a", "3b", "5a", "5b", "6a", "6b"];
const howSequenceDurationMs = 12000;
const howFadeMs = 520;
const howImageTransitionMs = 700;
const howFeatureStepMs = 200;
const howMockupDurationMs = 10000;
const howMockups = ["assets/mockup_a.png", "assets/mockup_b.png", "assets/mockup_c.png"];
const nextStepDurationMs = 5000;
const nextImageFadeMs = 1500;
const nextSteps = [
  { label: "pierwszy punkt w wybranej lokalizacji", image: "assets/next_step_a.png" },
  { label: "test w realnym środowisku", image: "assets/next_step_b.png" },
  { label: "zbieranie danych z pracy systemu", image: "assets/next_step_c.png" },
  { label: "szkolenia", image: "assets/next_step_d.png" },
  { label: "monitoring", image: "assets/next_step_e.png" },
  { label: "uzupełnianie materiałów", image: "assets/next_step_f.png" },
  { label: "dezynfekcja", image: "assets/next_step_g.png" },
  { label: "odbiór próbek", image: "assets/next_step_h.png" },
  { label: "reakcja na awarie", image: "assets/next_step_i.png" },
  { label: "wsparcie pacjenta", image: "assets/next_step_j.png" },
  { label: "nadzór lekarza dyżurującego", image: "assets/next_step_k.png" },
  { label: "rozwój oprogramowania", image: "assets/next_step_l.png" },
  { label: "AI learning loop", image: "assets/next_step_m.png" },
];
const timelineFinancials = {
  1: {
    reserve: "18.582 $",
    realized: "82%",
    realizedHeight: 76,
    total: "226.708 $",
    reserveHeight: 8,
    items: {
      "1.1": { total: "176.288 $", height: 72 },
      "1.2": { total: "27.480 $", height: 11 },
      "1.3": { total: "22.940 $", height: 9 },
    },
  },
  2: {
    reserve: "365.000 $",
    realized: "89%",
    realizedHeight: 67,
    total: "1.103.200 $",
    reserveHeight: 25,
    items: {
      "2.1": { total: "260.280 $", height: 18 },
      "2.2": { total: "43.230 $", height: 3 },
      "2.3": { total: "659.840 $", height: 45 },
      "2.4": { total: "139.850 $", height: 10 },
    },
  },
  3: {
    reserve: "3.300.000 $",
    realized: "96%",
    realizedHeight: 86,
    total: "27.158.810 $",
    reserveHeight: 11,
    items: {
      "3.1": { total: "159.630 $", height: 1 },
      "3.2": { total: "4.710.000 $", height: 15 },
      "3.3": { total: "71.440 $", height: 1 },
      "3.4": { total: "22.217.740 $", height: 72 },
    },
  },
  4: {
    reserve: "50.000 $",
    realized: "103%",
    realizedHeight: 101,
    total: "3.148.630 $",
    reserveHeight: 2,
    items: {
      "4.1": { total: "45.480 $", height: 1 },
      "4.2": { total: "54.600 $", height: 2 },
      "4.3": { total: "3.038.000 $", height: 94 },
      "4.4": { total: "10.550 $", height: 1 },
    },
  },
  5: {
    reserve: "5.050.000 $",
    realized: "107%",
    realizedHeight: 84,
    total: "18.840.940 $",
    reserveHeight: 20,
    items: {
      "5.1": { total: "23.540 $", height: 1 },
      "5.2": { total: "135.420 $", height: 1 },
      "5.3": { total: "13.920 $", height: 1 },
      "5.4": { total: "2.543.160 $", height: 11 },
      "5.5": { total: "39.400 $", height: 1 },
      "5.6": { total: "8.280 $", height: 1 },
      "5.7": { total: "16.077.220 $", height: 64 },
    },
  },
  6: {
    reserve: "3.110.000 $",
    realized: "78%",
    realizedHeight: 72,
    total: "37.316.620 $",
    reserveHeight: 8,
    items: {
      "6.1": { total: "6.029.260 $", height: 14 },
      "6.2": { total: "29.021.240 $", height: 70 },
      "6.3": { total: "15.060 $", height: 1 },
      "6.4": { total: "212.420 $", height: 1 },
      "6.5": { total: "10.620 $", height: 1 },
      "6.6": { total: "13.860 $", height: 1 },
      "6.7": { total: "2.014.160 $", height: 5 },
    },
  },
  7: {
    reserve: "25.000 $",
    realized: "65%",
    realizedHeight: 60,
    total: "286.510 $",
    reserveHeight: 8,
    items: {
      "7.1": { total: "115.400 $", height: 37 },
      "7.2": { total: "17.400 $", height: 6 },
      "7.3": { total: "22.660 $", height: 7 },
      "7.4": { total: "23.400 $", height: 8 },
      "7.5": { total: "107.650 $", height: 35 },
    },
  },
};
const riskDialogContent = {
  failures: {
    image: "assets/risk_a.png",
    label: "Awarie",
    title: "Awarie urządzeń i systemu IT",
    description: "E-przychodnia opiera się na aparaturze medycznej, systemie IT, aplikacji pacjenta i połączeniu z centralną infrastrukturą. Awaria któregokolwiek elementu może czasowo ograniczyć dostępność usługi lub przerwać wizytę.",
    action: "Każde stanowisko posiada system autodiagnostyki, monitoring pracy urządzeń i procedury awaryjne. Sieć e-przychodni nadzoruje zespół techniczny i IT, który reaguje na incydenty, prowadzi serwis oraz zdalnie monitoruje stan aparatury i systemów.",
  },
  diagnosis: {
    image: "assets/risk_b.png",
    label: "Błędna diagnoza",
    title: "Błędne diagnozy AI i nieprzewidziane zachowania agenta",
    description: "Model AI może otrzymać niepełne lub błędne informacje od pacjenta, a nietypowe objawy mogą zostać zinterpretowane nieprawidłowo. Szczególnie ryzykowne są przypadki graniczne, rzadkie choroby i sytuacje wymagające doświadczenia lekarza.",
    action: "HALina stosuje progi bezpieczeństwa, pytania kontrolne i mechanizmy wykrywania sygnałów alarmowych. W przypadkach niejednoznacznych system nie podejmuje samodzielnej decyzji, tylko kieruje pacjenta do lekarza lub oznacza sprawę jako wymagającą dodatkowej weryfikacji.",
  },
  data: {
    image: "assets/risk_c.png",
    label: "Wyciek danych",
    title: "Wyciek danych medycznych",
    description: "System przetwarza szczególnie wrażliwe dane: historię leczenia, wyniki badań, e-recepty, zalecenia i informacje o stanie zdrowia pacjenta. Ich wyciek mógłby naruszyć prywatność pacjentów i podważyć zaufanie do całego rozwiązania.",
    action: "Dane są zabezpieczane przez szyfrowanie, kontrolę dostępu, rejestrowanie operacji i regularne audyty bezpieczeństwa. Dostęp do informacji otrzymują wyłącznie uprawnione osoby i systemy, a całość jest projektowana zgodnie z wymaganiami RODO oraz standardami cyberbezpieczeństwa.",
  },
  adoption: {
    image: "assets/risk_d.png",
    label: "Lęk społeczny",
    title: "Niska adopcja społeczna",
    description: "Część pacjentów może obawiać się kontaktu z e-lekarzem, braku człowieka po drugiej stronie lub zbyt dużej automatyzacji procesu leczenia. Szczególnie osoby starsze mogą potrzebować większego poczucia bezpieczeństwa i prostszej obsługi.",
    action: "Interfejs HALiny prowadzi pacjenta prostym językiem, krok po kroku i z empatyczną komunikacją. W testach zauważyliśmy jednak, że część osób może potrzebować wsparcia przy obsłudze aparatury, dlatego planujemy usługę asystenta medycznego na żądanie - osoby, która dojedzie do punktu i pomoże pacjentowi bezpiecznie przejść przez badania.",
  },
  law: {
    image: "assets/risk_e.png",
    label: "Prawo",
    title: "Niestabilne prawo, niepewna certyfikacja",
    description: "Prawo dotyczące AI w medycynie, odpowiedzialności algorytmów i klasyfikacji wyrobów medycznych nadal się rozwija. Zmiany regulacyjne mogą wpływać na sposób wdrażania, certyfikacji i użytkowania e-przychodni.",
    action: "Projekt HALina przeszedł już proces certyfikacji, dzięki czemu jedno z kluczowych ryzyk wejścia na rynek zostało zażegnane. Pozostaje jednak ryzyko zmian w przepisach dotyczących AI w medycynie, ochrony danych i odpowiedzialności za decyzje systemów algorytmicznych. Dlatego nad projektem czuwa zespół prawny, regulacyjny i jakościowy, który monitoruje zmiany w prawie, aktualizuje procedury oraz dba o zgodność procedur z przepisami prawa.",
  },
  liability: {
    image: "assets/risk_f.png",
    label: "Odszkodowania",
    title: "Odszkodowania i odpowiedzialność za decyzje medyczne",
    description: "W przypadku błędnej kwalifikacji, błędnej diagnozy lub nieprawidłowego zalecenia może pojawić się odpowiedzialność prawna i roszczenia pacjentów. Szczególnie istotne jest jasne określenie, gdzie kończy się wsparcie AI, a gdzie zaczyna decyzja lekarza.",
    action: "HALina działa jako system wspierający i kwalifikujący, a przypadki złożone, alarmowe lub niejednoznaczne są przekazywane do lekarza. Każda decyzja systemu jest dokumentowana, możliwa do audytu i oparta na jasno opisanych procedurach bezpieczeństwa.",
  },
  vandalism: {
    image: "assets/risk_g.png",
    label: "Wandalizm",
    title: "Wandalizm i uszkodzenie stanowiska",
    description: "E-przychodnie działające w wielu lokalizacjach mogą być narażone na uszkodzenia sprzętu, kradzieże elementów wyposażenia, próby manipulacji aparaturą lub niewłaściwe korzystanie ze stanowiska.",
    action: "Stanowiska są projektowane jako zamknięte, monitorowane i odporne na nieuprawnioną ingerencję. Kluczowe elementy aparatury są zabezpieczone, a sieć punktów obsługuje zespół techniczny odpowiedzialny za przeglądy, serwis, naprawy i reakcję na incydenty.",
  },
};

if (initialHash) {
  history.replaceState(null, "", window.location.pathname + window.location.search);
}

function updateViewportHeight() {
  viewportHeight = window.visualViewport?.height || window.innerHeight;
  document.documentElement.style.setProperty("--viewport-height", `${viewportHeight}px`);
}

function drawRiskRadar() {
  if (!riskRadarCanvas) {
    return;
  }

  const rect = riskRadarCanvas.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  const width = Math.max(1, Math.round(rect.width));
  const height = Math.max(1, Math.round(rect.height));
  const centerX = width / 2;
  const centerY = height / 2;
  const gridStep = 100;
  const ringStep = 200;
  const maxRing = 1600;

  riskRadarCanvas.width = Math.round(width * dpr);
  riskRadarCanvas.height = Math.round(height * dpr);

  const context = riskRadarCanvas.getContext("2d");
  context.setTransform(dpr, 0, 0, dpr, 0, 0);
  context.clearRect(0, 0, width, height);
  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, width, height);

  context.lineWidth = 2;
  context.strokeStyle = "rgba(130, 142, 148, 0.34)";

  context.beginPath();
  for (let x = centerX; x <= width + gridStep; x += gridStep) {
    context.moveTo(x, 0);
    context.lineTo(x, height);
  }
  for (let x = centerX - gridStep; x >= -gridStep; x -= gridStep) {
    context.moveTo(x, 0);
    context.lineTo(x, height);
  }
  for (let y = centerY; y <= height + gridStep; y += gridStep) {
    context.moveTo(0, y);
    context.lineTo(width, y);
  }
  for (let y = centerY - gridStep; y >= -gridStep; y -= gridStep) {
    context.moveTo(0, y);
    context.lineTo(width, y);
  }
  context.stroke();

  context.beginPath();
  for (let radius = ringStep; radius <= maxRing; radius += ringStep) {
    context.moveTo(centerX + radius, centerY);
    context.arc(centerX, centerY, radius, 0, Math.PI * 2);
  }
  context.stroke();

  context.beginPath();
  context.fillStyle = "rgba(93, 112, 120, 0.74)";
  context.arc(centerX, centerY, 5, 0, Math.PI * 2);
  context.fill();
}

function setPanelPosition() {
  presentation.style.transform = `translate3d(0, -${currentIndex * viewportHeight}px, 0)`;
  window.scrollTo(0, 0);
}

function updateHash() {
  history.replaceState(null, "", `#${panels[currentIndex].id}`);
}

function updateInterface() {
  quickNavButtons.top.disabled = currentIndex === 0 || isAnimating || riskDialogOpen;
  quickNavButtons.up.disabled = currentIndex === 0 || isAnimating || riskDialogOpen;
  quickNavButtons.down.disabled = currentIndex === panels.length - 1 || isAnimating || riskDialogOpen;
  quickNav?.classList.toggle("is-risk-locked", riskDialogOpen);

  menuButtons.forEach((button, index) => {
    button.setAttribute("aria-current", String(index === currentIndex));
  });
}

function unlockNavigation() {
  window.clearTimeout(unlockTimer);
  isAnimating = false;
  updateInterface();
}

function moveTo(index) {
  if (riskDialogOpen) {
    return;
  }

  const targetIndex = Math.max(0, Math.min(index, panels.length - 1));

  if (targetIndex === currentIndex || isAnimating) {
    return;
  }

  const previousIndex = currentIndex;
  currentIndex = targetIndex;
  isAnimating = true;
  updateInterface();

  setPanelPosition();
  updateHash();
  handleCarouselSectionChange(previousIndex);
  handleStickyBoardSectionChange(previousIndex);
  handleNextSectionChange(previousIndex);
  handleHowSectionChange(previousIndex);

  unlockTimer = window.setTimeout(unlockNavigation, transitionMs + 80);
}

function moveBy(direction) {
  moveTo(currentIndex + direction);
}

presentation.addEventListener("transitionend", (event) => {
  if (event.target === presentation && event.propertyName === "transform") {
    unlockNavigation();
  }
});

window.addEventListener(
  "wheel",
  (event) => {
    event.preventDefault();

    if (riskDialogOpen || isAnimating || Math.abs(event.deltaY) < 10) {
      return;
    }

    moveBy(event.deltaY > 0 ? 1 : -1);
  },
  { passive: false }
);

window.addEventListener("keydown", (event) => {
  const isEditable = event.target.matches("input, textarea, select, [contenteditable='true']");

  if (isEditable || isAnimating) {
    return;
  }

  if (riskDialogOpen) {
    if (event.key === "Escape" || event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
    }

    if (event.key === "Escape") {
      closeRiskDialog();
    }

    return;
  }

  if (event.key === "ArrowDown") {
    event.preventDefault();
    moveBy(1);
  }

  if (event.key === "ArrowUp") {
    event.preventDefault();
    moveBy(-1);
  }
});

menuButtons.forEach((button) => {
  button.addEventListener("click", () => {
    moveTo(Number(button.dataset.target));
  });
});

quickNavButtons.top.addEventListener("click", () => moveTo(0));
quickNavButtons.up.addEventListener("click", () => moveBy(-1));
quickNavButtons.down.addEventListener("click", () => moveBy(1));

function setRiskDialogContent(riskId) {
  const content = riskDialogContent[riskId];

  if (!content || !riskDialogImage || !riskDialogTitle || !riskDialogDescription || !riskDialogAction) {
    return false;
  }

  riskDialogImage.src = content.image;
  riskDialogImage.alt = content.label;
  riskDialogTitle.textContent = content.title;
  riskDialogDescription.textContent = content.description;
  riskDialogAction.textContent = content.action;
  return true;
}

function openRiskDialog(riskId) {
  if (!riskPanel || !riskDialogOverlay) {
    return;
  }

  if (!setRiskDialogContent(riskId)) {
    return;
  }

  riskDialogOpen = true;
  riskPanel.classList.add("has-risk-dialog");
  riskDialogOverlay.hidden = false;
  updateInterface();
}

function closeRiskDialog() {
  if (!riskPanel || !riskDialogOverlay) {
    return;
  }

  riskDialogOpen = false;
  riskPanel.classList.remove("has-risk-dialog");
  riskDialogOverlay.hidden = true;
  updateInterface();
}

riskButtons.forEach((button) => {
  button.addEventListener("click", () => {
    openRiskDialog(button.dataset.risk);
  });
});

riskDialogOverlay?.addEventListener("click", closeRiskDialog);

teamImages.forEach((image) => {
  function markMissingImage() {
    image.alt = "";
    image.classList.add("is-missing");
    image.closest(".team-portrait")?.classList.add("is-empty");
  }

  image.addEventListener("error", markMissingImage, { once: true });

  if (image.complete && image.naturalWidth === 0) {
    markMissingImage();
  }
});

function setTeamParallax(clientX, clientY) {
  if (!parallaxPanel || !parallaxLayer || reduceMotionQuery.matches) {
    return;
  }

  window.cancelAnimationFrame(parallaxFrame);

  parallaxFrame = window.requestAnimationFrame(() => {
    const rect = parallaxPanel.getBoundingClientRect();
    const x = (clientX - rect.left - rect.width / 2) / rect.width;
    const y = (clientY - rect.top - rect.height / 2) / rect.height;

    parallaxPanel.style.setProperty("--bg-shift-x", `${x * -18}px`);
    parallaxPanel.style.setProperty("--bg-shift-y", `${y * -12}px`);
    parallaxLayer.style.setProperty("--team-float-x", `${x * 8}px`);
    parallaxLayer.style.setProperty("--team-float-y", `${y * 5}px`);
  });
}

function resetTeamParallax() {
  if (!parallaxPanel || !parallaxLayer) {
    return;
  }

  window.cancelAnimationFrame(parallaxFrame);
  parallaxPanel.style.setProperty("--bg-shift-x", "0px");
  parallaxPanel.style.setProperty("--bg-shift-y", "0px");
  parallaxLayer.style.setProperty("--team-float-x", "0px");
  parallaxLayer.style.setProperty("--team-float-y", "0px");
}

if (parallaxPanel && parallaxLayer) {
  parallaxPanel.addEventListener("pointermove", (event) => {
    if (event.pointerType === "mouse") {
      setTeamParallax(event.clientX, event.clientY);
    }
  });

  parallaxPanel.addEventListener("pointerleave", resetTeamParallax);
  reduceMotionQuery.addEventListener("change", resetTeamParallax);
}

function initializeTimelineMetrics() {
  const costColors = [
    ["#00b8d9", "#45dcf0"],
    ["#0fc2a8", "#55ead7"],
    ["#198fe3", "#63bbff"],
    ["#14b8b2", "#63e2dc"],
    ["#00a6cf", "#50d8f2"],
    ["#1bbf93", "#65e8c5"],
    ["#2878d8", "#73a9ff"],
  ];

  timelineItems.forEach((item, itemIndex) => {
    const metrics = item.querySelector(".timeline-metrics");
    const descriptions = Array.from(item.querySelectorAll("li[id$='-descr']"));

    if (!metrics || descriptions.length === 0) {
      return;
    }

    const metricsInner = document.createElement("div");
    const chartArea = document.createElement("div");
    const costBar = document.createElement("div");
    const topBlock = document.createElement("span");
    const greenMetric = document.createElement("div");
    const greenValue = document.createElement("span");
    const greenBar = document.createElement("div");
    const chartBase = document.createElement("div");
    const moneyValues = document.createElement("div");
    const totalValue = document.createElement("span");
    const reserveValue = document.createElement("span");
    const stageNumber = itemIndex + 1;
    const financials = timelineFinancials[stageNumber];

    metricsInner.className = "timeline-metrics-inner";
    chartArea.className = "timeline-chart-area";
    costBar.className = "timeline-cost-bar";
    topBlock.className = "timeline-cost-top";
    greenMetric.className = "timeline-green-metric";
    greenValue.className = "timeline-green-value";
    greenBar.className = "timeline-green-bar";
    chartBase.className = "timeline-chart-base";
    moneyValues.className = "timeline-money-values";
    totalValue.id = `${stageNumber}-total`;
    reserveValue.id = `${stageNumber}-reserve`;
    greenValue.textContent = financials?.realized || "0%";
    totalValue.textContent = financials?.total || "0 $";
    reserveValue.textContent = financials?.reserve || "0 $";
    greenMetric.style.setProperty("--realized-height", `${financials?.realizedHeight || 0}%`);

    topBlock.style.flex = `${financials?.reserveHeight || 0} 0 0`;
    costBar.append(topBlock);
    greenMetric.append(greenValue, greenBar);

    descriptions.forEach((description, index) => {
      const costBlock = document.createElement("span");
      const [color, activeColor] = costColors[index % costColors.length];
      const itemId = description.id.replace("-descr", "");
      const itemFinancials = financials?.items[itemId];

      costBlock.id = description.id.replace("-descr", "-cost");
      costBlock.className = "timeline-cost-block";
      costBlock.style.flex = `${itemFinancials?.height || 1} 0 0`;
      costBlock.style.setProperty("--cost-color", color);
      costBlock.style.setProperty("--cost-active", activeColor);
      costBar.append(costBlock);

      description.addEventListener("mouseenter", () => {
        costBlock.classList.add("is-highlighted");
        totalValue.textContent = itemFinancials?.total || financials?.total || totalValue.textContent;
      });

      description.addEventListener("mouseleave", () => {
        costBlock.classList.remove("is-highlighted");
        totalValue.textContent = financials?.total || totalValue.textContent;
      });
    });

    chartArea.append(costBar, greenMetric);
    moneyValues.append(totalValue, reserveValue);
    metricsInner.append(chartArea, chartBase, moneyValues);
    metrics.replaceChildren(metricsInner);
  });
}

function updateCarouselDots() {
  carouselDots.forEach((button, index) => {
    button.classList.toggle("is-active", index === carouselIndex);
    button.setAttribute("aria-current", String(index === carouselIndex));
  });
}

function createCarouselSlide(index) {
  const slide = carouselSlides[index];
  const slideElement = document.createElement("article");
  const imageWrap = document.createElement("div");
  const image = document.createElement("img");
  const copy = document.createElement("div");
  const title = document.createElement("h3");
  const description = document.createElement("p");

  slideElement.className = "world-slide";
  imageWrap.className = "world-slide-visual";
  image.src = slide.image;
  image.alt = slide.title;
  copy.className = "world-slide-copy";
  title.textContent = slide.title;
  description.textContent = slide.description;

  image.addEventListener(
    "error",
    () => {
      image.remove();
      imageWrap.classList.add("is-empty");
    },
    { once: true }
  );

  imageWrap.append(image);
  copy.append(title, description);
  slideElement.append(imageWrap, copy);

  return slideElement;
}

function startCarouselTimer() {
  window.clearTimeout(carouselTimer);

  if (!carouselStage || reduceMotionQuery.matches || !isCarouselSectionActive()) {
    return;
  }

  carouselTimer = window.setTimeout(() => {
    showCarouselSlide((carouselIndex + 1) % carouselSlides.length, "next");
  }, 15000);
}

function stopCarouselTimer() {
  window.clearTimeout(carouselTimer);
}

function isCarouselSectionActive() {
  return panels[currentIndex]?.id === "section-c";
}

function resetCarouselToStart(shouldStartTimer = false) {
  if (!carouselStage || carouselSlides.length === 0) {
    return;
  }

  stopCarouselTimer();
  carouselIsAnimating = false;
  carouselIndex = 0;
  carouselStage.replaceChildren();
  carouselCurrentSlide = createCarouselSlide(carouselIndex);
  carouselCurrentSlide.classList.add("is-current");
  carouselStage.append(carouselCurrentSlide);
  updateCarouselDots();

  if (shouldStartTimer) {
    startCarouselTimer();
  }
}

function handleCarouselSectionChange(previousIndex) {
  const wasCarouselSection = panels[previousIndex]?.id === "section-c";

  if (isCarouselSectionActive() && !wasCarouselSection) {
    resetCarouselToStart(true);
    return;
  }

  if (!isCarouselSectionActive() && wasCarouselSection) {
    stopCarouselTimer();
  }
}

function finishCarouselTransition(outgoingSlide, incomingSlide) {
  outgoingSlide?.remove();
  incomingSlide.classList.remove("enter-from-next", "enter-from-prev");
  carouselCurrentSlide = incomingSlide;
  carouselIsAnimating = false;
  updateCarouselDots();
  startCarouselTimer();
}

function showCarouselSlide(targetIndex, forcedDirection) {
  if (!carouselStage || carouselIsAnimating || targetIndex === carouselIndex) {
    return;
  }

  const direction = forcedDirection || (targetIndex > carouselIndex ? "next" : "prev");
  const outgoingSlide = carouselCurrentSlide;
  const incomingSlide = createCarouselSlide(targetIndex);
  const incomingClass = direction === "next" ? "enter-from-next" : "enter-from-prev";
  const outgoingClass = direction === "next" ? "leave-to-prev" : "leave-to-next";
  const transitionDuration = reduceMotionQuery.matches ? 1 : 2000;

  carouselIsAnimating = true;
  window.clearTimeout(carouselTimer);
  carouselIndex = targetIndex;
  updateCarouselDots();

  incomingSlide.classList.add(incomingClass);
  carouselStage.append(incomingSlide);
  incomingSlide.getBoundingClientRect();

  window.requestAnimationFrame(() => {
    outgoingSlide?.classList.add(outgoingClass);
    outgoingSlide?.classList.remove("is-current");
    incomingSlide.classList.add("is-current");
    incomingSlide.classList.remove(incomingClass);
  });

  const fallbackTimer = window.setTimeout(() => {
    finishCarouselTransition(outgoingSlide, incomingSlide);
  }, transitionDuration + 120);

  incomingSlide.addEventListener(
    "transitionend",
    (event) => {
      if (event.propertyName === "transform") {
        window.clearTimeout(fallbackTimer);
        finishCarouselTransition(outgoingSlide, incomingSlide);
      }
    },
    { once: true }
  );
}

function initializeCarousel() {
  if (!carouselStage || carouselSlides.length === 0) {
    return;
  }

  resetCarouselToStart(isCarouselSectionActive());

  carouselDots.forEach((button) => {
    button.addEventListener("click", () => {
      const targetIndex = Number(button.dataset.carouselTarget);
      showCarouselSlide(targetIndex);
    });
  });
}

function isStickyBoardSectionActive() {
  return panels[currentIndex]?.id === "section-d";
}

function stopStickyBoardAnimation() {
  window.clearTimeout(stickyBoardTimer);
}

function resetStickyBoard() {
  stopStickyBoardAnimation();
  stickyNotes.forEach((note) => {
    note.classList.remove("is-arranged");
  });
}

function getOrderedStickyNotes() {
  return stickyAnimationOrder
    .map((noteId) => stickyNotes.find((note) => `${note.dataset.pair}${note.dataset.note}` === noteId))
    .filter(Boolean);
}

function startStickyBoardAnimation() {
  if (stickyNotes.length === 0) {
    return;
  }

  resetStickyBoard();

  const animationQueue = getOrderedStickyNotes();
  let noteIndex = 0;

  function moveNextNote() {
    const note = animationQueue[noteIndex];

    if (!note) {
      return;
    }

    note.classList.add("is-arranged");
    noteIndex += 1;

    stickyBoardTimer = window.setTimeout(() => {
      if (noteIndex < animationQueue.length) {
        stickyBoardTimer = window.setTimeout(moveNextNote, stickyPauseMs);
      }
    }, stickyMoveMs);
  }

  moveNextNote();
}

function handleStickyBoardSectionChange(previousIndex) {
  const wasStickyBoardSection = panels[previousIndex]?.id === "section-d";

  if (isStickyBoardSectionActive() && !wasStickyBoardSection) {
    startStickyBoardAnimation();
    return;
  }

  if (!isStickyBoardSectionActive() && wasStickyBoardSection) {
    resetStickyBoard();
  }
}

function initializeStickyBoard() {
  if (isStickyBoardSectionActive()) {
    startStickyBoardAnimation();
  }
}

function isNextSectionActive() {
  return panels[currentIndex]?.id === "section-h";
}

function wrapNextItemLetters() {
  nextItems.forEach((item) => {
    const text = item.textContent.trim();
    item.textContent = "";

    Array.from(text).forEach((character, index) => {
      const letter = document.createElement("span");
      letter.className = "next-letter";
      letter.style.setProperty("--letter-index", index);
      letter.textContent = character === " " ? "\u00a0" : character;
      item.append(letter);
    });
  });
}

function setNextImage(index, shouldFade = true) {
  const step = nextSteps[index];

  if (!step || !nextImageBase || !nextImageOverlay) {
    return;
  }

  window.clearTimeout(nextImageTimer);

  if (!shouldFade) {
    nextImageOverlay.classList.remove("is-visible");
    nextImageBase.src = step.image;
    nextImageBase.alt = step.label;
    nextImageOverlay.src = step.image;
    return;
  }

  nextImageOverlay.classList.remove("is-visible");
  nextImageOverlay.src = step.image;
  nextImageOverlay.alt = "";
  nextImageOverlay.getBoundingClientRect();
  nextImageOverlay.classList.add("is-visible");

  nextImageTimer = window.setTimeout(() => {
    nextImageBase.src = step.image;
    nextImageBase.alt = step.label;
    nextImageOverlay.classList.remove("is-visible");
  }, nextImageFadeMs);
}

function setNextStep(index, shouldFade = true) {
  if (nextSteps.length === 0) {
    return;
  }

  nextIndex = index % nextSteps.length;

  nextItems.forEach((item, itemIndex) => {
    item.classList.toggle("is-active", itemIndex === nextIndex);
  });

  setNextImage(nextIndex, shouldFade);
}

function stopNextAnimation() {
  window.clearTimeout(nextTimer);
  window.clearTimeout(nextImageTimer);
}

function resetNextAnimation() {
  stopNextAnimation();
  nextItems.forEach((item) => item.classList.remove("is-active"));
  setNextImage(0, false);
  nextIndex = 0;
}

function scheduleNextStep() {
  window.clearTimeout(nextTimer);

  if (!isNextSectionActive() || reduceMotionQuery.matches) {
    return;
  }

  nextTimer = window.setTimeout(() => {
    setNextStep((nextIndex + 1) % nextSteps.length, true);
    scheduleNextStep();
  }, nextStepDurationMs);
}

function startNextAnimation() {
  resetNextAnimation();

  window.requestAnimationFrame(() => {
    setNextStep(0, false);
    scheduleNextStep();
  });
}

function handleNextSectionChange(previousIndex) {
  const wasNextSection = panels[previousIndex]?.id === "section-h";

  if (isNextSectionActive() && !wasNextSection) {
    startNextAnimation();
    return;
  }

  if (!isNextSectionActive() && wasNextSection) {
    resetNextAnimation();
  }
}

function initializeNextSection() {
  wrapNextItemLetters();

  if (isNextSectionActive()) {
    startNextAnimation();
    return;
  }

  resetNextAnimation();
}

function isHowSectionActive() {
  return panels[currentIndex]?.id === "section-e";
}

function stopHowAnimation() {
  window.clearTimeout(howTimer);
  howRunId += 1;
}

function setHowSequence(index) {
  [...howLeftSequences, ...howRightSequences].forEach((sequence) => {
    const isActive = Number(sequence.dataset.sequence) === index;
    sequence.classList.toggle("is-active", isActive);
    sequence.classList.remove("is-leaving");
  });
}

function clearHowSequences() {
  [...howLeftSequences, ...howRightSequences].forEach((sequence) => {
    sequence.classList.remove("is-active", "is-leaving");
  });
}

function hideHowSequence(index) {
  [...howLeftSequences, ...howRightSequences].forEach((sequence) => {
    if (Number(sequence.dataset.sequence) === index) {
      sequence.classList.add("is-leaving");
      sequence.classList.remove("is-active");
    }
  });
}

function resetHowAnimation() {
  stopHowAnimation();
  howDeviceScene?.classList.remove("is-active");
  howAppScene?.classList.remove("is-active");
  howDeviceImage?.classList.remove("is-visible", "is-exiting");
  howMockupImage?.classList.remove("is-visible", "is-exiting");
  howFeatureList?.classList.remove("is-visible", "is-hiding");
  howFeatureList?.setAttribute("aria-hidden", "true");
  howAppScene?.setAttribute("aria-hidden", "true");
  howMockupImage?.setAttribute("src", howMockups[0]);
  clearHowSequences();
}

function scheduleHow(runId, delay, callback) {
  howTimer = window.setTimeout(() => {
    if (runId === howRunId && isHowSectionActive()) {
      callback();
    }
  }, delay);
}

function runHowTextSequence(runId, index = 0) {
  if (index >= howLeftSequences.length) {
    clearHowSequences();
    showHowAppScene(runId);
    return;
  }

  setHowSequence(index);

  scheduleHow(runId, Math.max(0, howSequenceDurationMs - howFadeMs), () => {
    hideHowSequence(index);

    scheduleHow(runId, howFadeMs, () => {
      runHowTextSequence(runId, index + 1);
    });
  });
}

function showHowAppScene(runId) {
  howDeviceImage?.classList.add("is-exiting");
  howDeviceImage?.classList.remove("is-visible");
  howAppScene?.classList.add("is-active");
  howAppScene?.setAttribute("aria-hidden", "false");
  howMockupImage?.setAttribute("src", howMockups[0]);
  howMockupImage?.classList.remove("is-exiting");

  scheduleHow(runId, 40, () => {
    howMockupImage?.classList.add("is-visible");
  });

  scheduleHow(runId, howImageTransitionMs, () => {
    howFeatureList?.classList.remove("is-hiding");
    howFeatureList?.classList.add("is-visible");
    howFeatureList?.setAttribute("aria-hidden", "false");
    runHowMockupSequence(runId, 0);
  });
}

function changeHowMockup(runId, nextIndex) {
  howMockupImage?.classList.add("is-exiting");
  howMockupImage?.classList.remove("is-visible");

  scheduleHow(runId, howImageTransitionMs, () => {
    howMockupImage?.setAttribute("src", howMockups[nextIndex]);
    howMockupImage?.classList.remove("is-exiting");

    scheduleHow(runId, 40, () => {
      howMockupImage?.classList.add("is-visible");
      runHowMockupSequence(runId, nextIndex);
    });
  });
}

function finishHowCycle(runId) {
  howMockupImage?.classList.add("is-exiting");
  howMockupImage?.classList.remove("is-visible");
  howFeatureList?.classList.add("is-hiding");
  howFeatureList?.classList.remove("is-visible");

  const featureExitMs = howFeatureItems.length * howFeatureStepMs + 480;

  scheduleHow(runId, Math.max(howImageTransitionMs, featureExitMs), () => {
    if (runId !== howRunId || !isHowSectionActive()) {
      return;
    }

    startHowAnimation();
  });
}

function runHowMockupSequence(runId, index) {
  scheduleHow(runId, howMockupDurationMs, () => {
    if (index < howMockups.length - 1) {
      changeHowMockup(runId, index + 1);
      return;
    }

    finishHowCycle(runId);
  });
}

function startHowAnimation() {
  if (!howDeviceScene || !howDeviceImage || reduceMotionQuery.matches) {
    return;
  }

  resetHowAnimation();
  const runId = howRunId;

  howDeviceScene.classList.add("is-active");

  scheduleHow(runId, 40, () => {
    howDeviceImage.classList.add("is-visible");
  });

  scheduleHow(runId, 540, () => {
    runHowTextSequence(runId, 0);
  });
}

function handleHowSectionChange(previousIndex) {
  const wasHowSection = panels[previousIndex]?.id === "section-e";

  if (isHowSectionActive() && !wasHowSection) {
    startHowAnimation();
    return;
  }

  if (!isHowSectionActive() && wasHowSection) {
    resetHowAnimation();
  }
}

function initializeHowSection() {
  howFeatureItems.forEach((item, index) => {
    item.style.setProperty("--feature-index", index);
  });

  if (isHowSectionActive()) {
    startHowAnimation();
  }
}

window.addEventListener("resize", () => {
  window.cancelAnimationFrame(resizeFrame);
  updateViewportHeight();
  drawRiskRadar();
  presentation.classList.add("no-transition");
  presentation.getBoundingClientRect();
  setPanelPosition();
  presentation.getBoundingClientRect();

  if (isAnimating) {
    unlockNavigation();
  }

  resizeFrame = window.requestAnimationFrame(() => {
    resizeFrame = window.requestAnimationFrame(() => {
      presentation.classList.remove("no-transition");
    });
  });
});

window.addEventListener("load", () => {
  window.scrollTo(0, 0);
  setPanelPosition();
});

function initializeFromHash() {
  const hashIndex = panels.findIndex((panel) => `#${panel.id}` === initialHash);

  if (hashIndex > -1) {
    currentIndex = hashIndex;
    presentation.classList.add("no-transition");
    setPanelPosition();
    updateHash();
    window.requestAnimationFrame(() => {
      window.scrollTo(0, 0);
      setPanelPosition();
      window.requestAnimationFrame(() => {
        window.scrollTo(0, 0);
        setPanelPosition();
        presentation.classList.remove("no-transition");
      });
    });
  }

  updateInterface();
}

updateViewportHeight();
drawRiskRadar();
initializeFromHash();
initializeTimelineMetrics();
initializeCarousel();
initializeStickyBoard();
initializeNextSection();
initializeHowSection();
