# Prova
Sito web personale / portfolio, bilingue (italiano + inglese).

## Struttura
- `index.html` — struttura della pagina
- `styles.css` — stile (minimale, con tema chiaro/scuro automatico)
- `script.js` — **contenuti** (testi IT/EN, competenze, progetti) e logica del cambio lingua

## Come personalizzarlo
1. Apri `script.js` e modifica `SKILLS`, `PROJECTS` e i testi in `I18N`.
2. In `index.html` aggiorna nome, email (`mailto:`) e link LinkedIn/GitHub.

## Vederlo in locale
Apri `index.html` nel browser, oppure:
```
python3 -m http.server 8000
```
e vai su http://localhost:8000

## Pubblicarlo online (GitHub Pages)
Su GitHub: **Settings → Pages → Source: Deploy from a branch**, scegli il branch e la cartella `/ (root)`.
