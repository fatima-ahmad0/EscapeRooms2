const stages = [
  {
    file: "LEVEL_01.C", kicker: "LEVEL 01 / CONDITIONAL LOGIC", title: "The Access Filter",
    description: "Two filters and a weighted update guard the first file. Check every condition before changing count.",
    code: `int values[] = {5, 12, 9, 18, 21, 14, 6};\nint i, count = 0;\nfor (i = 0; i < 7; i++) {\n    if (values[i] >= 10 && values[i] % 2 == 0 && values[i] % 3 == 0)\n        count += values[i] / 3;\n}\nprintf("%d", count);`,
    question: "What value is printed?", label: "ENTER THE COUNT", placeholder: "Trace each accepted value...", answer: ["10"],
    hint: "A value must be at least 10, even, and divisible by 3. Add one-third of each value that passes all three checks.", success: "Access filter passed.", points: 15, digit: "7"
  },
  {
    file: "LEVEL_02.C", kicker: "LEVEL 02 / LOOP TRACE", title: "The Loop Checkpoint",
    description: "The loop skips by two, but each pass follows a different update rule. Trace the values in order.",
    code: `int i, total = 0;\nfor (i = 1; i <= 9; i += 2) {\n    if (i % 3 == 0)\n        total += i * 2;\n    else\n        total += i;\n}\nprintf("%d", total);`,
    question: "What final value does total contain?", label: "ENTER THE TOTAL", placeholder: "Calculate each loop pass...", answer: ["37"],
    hint: "The loop visits 1, 3, 5, 7, and 9. Double only the values divisible by 3; add the others normally.", success: "Loop checkpoint cleared.", points: 20, digit: "3"
  },
  {
    file: "LEVEL_03.C", kicker: "LEVEL 03 / NESTED LOOPS", title: "The Pairing Protocol",
    description: "A pair is valid only when the second number is larger and their sum is even. Count every valid pair exactly once.",
    code: `int i, j, count = 0;\nfor (i = 1; i <= 4; i++) {\n    for (j = 1; j <= 5; j++) {\n        if (j > i && (i + j) % 2 == 0)\n            count++;\n    }\n}\nprintf("%d", count);`,
    question: "How many valid pairs are counted?", label: "ENTER THE COUNT", placeholder: "Trace the nested loops...", answer: ["4"],
    hint: "For each i, consider only j values greater than i, then keep pairs whose sum is even.", success: "Pairing protocol defeated.", points: 25, digit: "6"
  },
  {
    file: "LEVEL_04.C", kicker: "LEVEL 04 / CODE REVIEW", title: "The Snippet Showdown",
    description: "Both snippets look plausible. Only one counts values that are even and within the inclusive range 1 through 20.",
    choice: true,
    snippets: [
      { label: "SNIPPET A · main.c", code: `if (value >= 1 && value <= 20 && value % 2 == 0)\n    count++;` },
      { label: "SNIPPET B · main.c", code: `if (value >= 1 || value <= 20 && value % 2 == 0)\n    count++;` }
    ],
    question: "Which snippet correctly checks all three requirements? Enter A or B.", label: "CHOOSE A OR B", placeholder: "A or B...", answer: ["a"],
    hint: "The value must satisfy the lower bound, the upper bound, and the even-number test at the same time.", success: "Code review passed.", points: 30, digit: "4"
  },
  {
    file: "LEVEL_05.C", kicker: "LEVEL 05 / INCREMENT AMBUSH", title: "The Increment Ambush",
    description: "Post-increment changes x after its old value is used. On even-numbered passes, y is also reduced by one.",
    code: `int x = 2, y = 0, i;\nfor (i = 0; i < 4; i++) {\n    y += x++;\n    if (i % 2 == 0) y--;\n}\nprintf("%d %d", x, y);`,
    question: "What two values are printed, in order: x then y?", label: "ENTER BOTH VALUES", placeholder: "Trace x and y separately...", answer: ["6 12", "6,12", "6  12"],
    hint: "For each pass, add the current x to y before x increases. Then subtract one when i is 0 or 2.", success: "Increment ambush disarmed.", points: 35, digit: "8"
  },
  {
    file: "LEVEL_06.C", kicker: "LEVEL 06 / ARRAY REASONING", title: "The Return Signal",
    description: "Each array element follows one of three paths. Trace the conditions in order; only the first matching branch runs for each element.",
    code: `int a[] = {5, 12, 7, 18, 9, 4};\nint i, total = 0;\nfor (i = 0; i < 6; i++) {\n    if (a[i] % 3 == 0)\n        total += a[i] / 3;\n    else if (a[i] > 7)\n        total += 2;\n    else\n        total -= 1;\n}\nprintf("%d", total);`,
    question: "What value is printed in total after all six elements are processed?", label: "ENTER THE TOTAL", placeholder: "Follow each branch...", answer: ["10"],
    hint: "For each number, first test divisibility by 3. Only if that fails, test whether it is greater than 7; otherwise subtract 1.", success: "Return signal located.", points: 40, digit: "2"
  },
  {
    file: "LEVEL_07.C", kicker: "LEVEL 07 / WHILE LOOP", title: "The Digit Interrogation",
    description: "A damaged counter processes one digit at a time. Remember that % 10 extracts the last digit and / 10 removes it using integer division.",
    code: `int n = 5832, digit, total = 0;\nwhile (n > 0) {\n    digit = n % 10;\n    if (digit % 2 == 0)\n        total += digit;\n    else\n        total -= digit;\n    n /= 10;\n}\nprintf("%d", total);`,
    question: "What value is printed after every digit has been processed?", label: "ENTER THE FINAL TOTAL", placeholder: "Trace the digits from right to left...", answer: ["2"],
    hint: "The digits are processed from right to left. Add even digits to total and subtract odd digits, then remove the last digit with n /= 10.", success: "Digit interrogation complete.", points: 45, digit: "1"
  },
  {
    file: "LEVEL_08.C", kicker: "LEVEL 08 / WRITE THE CODE", title: "The Final Patch", multiline: true,
    description: "Write a nested-loop solution that prints a four-row star staircase. The inner loop controls stars; the outer loop controls rows.",
    code: `/* Required output: */\n*\n**\n***\n****\n\n// Write the C code that prints this pattern`,
    question: "Write the nested for-loops and printf statements needed to print the four-line pattern exactly.", label: "ENTER YOUR C CODE", placeholder: "Write the outer loop, inner loop, and newline...", answer: [
      'for(i=1;i<=4;i++){for(j=1;j<=i;j++)printf(\"*\");printf(\"\\n\");}',
      'for(i=1;i<=4;i++){for(j=1;j<=i;j++)printf(\"*\");printf(\"\\n\");}',
      'for(i=1;i<=4;i++){for(j=0;j<i;j++)printf(\"*\");printf(\"\\n\");}'
    ],
    hint: "Use an outer loop for row numbers 1 through 4. For each row, print one star per column up to that row, then print a newline.", success: "Pattern generated. All eight keys recovered.", points: 50, digit: "5"
  }
];

