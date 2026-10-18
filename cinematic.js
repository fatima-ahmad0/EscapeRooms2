/* ESC-C-APE cinematic layer: music, intro cutscene, typewriter dialogue, BUG.exe taunts, screen FX */
(function () {
  const AC = window.AudioContext || window.webkitAudioContext;
  const fx = document.createElement("div");
  fx.innerHTML = '<div class="fx-fog" aria-hidden="true"></div><div class="fx-vignette" aria-hidden="true"></div><div class="fx-grain" aria-hidden="true"></div><div class="lb lb-top" aria-hidden="true"></div><div class="lb lb-bot" aria-hidden="true"></div>';
  while (fx.firstChild) document.body.appendChild(fx.firstChild);

  /* ---------- procedural background music (no audio files needed) ---------- */
  const Music = {
    on: true, ac: null, out: null, filter: null, timer: null, step: 0, level: 0, panic: false,
    chords: [[57, 60, 64], [53, 57, 60], [48, 52, 55], [55, 59, 62]],
    hz: m => 440 * Math.pow(2, (m - 69) / 12),
    note(m, t, d, type, g) {
      const o = this.ac.createOscillator(), v = this.ac.createGain();
      o.type = type; o.frequency.value = this.hz(m);
      v.gain.setValueAtTime(0.0001, t); v.gain.exponentialRampToValueAtTime(g, t + 0.03); v.gain.exponentialRampToValueAtTime(0.0001, t + d);
      o.connect(v); v.connect(this.filter); o.start(t); o.stop(t + d + 0.05);
    },
    beat() {
      if (!this.on || !this.ac) return;
      const t = this.ac.currentTime + 0.05, s = this.step++, ch = this.chords[Math.floor(s / 16) % 4], hot = this.level >= 5 || this.panic;
      if (s % 16 === 0) ch.forEach(m => this.note(m - 12, t, 4.6, "sawtooth", 0.014));
      if (s % 2 === 0 || hot) this.note(ch[(s * (hot ? 2 : 1)) % 3] + 12 * ((s >> 2) % 2), t, 0.4, "triangle", 0.03 + this.level * 0.003);
      if (s % 4 === 0) this.note(ch[0] - 24, t, 0.3, "sine", 0.09);
      if (hot && s % 2 === 1) this.note(ch[0] - 24, t, 0.1, "square", 0.018);
    },
    start() {
      if (!AC || !this.on || this.timer) return;
      audioCtx = audioCtx || new AC(); this.ac = audioCtx; if (this.ac.state === "suspended") this.ac.resume();
      this.filter = this.ac.createBiquadFilter(); this.filter.type = "lowpass"; this.out = this.ac.createGain(); this.out.gain.value = 0.9;
      this.filter.connect(this.out); this.out.connect(this.ac.destination); this.setLevel(this.level);
    },
    setLevel(l) {
      this.level = l; if (!this.ac) return;
      this.filter.frequency.value = 900 + l * 260 + (this.panic ? 900 : 0);
      clearInterval(this.timer); this.timer = setInterval(() => this.beat(), Math.round(60000 / (84 + l * 7 + (this.panic ? 20 : 0)) / 2));
    },
    stop() { clearInterval(this.timer); this.timer = null; },
    stinger(notes) { if (!this.on || !this.ac) return; const t = this.ac.currentTime; notes.forEach((m, i) => this.note(m, t + i * 0.11, 0.5, "triangle", 0.07)); }
  };
  window.Music = Music;
  const mBtn = document.getElementById("musicToggle");
  mBtn.addEventListener("click", () => { Music.on = !Music.on; mBtn.textContent = "MUSIC: " + (Music.on ? "ON" : "OFF"); if (Music.on) { if (started) Music.start(); } else Music.stop(); });
  document.addEventListener("pointerdown", () => { if (started && !finished && Music.on && !Music.timer) Music.start(); }, { passive: true });

  /* ---------- typewriter dialogue ---------- */
  let typeToken = 0;
  function typeInto(el, text, speed = 16) {
    const tk = ++typeToken; if (reduceMotion) { el.textContent = text; return; }
    el.classList.add("typing"); el.textContent = ""; let i = 0;
    (function go() { if (tk !== typeToken) return; el.textContent = text.slice(0, ++i); if (i < text.length) setTimeout(go, speed); else el.classList.remove("typing"); })();
  }
  const _msg = setWorldMessage;
  setWorldMessage = function (m) { _msg(m); typeInto($("worldNarrative"), m); };
  const _render = renderStage;
  renderStage = function (i) { _render(i); typeInto($("worldNarrative"), roomWorlds[i].narrative); Music.setLevel(i); document.body.dataset.room = String(i + 1); };

  /* ---------- BUG.exe taunts at key moments ---------- */
  function bugSay(text) {
    const t = document.createElement("div"); t.className = "bug-toast"; t.innerHTML = "<b>BUG.exe</b><span></span>"; document.body.appendChild(t);
    typeInto(t.querySelector("span"), text, 22); playTone(140, .25); setTimeout(() => t.classList.add("out"), 4200); setTimeout(() => t.remove(), 4800);
  }
  const taunts = { 900: "Fifteen minutes left. My code is cleaner than yours.", 600: "Ten minutes. The exit door is getting heavier.", 300: "Five minutes. I can hear your keyboards panicking.", 180: "Three minutes. The facility is shutting down!", 60: "One minute. Last chance, humans." };
  const _tick = tick;
  tick = function () { _tick(); if (taunts[remaining] && !finished) bugSay(taunts[remaining]); if (remaining <= 180 && !finished && !document.body.classList.contains("panic")) { document.body.classList.add("panic"); Music.panic = true; Music.setLevel(Music.level); } };
  const _cel = celebrate; celebrate = function (o, n) { _cel(o, n); Music.stinger([69, 73, 76, 81]); };
  const _vault = showFinalVault; showFinalVault = function () { _vault(); Music.setLevel(7); bugSay("You found all eight shards? Impossible… enter the code."); };
  const _fail = endMission; endMission = function (r) { _fail(r); Music.stop(); document.body.classList.remove("panic"); };
  const _win = finishSuccess; finishSuccess = function (b) { _win(b); Music.setLevel(2); document.body.classList.remove("panic"); };

  /* ---------- intro cutscene ---------- */
  function playIntro(done) {
    const box = $("introCut"), txt = $("introText"); let finishedIntro = false, tk = 0;
    const team = $("teamName").value.trim();
    const lines = ["FACILITY 09 // SECURITY LOG 02:47", "Your team cleared every earlier room. One door remains.", "BUG.exe has hijacked the exit controller and split the escape code into eight key shards.", "Each sector hides a broken C program. Read it. Trace it. Fix it.", "Recover all eight shards, enter them in order, and escape in 25 minutes.", "Good luck, " + team + "."];
    box.classList.remove("hidden"); document.body.classList.add("cutscene"); txt.innerHTML = "";
    const end = () => { if (finishedIntro) return; finishedIntro = true; tk++; box.classList.add("hidden"); document.body.classList.remove("cutscene"); document.removeEventListener("keydown", end); done(); };
    $("introSkip").onclick = end; box.onclick = e => { if (e.target === box) end(); }; document.addEventListener("keydown", end);
    if (reduceMotion) { setTimeout(end, 300); return; }
    const my = ++tk; let li = 0;
    (function nextLine() {
      if (finishedIntro || my !== tk) return; if (li >= lines.length) { setTimeout(end, 900); return; }
      const p = document.createElement("p"); txt.appendChild(p); const text = lines[li++]; let i = 0;
      (function ch() { if (finishedIntro) return; p.textContent = text.slice(0, ++i); if (i < text.length) setTimeout(ch, 24); else setTimeout(nextLine, 650); })();
    })();
  }
  window.startWithIntro = function () {
    if (started) return;
    const ok = $("teamName").value.trim() && hashStr($("roomPasscode").value.trim().toUpperCase()) === PASS_HASH;
    if (!ok) { startMission(); return; }
    Music.start(); playIntro(() => { startMission(); Music.start(); Music.setLevel(0); });
  };
  resumeMission();
  if (started && !finished) Music.setLevel(currentStage);
})();
