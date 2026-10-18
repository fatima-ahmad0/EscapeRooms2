# ESC-C-APE — The Last Bug (Cinematic Edition v2)

Static HTML/CSS/JS site, no build step. Upload every file (including `assets/`) to the repo root; Vercel deploys it.

## What's new in v2
- Fixed wrong-answer messages (each level now has its own; Level 8 no longer shows "undefined").
- Level 8 checker now simulates the loops, so any variable names, `<`/`<=`, `putchar`, etc. are accepted. It rejects wrong shapes.
- Refresh-proof timer: progress, score, hints and the deadline are saved in the browser. Reloading resumes the mission; if time ran out meanwhile, the Time's Up screen shows.
- Procedural background music (MUSIC toggle) that gets faster and more intense each sector and during the last 3 minutes.
- Intro cutscene, typewriter dialogue, BUG.exe taunts at 15/10/5/3/1 minutes, letterbox bars on sector travel, fog, film grain, vignette, red alarm pulse in the last 3 minutes, per-sector colour glow.
- All panels, hero and header now follow the selected theme (previously parts stayed dark navy in light themes).
- Passcode is stored as a hash (not readable in plain text).

## Organizer notes
- Passcode: `BUG2026`. To change it, compute `hashStr("NEWCODE")` in the browser console on the page and update `PASS_HASH` in `script.js`.
- Reset a computer for the next team: use RETURN TO HOME, or open the site with `?reset` at the end of the URL.
- Everything is client-side, so it controls event flow but is not secure against determined players (the vault digits live in `script.js`).
- Browsers only allow audio after a click, so music starts when the team clicks INITIALIZE MISSION (or on the first click after a reload).
- Test the full run once in your real browser before the event.
