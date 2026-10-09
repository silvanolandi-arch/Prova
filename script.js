// ===== Contenuti del sito: modifica qui testi, competenze e progetti =====

const SKILLS = [
  { it: "Budget e forecast", en: "Budgeting & forecasting" },
  { it: "Analisi degli scostamenti", en: "Variance analysis" },
  { it: "Contabilità analitica", en: "Cost accounting" },
  { it: "Reporting direzionale", en: "Management reporting" },
  { it: "KPI e cruscotti", en: "KPIs & dashboards" },
  { it: "Analisi di marginalità", en: "Margin analysis" },
  { it: "Excel avanzato", en: "Advanced Excel" },
  { it: "Power BI", en: "Power BI" }
];

const PROJECTS = [
  {
    title: { it: "Budget e forecast", en: "Budgeting & forecasting" },
    desc: {
      it: "Costruisco il budget annuale con le funzioni aziendali e lo aggiorno con forecast periodici, così la direzione sa sempre dove l'anno sta andando a chiudere.",
      en: "I build the annual budget together with each department and update it with regular forecasts, so management always knows where the year is heading."
    },
    tags: ["Budget", "Forecast", "Pianificazione"]
  },
  {
    title: { it: "Reporting e KPI", en: "Reporting & KPIs" },
    desc: {
      it: "Preparo il reporting mensile per la direzione: conto economico gestionale, indicatori chiave e analisi degli scostamenti rispetto a budget e anno precedente.",
      en: "I prepare monthly reporting for management: management P&L, key indicators and variance analysis against budget and prior year."
    },
    tags: ["Report", "KPI", "Dashboard"]
  },
  {
    title: { it: "Analisi di costi e margini", en: "Cost & margin analysis" },
    desc: {
      it: "Analizzo costi e marginalità per prodotto, cliente e centro di costo, per capire dove l'azienda crea valore e dove intervenire.",
      en: "I analyse costs and margins by product, customer and cost centre to show where the company creates value and where to act."
    },
    tags: ["Costi", "Margini", "Centri di costo"]
  }
];

const I18N = {
  it: {
    "nav.about": "Chi sono",
    "nav.skills": "Competenze",
    "nav.projects": "Cosa faccio",
    "nav.contact": "Contatti",
    "hero.eyebrow": "Controller · Controllo di gestione",
    "hero.lead": "Trasformo i numeri dell'azienda in informazioni utili per decidere: budget, analisi dei costi e reporting per la direzione.",
    "hero.cta1": "Cosa faccio",
    "hero.cta2": "Contattami",
    "about.title": "Chi sono",
    "about.p1": "Lavoro come controller nel controllo di gestione. Seguo il ciclo di pianificazione, dal budget ai forecast, e misuro l'andamento dell'azienda rispetto agli obiettivi.",
    "about.p2": "Collaboro con la direzione e con le diverse funzioni aziendali per spiegare gli scostamenti, capire dove si formano costi e margini e supportare le decisioni con dati affidabili.",
    "skills.title": "Competenze",
    "projects.title": "Cosa faccio",
    "projects.link": "Scopri di più →",
    "contact.title": "Contatti",
    "contact.text": "Vuoi confrontarti su budget, reporting o controllo di gestione? Scrivimi, ti risponderò al più presto.",
    "contact.email": "Scrivimi una email",
    "footer": "Controller · Controllo di gestione"
  },
  en: {
    "nav.about": "About",
    "nav.skills": "Skills",
    "nav.projects": "What I do",
    "nav.contact": "Contact",
    "hero.eyebrow": "Financial controller · Management control",
    "hero.lead": "I turn the company's numbers into information people can act on: budgets, cost analysis and management reporting.",
    "hero.cta1": "What I do",
    "hero.cta2": "Get in touch",
    "about.title": "About me",
    "about.p1": "I work as a controller in management control. I run the planning cycle, from budget to forecasts, and track how the company performs against its targets.",
    "about.p2": "I work with management and with every department to explain variances, understand where costs and margins come from, and back decisions with reliable data.",
    "skills.title": "Skills",
    "projects.title": "What I do",
    "projects.link": "Learn more →",
    "contact.title": "Contact",
    "contact.text": "Want to talk budgeting, reporting or management control? Drop me a line and I'll get back to you soon.",
    "contact.email": "Send me an email",
    "footer": "Financial controller · Management control"
  }
};

// ===== Logica =====

function getStoredLang() {
  try { return localStorage.getItem("lang"); } catch { return null; }
}

function storeLang(lang) {
  try { localStorage.setItem("lang", lang); } catch { /* ignore */ }
}

function renderSkills(lang) {
  const list = document.getElementById("skills-list");
  list.innerHTML = "";
  for (const skill of SKILLS) {
    const li = document.createElement("li");
    li.textContent = skill[lang];
    list.appendChild(li);
  }
}

function renderProjects(lang) {
  const container = document.getElementById("projects-list");
  container.innerHTML = "";
  for (const p of PROJECTS) {
    const card = document.createElement("article");
    card.className = "card reveal visible";

    const h3 = document.createElement("h3");
    h3.textContent = p.title[lang];
    const desc = document.createElement("p");
    desc.textContent = p.desc[lang];
    const tags = document.createElement("div");
    tags.className = "tags";
    for (const t of p.tags) {
      const span = document.createElement("span");
      span.textContent = t;
      tags.appendChild(span);
    }
    card.append(h3, desc, tags);
    if (p.link) {
      const link = document.createElement("a");
      link.href = p.link;
      link.textContent = I18N[lang]["projects.link"];
      card.append(link);
    }
    container.appendChild(card);
  }
}

function setLang(lang) {
  if (!I18N[lang]) lang = "it";
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach(el => {
    el.textContent = I18N[lang][el.dataset.i18n] ?? "";
  });
  document.querySelectorAll(".lang-switch button").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.lang === lang);
    btn.setAttribute("aria-pressed", btn.dataset.lang === lang);
  });
  renderSkills(lang);
  renderProjects(lang);
  storeLang(lang);
}

function setupReveal() {
  const targets = document.querySelectorAll(".section");
  if (!("IntersectionObserver" in window)) return;
  targets.forEach(el => el.classList.add("reveal"));
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  targets.forEach(el => io.observe(el));
}

document.querySelectorAll(".lang-switch button").forEach(btn => {
  btn.addEventListener("click", () => setLang(btn.dataset.lang));
});

document.getElementById("year").textContent = new Date().getFullYear();

const browserLang = (navigator.language || "it").startsWith("it") ? "it" : "en";
setLang(getStoredLang() || browserLang);
setupReveal();