const wrongMsgs = [
  "Not quite. A value must pass all three checks, and count grows by value / 3.",
  "Trace each pass: i = 1, 3, 5, 7, 9. Double only the multiples of 3.",
  "First keep only j > i, then check that i + j is even.",
  "Check all three rules together, and watch && versus ||.",
  "x++ uses the old x first. Track x and y separately.",
  "Only the first matching branch runs. Test % 3 first.",
  "Use % 10 for the last digit, / 10 to drop it. Odd digits are subtracted.",
  "Outer loop = row (1 to 4), inner loop = stars in that row, then print a newline."
];
stages.forEach((st, i) => { st.wrong = wrongMsgs[i]; });
stages[3].answer = ["a", "snippeta"];
stages[7].description = "Write a nested-loop C solution that prints this four-row star staircase. Any variable names work; the inner loop prints stars, the outer loop handles rows.";
const $ = (id) => document.getElementById(id);
let currentStage = 0, score = 0, hintsUsed = 0, remaining = 25 * 60, timerId = null;
let completed = stages.map(() => false), hintShown = stages.map(() => false);
const SAVE_KEY = "escCape_state_v2", PASS_HASH = 2812988973;
let deadline = 0, endInfo = null;
function hashStr(t) { let h = 5381; for (const c of t) h = ((h << 5) + h + c.charCodeAt(0)) >>> 0; return h; }
function saveState() { if (!started) return; try { localStorage.setItem(SAVE_KEY, JSON.stringify({ team: activeTeamName, deadline, score, hintsUsed, completed, hintShown, currentStage, vaultAttempts, finished, end: endInfo })); } catch (_) {} }
function clearState() { try { localStorage.removeItem(SAVE_KEY); } catch (_) {} }
let started = false, finished = false, soundOn = true, audioCtx = null, vaultAttempts = 2, activeTeamName = "";
const escapeCode = stages.map(s => s.digit).join("");

