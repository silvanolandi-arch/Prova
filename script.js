// ===== Contenuti del sito: modifica qui testi, competenze e progetti =====

const SKILLS = ["HTML & CSS", "JavaScript", "Python", "Git", "UI Design", "Project Management"];

const PROJECTS = [
  {
    title: { it: "Progetto Uno", en: "Project One" },
    desc: {
      it: "Breve descrizione del progetto: obiettivo, il tuo ruolo e il risultato ottenuto.",
      en: "Short project description: the goal, your role and the outcome."
    },
    tags: ["JavaScript", "Design"],
    link: "#"
  },
  {
    title: { it: "Progetto Due", en: "Project Two" },
    desc: {
      it: "Un altro lavoro di cui vai fiero. Racconta cosa lo rende interessante.",
      en: "Another piece of work you're proud of. Tell what makes it interesting."
    },
    tags: ["Python", "Data"],
    link: "#"
  },
  {
    title: { it: "Progetto Tre", en: "Project Three" },
    desc: {
      it: "Spazio per un terzo progetto, una collaborazione o un'esperienza significativa.",
      en: "Room for a third project, a collaboration or a meaningful experience."
    },
    tags: ["Web", "UX"],
    link: "#"
  }
];

const I18N = {
  it: {
    "nav.about": "Chi sono",
    "nav.skills": "Competenze",
    "nav.projects": "Progetti",
    "nav.contact": "Contatti",
    "hero.eyebrow": "Ciao, sono",
    "hero.lead": "Una frase che ti descrive: cosa fai, cosa ti appassiona e come puoi aiutare chi visita il sito.",
    "hero.cta1": "Guarda i progetti",
    "hero.cta2": "Contattami",
    "about.title": "Chi sono",
    "about.p1": "Racconta qui il tuo percorso: da dove vieni, cosa hai studiato e come sei arrivato a fare ciò che fai oggi.",
    "about.p2": "Aggiungi cosa ti interessa, i valori con cui lavori e cosa stai cercando in questo momento: nuove collaborazioni, opportunità o progetti.",
    "skills.title": "Competenze",
    "projects.title": "Progetti",
    "projects.link": "Scopri di più →",
    "contact.title": "Lavoriamo insieme",
    "contact.text": "Hai un'idea, una proposta o vuoi solo salutare? Scrivimi, ti risponderò al più presto.",
    "contact.email": "Scrivimi una email",
    "footer": "Realizzato con cura"
  },
  en: {
    "nav.about": "About",
    "nav.skills": "Skills",
    "nav.projects": "Projects",
    "nav.contact": "Contact",
    "hero.eyebrow": "Hi, I'm",
    "hero.lead": "A sentence that describes you: what you do, what you love and how you can help the people visiting this site.",
    "hero.cta1": "See my work",
    "hero.cta2": "Get in touch",
    "about.title": "About me",
    "about.p1": "Tell your story here: where you come from, what you studied and how you got to do what you do today.",
    "about.p2": "Add what you care about, the values you work by and what you're looking for right now: new collaborations, opportunities or projects.",
    "skills.title": "Skills",
    "projects.title": "Projects",
    "projects.link": "Learn more →",
    "contact.title": "Let's work together",
    "contact.text": "Have an idea, a proposal or just want to say hi? Drop me a line and I'll get back to you soon.",
    "contact.email": "Send me an email",
    "footer": "Made with care"
  }
};

// ===== Logica =====

function getStoredLang() {
  try { return localStorage.getItem("lang"); } catch { return null; }
}

function storeLang(lang) {
  try { localStorage.setItem("lang", lang); } catch { /* ignore */ }
}

function renderSkills() {
  const list = document.getElementById("skills-list");
  list.innerHTML = "";
  for (const skill of SKILLS) {
    const li = document.createElement("li");
    li.textContent = skill;
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
    const link = document.createElement("a");
    link.href = p.link;
    link.textContent = I18N[lang]["projects.link"];

    card.append(h3, desc, tags, link);
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
renderSkills();
setLang(getStoredLang() || browserLang);
setupReveal();