function checkStarCode(src) {
  const code = src.replace(/\/\*[\s\S]*?\*\/|\/\/.*$/gm, "");
  const val = (e, env) => { e = e.trim(); if (/^\d+$/.test(e)) return +e; const m = e.match(/^([A-Za-z_]\w*)\s*([+-])\s*(\d+)$/); if (m && m[1] in env) return env[m[1]] + (m[2] === "+" ? 1 : -1) * +m[3]; return e in env ? env[e] : NaN; };
  const re = /for\s*\(\s*(?:int\s+)?([A-Za-z_]\w*)\s*=\s*([^;]+);\s*\1\s*(<=|<)\s*([^;]+);\s*(?:\1\s*\+\+|\+\+\s*\1|\1\s*\+=\s*1|\1\s*=\s*\1\s*\+\s*1)\s*\)/g;
  const loops = [...code.matchAll(re)];
  if (loops.length !== 2 || loops[0][1] === loops[1][1]) return false;
  const [o, n] = loops, rows = [];
  const run = (m, env) => { let v = val(m[2], env), c = 0; const b = val(m[4], env); if (isNaN(v) || isNaN(b)) return -1; while ((m[3] === "<=" ? v <= b : v < b) && c < 50) { env[m[1]] = v; if (m === o) rows.push(run(n, { ...env })); else c++; v++; } return c; };
  run(o, {});
  if (rows.join() !== "1,2,3,4") return false;
  const star = code.search(/printf\s*\(\s*"\*"\s*\)|putchar\s*\(\s*'\*'\s*\)|printf\s*\(\s*"%c"\s*,\s*'\*'\s*\)/);
  const nl = code.search(/printf\s*\(\s*"\\n"\s*\)|putchar\s*\(\s*'\\n'\s*\)|puts\s*\(\s*""\s*\)/);
  return star > n.index && nl > star;
}
function normalize(value) { return value.trim().toLowerCase().replace(/\s+/g, "").replace(/;$/, ""); }
function playTone(freq = 660, duration = 0.09) {
  if (!soundOn) return;
  try { audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)(); const osc = audioCtx.createOscillator(), gain = audioCtx.createGain(); osc.frequency.value = freq; osc.type = "sine"; gain.gain.setValueAtTime(0.06, audioCtx.currentTime); gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration); osc.connect(gain); gain.connect(audioCtx.destination); osc.start(); osc.stop(audioCtx.currentTime + duration); } catch (_) {}
}
function showFeedback(message, type = "") { const el = $("feedback"); el.textContent = message; el.className = "feedback" + (type ? " " + type : ""); }

// Each original C challenge lives in a different illustrated facility sector.
const roomWorlds = [
  { sector: "SECTOR 01 / ACCESS HUB", name: "The Access Hub", kicker: "MISSION 01 // POWER RESTORATION", narrative: "The facility has gone dark. Recover the first key shard to wake the route map.", objective: "OBJECTIVE: REPAIR THE ACCESS FILTER", mood: "CORRUPTION DETECTED", scene: "zone-01.webp", pos: "52% 53%" },
  { sector: "SECTOR 02 / LOOP TUNNEL", name: "The Loop Tunnel", kicker: "MISSION 02 // LOOP STABILIZATION", narrative: "The corridor is stuck in a repeating cycle. Trace the loop and restart the power gates.", objective: "OBJECTIVE: STABILIZE THE LOOP", mood: "POWER GRID CYCLING", scene: "zone-02.webp", pos: "52% 49%" },
  { sector: "SECTOR 03 / PAIRING CHAMBER", name: "The Pairing Chamber", kicker: "MISSION 03 // DATA RECONSTRUCTION", narrative: "Broken data streams cross the chamber. Find the valid pairs and rebuild the route bridge.", objective: "OBJECTIVE: RECONNECT THE DATA PAIRS", mood: "SIGNAL SPLIT DETECTED", scene: "zone-03.webp", pos: "47% 55%" },
  { sector: "SECTOR 04 / FORKED HALL", name: "The Forked Hall", kicker: "MISSION 04 // ROUTE ANALYSIS", narrative: "Two control paths have diverged. Only the correct logic gate will open the next blast door.", objective: "OBJECTIVE: CHOOSE THE SAFE LOGIC PATH", mood: "ROUTE SPLIT ACTIVE", scene: "zone-04.webp", pos: "50% 48%" },
  { sector: "SECTOR 05 / INCREMENT REACTOR", name: "The Increment Reactor", kicker: "MISSION 05 // REACTOR CONTAINMENT", narrative: "The reactor counters are drifting out of sync. Trace every update before the core overheats.", objective: "OBJECTIVE: STABILIZE BOTH COUNTERS", mood: "REACTOR TEMPERATURE RISING", scene: "zone-05.webp", pos: "50% 50%" },
  { sector: "SECTOR 06 / ARRAY OBSERVATORY", name: "The Array Observatory", kicker: "MISSION 06 // SIGNAL RECOVERY", narrative: "Signals are bouncing between observation nodes. Follow the branch priority to bring them home.", objective: "OBJECTIVE: RESTORE THE SIGNAL ARRAY", mood: "SIGNAL RECOVERY IN PROGRESS", scene: "zone-06.webp", pos: "48% 53%" },
  { sector: "SECTOR 07 / DIGIT CORE", name: "The Digit Core", kicker: "MISSION 07 // CORE DECRYPTION", narrative: "The last safe route is sealed behind a digit cipher. Interrogate the number one digit at a time.", objective: "OBJECTIVE: DECODE THE CORE SIGNAL", mood: "ENCRYPTION LAYER ACTIVE", scene: "zone-07.webp", pos: "52% 54%" },
  { sector: "SECTOR 08 / FINAL PATCH BAY", name: "The Final Patch Bay", kicker: "MISSION 08 // FINAL SYSTEM REPAIR", narrative: "The final patch is all that stands between your team and the exit. Restore the output generator.", objective: "OBJECTIVE: REBUILD THE STAR PATTERN", mood: "VAULT CORE EXPOSED", scene: "zone-08.webp", pos: "50% 53%" }
];
const reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
function setWorldMessage(message) {
  const narrative = $("worldNarrative");
  if (narrative) { narrative.textContent = message; narrative.classList.remove("narrative-pop"); void narrative.offsetWidth; narrative.classList.add("narrative-pop"); }
}
function setWorldScene(index) {
  const room = roomWorlds[index]; if (!room) return;
  const banner = $("worldBanner"), backdrop = $("worldBackdrop");
  document.body.dataset.room = String(index + 1);
  if (banner && backdrop) {
    banner.dataset.scene = String(index + 1);
    backdrop.style.backgroundImage = `url("assets/${room.scene}")`;
    backdrop.style.backgroundPosition = room.pos;
    banner.classList.remove("room-arrive"); void banner.offsetWidth; banner.classList.add("room-arrive");
  }
  $("worldSector").textContent = room.sector;
  $("worldTitle").textContent = room.name;
  $("worldKicker").textContent = room.kicker;
  $("worldNarrative").textContent = room.narrative;
  $("worldObjective").textContent = room.objective;
  $("worldMood").textContent = room.mood;
  if (index === 7) banner && banner.classList.add("boss-sector");
  else banner && banner.classList.remove("boss-sector");
  if (index === 6) banner && banner.classList.add("danger-sector");
  else banner && banner.classList.remove("danger-sector");
}
function startSectorTransition(nextIndex, finalVault = false) {
  const overlay = $("levelTransition");
  const room = roomWorlds[Math.min(nextIndex, roomWorlds.length - 1)];
  const nextName = finalVault ? "THE ESCAPE VAULT" : room.name.toUpperCase();
  $("transitionKicker").textContent = finalVault ? "ALL SHARDS RECOVERED" : `SECTOR 0${nextIndex + 1} UNLOCKED`;
  $("transitionTitle").textContent = finalVault ? "THE VAULT IS OPENING" : nextName;
  $("transitionMessage").textContent = finalVault ? "Final access sequence initiated…" : "Transfer gate online. Moving the mission forward…";
  $("transitionArt").style.backgroundImage = `url("assets/${room.scene}")`;
  overlay.classList.remove("hidden", "transition-out"); void overlay.offsetWidth; overlay.classList.add("transition-in");
  document.body.classList.add("traveling");
  playTone(finalVault ? 760 : 600, .18);
  setTimeout(() => {
    if (finished) { overlay.classList.add("hidden"); document.body.classList.remove("traveling"); return; }
    if (finalVault) showFinalVault(); else renderStage(nextIndex);
    overlay.classList.remove("transition-in"); overlay.classList.add("transition-out");
    setTimeout(() => { overlay.classList.add("hidden"); overlay.classList.remove("transition-out"); document.body.classList.remove("traveling"); }, reduceMotion ? 40 : 430);
  }, reduceMotion ? 40 : 740);
}
function updateWorldMap() {
  const count = completed.filter(Boolean).length;
  const countEl = $("worldMapCount"); if (countEl) countEl.innerHTML = `${count} <small>/ 8 SHARDS</small>`;
  const fill = $("shardProgressFill"); if (fill) fill.style.width = `${count / stages.length * 100}%`;
  document.querySelectorAll(".world-map-node").forEach((node, i) => {
    node.classList.toggle("active", i === currentStage && !completed[i] && !finished);
    node.classList.toggle("complete", !!completed[i]);
    node.classList.toggle("locked", i > count && !completed[i]);
    node.querySelector("i").textContent = completed[i] ? "✓" : String(i + 1).padStart(2, "0");
  });
}
// Draw an ambient star/particle field behind the panels and illustrated world.
(function setupAmbientCanvas() {
  const canvas = $("ambientCanvas"); if (!canvas) return;
  const ctx = canvas.getContext("2d"); if (!ctx) return;
  let width = 0, height = 0, points = [];
  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 1.7);
    width = window.innerWidth; height = window.innerHeight;
    canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
    canvas.style.width = `${width}px`; canvas.style.height = `${height}px`; ctx.setTransform(dpr,0,0,dpr,0,0);
    const count = Math.min(90, Math.max(34, Math.round(width * height / 18000)));
    points = Array.from({length: count}, () => ({x:Math.random()*width,y:Math.random()*height,r:.4+Math.random()*1.6,v:.08+Math.random()*.28,a:.18+Math.random()*.42,phase:Math.random()*Math.PI*2}));
  }
  function draw(t) {
    ctx.clearRect(0,0,width,height);
    const accent = getComputedStyle(document.body).getPropertyValue("--green").trim() || "#76ffb2";
    for (const p of points) {
      if (!reduceMotion) { p.y -= p.v; p.phase += .012; if (p.y < -5) {p.y=height+5;p.x=Math.random()*width;} }
      const alpha = p.a * (.68 + .32 * Math.sin(p.phase + t/1200));
      ctx.globalAlpha = alpha; ctx.fillStyle = accent; ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fill();
    }
    ctx.globalAlpha = 1;
    if (!reduceMotion) requestAnimationFrame(draw);
  }
  window.addEventListener("resize", resize, {passive:true}); resize(); draw(0);
})();
// Small celebration effects make each solved challenge feel like progress.
function celebrate(origin = "center", amount = 22) {
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const layer = document.createElement("div"); layer.className = "celebration-layer"; layer.setAttribute("aria-hidden", "true");
  const colors = ["var(--green)", "var(--red)", "var(--yellow)", "var(--text)"];
  for (let i = 0; i < amount; i++) {
    const bit = document.createElement("i"); bit.className = "celebration-bit";
    bit.style.setProperty("--x", `${(Math.random() - .5) * 90}vw`);
    bit.style.setProperty("--y", `${-30 - Math.random() * 45}vh`);
    bit.style.setProperty("--spin", `${Math.random() * 900 - 450}deg`);
    bit.style.setProperty("--delay", `${Math.random() * 180}ms`);
    bit.style.setProperty("--color", colors[Math.floor(Math.random() * colors.length)]);
    bit.style.left = origin === "center" ? "50%" : `${10 + Math.random() * 80}%`;
    layer.appendChild(bit);
  }
  document.body.appendChild(layer); setTimeout(() => layer.remove(), 1500);
}
function animateStageEntry() {
  const panel = $("puzzlePanel"), inner = panel && panel.querySelector(".puzzle-inner");
  if (!inner) return;
  inner.classList.remove("stage-enter"); void inner.offsetWidth; inner.classList.add("stage-enter");
  setTimeout(() => inner.classList.remove("stage-enter"), 650);
}

function startMission() {
  if (started) return;
  const team = $("teamName").value.trim();
  const passcode = $("roomPasscode").value.trim().toUpperCase();
  if (!team) { $("teamName").setCustomValidity("Enter your team name before starting."); $("teamName").reportValidity(); $("teamName").focus(); return; }
  if (hashStr(passcode) !== PASS_HASH) { $("roomPasscode").setCustomValidity("Incorrect passcode. Ask the previous room organizer for the access passcode."); $("roomPasscode").reportValidity(); $("roomPasscode").focus(); return; }
  $("roomPasscode").setCustomValidity("");
  started = true; $("teamName").setCustomValidity(""); activeTeamName = team; document.body.classList.add("mission-live"); celebrate("center", 30);
  $("notepadToggle").classList.remove("hidden"); $("notepadPanel").classList.add("hidden"); $("notepadToggle").setAttribute("aria-expanded", "false");
  $("activeTeam").textContent = activeTeamName; $("briefing").classList.add("hidden"); $("homeHero").classList.add("hidden"); $("game").classList.remove("hidden"); window.scrollTo({top:0,behavior:reduceMotion ? "auto" : "smooth"});
  if ($("leaderNote")) $("leaderNote").classList.add("hidden"); deadline = Date.now() + 25 * 60 * 1000; saveState(); renderStage(0); timerId = setInterval(tick, 1000); playTone(520);
}
function renderStage(index) {
  currentStage = index; const s = stages[index]; animateStageEntry(); setWorldScene(index); updateWorldMap();
  $("fileLabel").textContent = s.file; $("fileStatus").textContent = "IN PROGRESS";
  $("puzzleKicker").textContent = s.kicker; $("puzzleTitle").textContent = s.title; $("puzzleDescription").textContent = s.description;
  const block = $("codeBlock");
  if (s.choice) {
    block.classList.add("snippet-compare");
    block.innerHTML = s.snippets.map((item, i) => `<div class="snippet-card"><div class="snippet-card-title">${item.label}</div><pre>${item.code.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")}</pre></div>`).join("");
  } else { block.classList.remove("snippet-compare"); block.textContent = s.code || "/* Challenge code could not load. Please reset the mission and try again. */"; }
  let answerField = $("answerInput");
  if (s.multiline && answerField.tagName !== "TEXTAREA") {
    const area = document.createElement("textarea"); area.id = "answerInput"; area.name = "answerInput"; area.rows = 5; area.maxLength = 1800; area.spellcheck = false; area.required = true; area.setAttribute("aria-label", "Enter your C code in up to five lines"); answerField.replaceWith(area); answerField = area;
  } else if (!s.multiline && answerField.tagName !== "INPUT") {
    const input = document.createElement("input"); input.id = "answerInput"; input.name = "answerInput"; input.autocomplete = "off"; input.spellcheck = false; input.required = true; answerField.replaceWith(input); answerField = input;
  }
  $("questionText").textContent = s.question; $("answerLabel").textContent = s.label; answerField.placeholder = s.multiline ? "Line 1\nLine 2\nLine 3\nLine 4\nLine 5" : s.placeholder; answerField.value = "";
  answerField.disabled = false; $("answerForm").querySelector("button").disabled = false; $("answerForm").querySelector("button").textContent = "SUBMIT ↵";
  answerField.classList.toggle("code-answer", !!s.multiline);
  $("hintBox").classList.toggle("hidden", !hintShown[index]); $("hintBox").textContent = hintShown[index] ? "HINT // " + s.hint : "";
  $("hintBtn").disabled = hintShown[index]; $("hintBtn").style.opacity = $("hintBtn").disabled ? ".45" : "1";
  $("stagePoints").textContent = `${s.points} PTS AVAILABLE`; showFeedback("Ready when your team is."); updateSidebar(); saveState();
}
function updateSidebar() {
  $("score").textContent = score; $("hintsUsed").textContent = hintsUsed;
  const count = completed.filter(Boolean).length; $("progressText").textContent = `${count} / ${stages.length}`; $("progressBar").style.width = `${count / stages.length * 100}%`;
  document.querySelectorAll(".stage-item").forEach((el, i) => { el.classList.toggle("active", i === currentStage && !finished); el.classList.toggle("complete", completed[i]); el.classList.toggle("locked", i > count && !completed[i]); el.querySelector(".stage-state").textContent = completed[i] ? "✓" : (i <= count ? "●" : "🔒"); });
  updateWorldMap();
}
function revealKeyThenContinue() {
  const overlay = $("keyReveal"); $("earnedKey").textContent = stages[currentStage].digit; overlay.classList.remove("hidden"); overlay.classList.remove("key-bounce"); void overlay.offsetWidth; overlay.classList.add("key-bounce");
  setTimeout(() => {
    overlay.classList.add("hidden");
    if (finished) return;
    if (completed.every(Boolean)) startSectorTransition(7, true);
    else { const next = completed.findIndex(v => !v); startSectorTransition(next, false); setTimeout(() => { if (!finished) showFeedback(`Sector ${String(next + 1).padStart(2,"0")} unlocked. Keep moving, team.`, "success"); }, reduceMotion ? 80 : 1200); }
  }, 1400);
}
function submitAnswer(event) {
  event.preventDefault(); if (finished || completed[currentStage]) return;
  const s = stages[currentStage], rawValue = $("answerInput").value, value = normalize(rawValue); if (!value) return;
  const patternCode = s.multiline && checkStarCode(rawValue);
  if (s.multiline ? patternCode : s.answer.map(normalize).includes(value)) {
    completed[currentStage] = true; score += s.points; celebrate("center", currentStage === stages.length - 1 ? 50 : 28); const banner = $("worldBanner"); banner.classList.remove("room-cleared"); void banner.offsetWidth; banner.classList.add("room-cleared"); setWorldMessage(currentStage === 7 ? "All systems respond. The route to the vault is finally visible." : "Key shard recovered! The next gate is powering up."); const puzzle = $("puzzlePanel"); puzzle.classList.remove("solved-flash"); void puzzle.offsetWidth; puzzle.classList.add("solved-flash"); setTimeout(() => puzzle.classList.remove("solved-flash"), 700); $("fileStatus").textContent = "CLEARED";
    showFeedback("Correct! " + s.success + " Key acquired.", "success"); $("answerInput").disabled = true; $("answerForm").querySelector("button").disabled = true; $("answerForm").querySelector("button").textContent = "CLEARED ✓"; $("hintBtn").disabled = true;
    $("stagePoints").textContent = "LEVEL CLEARED"; updateSidebar(); saveState(); playTone(880, .16); revealKeyThenContinue();
  } else {
    showFeedback("✕ " + stages[currentStage].wrong, "error"); playTone(180, .13);
    const puzzle = $("puzzlePanel"); puzzle.classList.remove("wrong-answer-shake"); void puzzle.offsetWidth; puzzle.classList.add("wrong-answer-shake"); setTimeout(() => puzzle.classList.remove("wrong-answer-shake"), 560);
    const banner = $("worldBanner"); banner.classList.add("companion-warning"); setWorldMessage("Not that route. Check the trace, then try again — I am keeping the door open for you."); setTimeout(() => banner.classList.remove("companion-warning"), 700);
    $("answerInput").select();
  }
}
function requestHint() {
  if (hintShown[currentStage] || completed[currentStage]) return;
  hintShown[currentStage] = true; hintsUsed++; score = Math.max(0, score - 3); $("hintBox").textContent = "HINT // " + stages[currentStage].hint; $("hintBox").classList.remove("hidden"); $("hintBtn").disabled = true;
  showFeedback("Hint used. 3 points deducted.", "error"); setWorldMessage("A little assist from Byte. Use the hint below, then keep your key shard in reach."); updateSidebar(); saveState(); playTone(430);
}
function tick() {
  if (finished) return; remaining = Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
  $("timer").textContent = `${String(Math.floor(remaining / 60)).padStart(2, "0")}:${String(remaining % 60).padStart(2, "0")}`;
  $("timerBar").style.width = `${remaining / (25 * 60) * 100}%`; if (remaining <= 180) { $("timer").classList.add("danger"); $("worldBanner").classList.add("critical-timer"); } if (remaining === 0) endMission("time");
}
function showFinalVault() {
  if (finished) return; celebrate("center", 32);
  hideNotepadForEnd();
  $("puzzlePanel").innerHTML = `<div class="panel-heading"><span class="status-dot"></span> FINAL ACCESS TERMINAL <span class="heading-code">LOCKED</span></div><div class="puzzle-inner"><div class="puzzle-kicker">FINAL CHALLENGE / VAULT ACCESS</div><h2>The Escape Vault</h2><p>All eight keys recovered. Assemble your team's keys in the order earned and enter the resulting eight-digit escape code.</p><div class="code-window"><div class="code-title"><span>vault_access.c</span><span>AUTH REQUIRED</span></div><pre>/* Enter the code your team assembled */\nint access_granted = 0;</pre></div><form id="vaultForm"><label for="vaultInput">EIGHT-DIGIT ESCAPE CODE</label><div class="answer-row"><input id="vaultInput" maxlength="8" inputmode="numeric" pattern="[0-9]{8}" placeholder="Enter your code" autocomplete="off" required /><button class="submit-btn" type="submit">UNLOCK ↵</button></div></form><div class="feedback" id="vaultFeedback" role="status">Two attempts available.</div><div class="puzzle-actions"><span class="stage-points">KEYS MUST BE IN EARNED ORDER</span><span class="stage-points" id="attemptsLeft">2 ATTEMPTS</span></div></div>`;
  $("vaultForm").addEventListener("submit", (e) => { e.preventDefault(); const value = $("vaultInput").value.trim(); if (value === escapeCode) { score += 30; const timeBonus = remaining > 0 ? Math.round((remaining / (25 * 60)) * 15) : 0; score += timeBonus; revealCorrectCode(timeBonus); } else { vaultAttempts--; saveState(); $("attemptsLeft").textContent = `${vaultAttempts} ATTEMPT${vaultAttempts === 1 ? "" : "S"} LEFT`; if (vaultAttempts <= 0) { endMission("attempts"); return; } $("vaultFeedback").textContent = "Code not accepted. One attempt remains."; $("vaultFeedback").className = "feedback error"; $("vaultInput").value = ""; $("vaultInput").focus(); playTone(170, .2); } });
  $("vaultInput").focus();
}
function revealCorrectCode(timeBonus) {
  finished = true; clearInterval(timerId); endInfo = { reason: "win", bonus: timeBonus, time: $("timer").textContent }; saveState();
  $("earnedKey").textContent = escapeCode; $("keyReveal").querySelector("span").textContent = "CORRECT ESCAPE CODE"; $("keyReveal").classList.remove("hidden");
  $("codeModal").classList.remove("hidden"); playTone(880, .25); setTimeout(() => playTone(1100, .3), 150);
  setTimeout(() => { $("keyReveal").classList.add("hidden"); $("codeModal").classList.add("hidden"); finishSuccess(timeBonus); }, 3000);
}
function finishSuccess(timeBonus) {
  celebrate("center", 90); document.body.classList.remove("mission-live"); document.body.classList.add("mission-victory");
  hideNotepadForEnd(); $("game").classList.add("hidden"); $("finalScreen").classList.remove("hidden");
  $("finalIcon").textContent = "✓"; $("finalIcon").style.color = "var(--green)"; $("finalIcon").style.borderColor = "var(--green)";
  $("finalTitle").textContent = "CONGRATULATIONS!"; $("finalMessage").textContent = `Your team unlocked the vault. ${timeBonus} bonus points earned for time remaining.`;
  populateResults();
}
function endMission(reason) {
  if (finished) return; document.body.classList.remove("mission-live"); document.body.classList.remove("traveling"); document.body.classList.add("mission-failed"); hideNotepadForEnd(); finished = true; clearInterval(timerId); endInfo = { reason, time: $("timer").textContent }; saveState(); $("game").classList.add("hidden"); $("finalScreen").classList.remove("hidden");
  $("finalIcon").textContent = "×"; $("finalIcon").style.color = "var(--red)"; $("finalIcon").style.borderColor = "var(--red)";
  if (reason === "time") { $("finalTitle").textContent = "TIME'S UP"; $("finalMessage").textContent = "The timer has ended. Reset the mission when the next team is ready."; }
  else { $("finalTitle").textContent = "VAULT SEALED"; $("finalMessage").textContent = "Both code attempts were used. Reset the mission for the next team."; }
  populateResults();
}
function populateResults() { $("finalTeam").textContent = activeTeamName || $("teamName").value.trim() || "Team"; $("finalScore").textContent = `${score} PTS`; $("finalTime").textContent = $("timer").textContent; if ($("leaderNote")) $("leaderNote").classList.add("hidden"); }
function restartMission() { clearState(); window.location.href = window.location.pathname; }
$("startBtn").addEventListener("click", () => startWithIntro()); $("teamName").addEventListener("keydown", e => { if (e.key === "Enter") startWithIntro(); });
$("answerForm").addEventListener("submit", submitAnswer); $("hintBtn").addEventListener("click", requestHint); $("restartBtn").addEventListener("click", restartMission);
$("soundToggle").textContent = "SFX: ON";
$("teamName").addEventListener("input", () => $("teamName").setCustomValidity(""));
$("roomPasscode").addEventListener("input", () => { const pos = $("roomPasscode").selectionStart; $("roomPasscode").value = $("roomPasscode").value.toUpperCase(); try { $("roomPasscode").setSelectionRange(pos, pos); } catch (_) {} $("roomPasscode").setCustomValidity(""); });
$("soundToggle").addEventListener("click", () => { soundOn = !soundOn; $("soundToggle").textContent = soundOn ? "SFX: ON" : "SFX: OFF"; if (soundOn) playTone(660); });

function hideNotepadForEnd() {
  const toggle = $("notepadToggle"), panel = $("notepadPanel");
  if (toggle) toggle.classList.add("hidden");
  if (panel) panel.classList.add("hidden");
  if (toggle) toggle.setAttribute("aria-expanded", "false");
}
function setNotepadOpen(open) {
  $("notepadPanel").classList.toggle("hidden", !open);
  $("notepadToggle").setAttribute("aria-expanded", String(open));
  $("notepadToggle").textContent = open ? "✎ CLOSE NOTEPAD" : "✎ TEAM NOTEPAD";
}
$("notepadToggle").addEventListener("click", () => setNotepadOpen($("notepadPanel").classList.contains("hidden")));
$("notepadClose").addEventListener("click", () => setNotepadOpen(false));
$("clearDrawing").addEventListener("click", () => {
  const canvas = $("drawingCanvas"), ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#ffffff"; ctx.fillRect(0, 0, canvas.width, canvas.height);
});
(function setupDrawingBoard() {
  const canvas = $("drawingCanvas"), ctx = canvas.getContext("2d");
  ctx.fillStyle = "#ffffff"; ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = "#08794b"; ctx.lineWidth = 3; ctx.lineCap = "round"; ctx.lineJoin = "round";
  let drawing = false;
  function point(event) {
    const rect = canvas.getBoundingClientRect();
    return { x: (event.clientX - rect.left) * canvas.width / rect.width, y: (event.clientY - rect.top) * canvas.height / rect.height };
  }
  canvas.addEventListener("pointerdown", event => {
    drawing = true; canvas.setPointerCapture(event.pointerId);
    const p = point(event); ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(p.x + .1, p.y + .1); ctx.stroke();
  });
  canvas.addEventListener("pointermove", event => {
    if (!drawing) return; const p = point(event); ctx.lineTo(p.x, p.y); ctx.stroke();
  });
  const stop = () => { drawing = false; ctx.beginPath(); };
  canvas.addEventListener("pointerup", stop); canvas.addEventListener("pointercancel", stop); canvas.addEventListener("lostpointercapture", stop);
})();

const themeNames = ["DARK", "LIGHT", "BLUE LIGHT", "HORROR", "OCEAN", "AMBER"];
let activeTheme = 0;
const themePalette = $("themePalette");
const themeToggle = $("themeToggle");
function applyTheme(index) {
  activeTheme = index;
  document.body.classList.remove("light-theme", "blue-light-theme", "horror-theme", "ocean-theme", "amber-theme");
  if (themeNames[index] === "LIGHT") document.body.classList.add("light-theme");
  if (themeNames[index] === "BLUE LIGHT") document.body.classList.add("blue-light-theme");
  if (themeNames[index] === "HORROR") document.body.classList.add("horror-theme");
  if (themeNames[index] === "OCEAN") document.body.classList.add("ocean-theme");
  if (themeNames[index] === "AMBER") document.body.classList.add("amber-theme");
  document.querySelector('meta[name="theme-color"]').setAttribute("content", ["#07110f", "#f4faf6", "#eef5ff", "#16090d", "#071a2c", "#1d1608"][index]);
  document.querySelectorAll(".theme-swatch").forEach(button => {
    const selected = Number(button.dataset.theme) === index;
    button.classList.toggle("selected", selected);
    button.setAttribute("aria-pressed", String(selected));
  });
}
function closeThemePalette() { themePalette.classList.add("hidden"); themeToggle.setAttribute("aria-expanded", "false"); }
themeToggle.addEventListener("click", () => {
  const opening = themePalette.classList.contains("hidden");
  themePalette.classList.toggle("hidden", !opening);
  themeToggle.setAttribute("aria-expanded", String(opening));
});
document.querySelectorAll(".theme-swatch").forEach(button => button.addEventListener("click", () => {
  applyTheme(Number(button.dataset.theme));
  closeThemePalette();
}));
document.addEventListener("click", event => {
  if (!event.target.closest(".theme-picker-wrap")) closeThemePalette();
});
document.addEventListener("keydown", event => { if (event.key === "Escape") closeThemePalette(); });
applyTheme(0);

function resumeMission() {
  if (/[?&]reset/.test(location.search)) { clearState(); history.replaceState(null, "", location.pathname); return; }
  let st; try { st = JSON.parse(localStorage.getItem(SAVE_KEY) || "null"); } catch (_) {}
  if (!st || !st.team) return;
  started = true; activeTeamName = st.team; deadline = st.deadline; score = st.score; hintsUsed = st.hintsUsed; completed = st.completed; hintShown = st.hintShown; vaultAttempts = st.vaultAttempts; currentStage = st.currentStage;
  $("activeTeam").textContent = st.team; $("briefing").classList.add("hidden"); $("homeHero").classList.add("hidden"); $("game").classList.remove("hidden");
  if (st.finished && st.end) { $("timer").textContent = st.end.time; if (st.end.reason === "win") { finishSuccess(st.end.bonus || 0); } else { endMission(st.end.reason); } return; }
  document.body.classList.add("mission-live"); $("notepadToggle").classList.remove("hidden");
  tick(); if (finished) return;
  const next = completed.findIndex(v => !v);
  if (next === -1) { setWorldScene(7); updateWorldMap(); updateSidebar(); showFinalVault(); } else renderStage(next);
  timerId = setInterval(tick, 1000);
}
