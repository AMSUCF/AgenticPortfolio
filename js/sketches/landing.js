/* =====================================================================
   landing.js — Flash-style cartoon landing scene (Homestar Runner vibe).
   Decorative (aria-hidden); accessible content lives in HTML overlay.
   A pond world with a sun, lily pads, a blinking froggy + a lazy egg,
   drifting 90s shapes, and a short "loading..." preloader intro beat.
   ===================================================================== */

(function () {
  const host = document.getElementById("landingCanvas");
  if (!host || typeof p5 === "undefined") return;

  const reduced =
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const sketch = (p) => {
    let W, H;
    let intro = reduced ? 0 : 1;        // 1 = full preloader, ticks down to 0
    let confetti = [];
    const OUTLINE = "#3b7a2e";

    function dims() {
      W = host.clientWidth || window.innerWidth;
      H = host.clientHeight || window.innerHeight * 0.8;
    }

    function seedConfetti() {
      confetti = [];
      const kinds = ["star", "zig", "tri", "dot"];
      const cols = ["#FFD93D", "#A2D2FF", "#FF6B6B", "#8BD450"];
      const n = Math.max(8, Math.round(W / 80));
      for (let i = 0; i < n; i++) {
        confetti.push({
          x: p.random(W), y: p.random(H),
          s: p.random(10, 24),
          kind: kinds[i % kinds.length],
          col: cols[i % cols.length],
          rot: p.random(p.TWO_PI),
          spin: p.random(-0.02, 0.02),
          spd: p.random(0.15, 0.5),
        });
      }
    }

    p.setup = function () {
      dims();
      const c = p.createCanvas(W, H);
      c.parent(host);
      p.strokeJoin(p.ROUND);
      p.strokeCap(p.ROUND);
      seedConfetti();
      if (reduced) { p.redraw(); p.noLoop(); }
    };

    p.windowResized = function () {
      dims();
      p.resizeCanvas(W, H);
      seedConfetti();
      if (reduced) p.redraw();
    };

    p.draw = function () {
      const t = reduced ? 0 : p.frameCount;
      p.clear();

      // --- background confetti (90s shapes) ---
      for (const f of confetti) {
        const yy = reduced ? f.y : (f.y + t * f.spd) % (H + 40) - 20;
        const rot = reduced ? f.rot : f.rot + f.spin * t;
        drawConfetti(f.kind, f.x, yy, f.s, rot, f.col);
      }

      // --- sun (Gudetama yolk) ---
      drawSun(W * 0.84, H * 0.2, 70, t);

      // --- pond + lily pads ---
      drawPond(t);

      // --- characters ---
      const bob = reduced ? 0 : Math.sin(t * 0.05) * 5;
      drawFrog(W * 0.3, H * 0.66 + bob, t);
      const eggBob = reduced ? 0 : Math.sin(t * 0.05 + 1) * 4;
      drawEgg(W * 0.62, H * 0.74 + eggBob, t);

      // --- preloader intro beat (fades out) ---
      if (intro > 0) {
        drawPreloader(t);
        intro -= 0.012;
        if (intro < 0) intro = 0;
      }
    };

    /* ---------------- scene pieces ---------------- */

    function drawSun(x, y, r, t) {
      p.push();
      p.translate(x, y);
      p.stroke(OUTLINE); p.strokeWeight(3); p.fill("#FFD93D");
      const rays = 12;
      p.push();
      if (!reduced) p.rotate(t * 0.004);
      for (let i = 0; i < rays; i++) {
        p.rotate(p.TWO_PI / rays);
        p.triangle(r * 0.9, -8, r * 0.9, 8, r * 1.4, 0);
      }
      p.pop();
      p.circle(0, 0, r * 2);
      // sleepy gudetama face
      p.noStroke(); p.fill(OUTLINE);
      p.arc(-r * 0.32, -4, 14, 10, 0, p.PI);   // closed lazy eye
      p.arc(r * 0.32, -4, 14, 10, 0, p.PI);
      p.noFill(); p.stroke(OUTLINE); p.strokeWeight(2.5);
      p.arc(0, r * 0.28, 16, 12, 0.1, p.PI - 0.1); // tiny mouth
      p.pop();
    }

    function drawPond(t) {
      p.noStroke();
      p.fill("#A2D2FF");
      p.rect(0, H * 0.82, W, H * 0.18);
      // ripples
      p.noFill(); p.stroke("#7fbff0"); p.strokeWeight(2.5);
      for (let i = 0; i < 3; i++) {
        const off = reduced ? 0 : Math.sin(t * 0.04 + i) * 6;
        p.line(0, H * 0.86 + i * 14, W, H * 0.86 + i * 14 + off);
      }
      // lily pads
      drawLilyPad(W * 0.12, H * 0.86, 46);
      drawLilyPad(W * 0.78, H * 0.9, 60);
    }

    function drawLilyPad(x, y, r) {
      p.push(); p.translate(x, y);
      p.stroke(OUTLINE); p.strokeWeight(3); p.fill("#6BBF59");
      p.arc(0, 0, r, r * 0.7, 0.5, p.TWO_PI - 0.5, p.CHORD);
      p.pop();
    }

    function drawFrog(x, y, t) {
      const squash = reduced ? 1 : 1 + Math.sin(t * 0.05) * 0.03;
      p.push(); p.translate(x, y); p.scale(1 / squash, squash);
      p.stroke(OUTLINE); p.strokeWeight(3.5);
      // body
      p.fill("#8BD450");
      p.ellipse(0, 20, 120, 95);
      // eyes (bulgy)
      const blink = !reduced && (p.frameCount % 180 < 8); // periodic blink
      for (const sx of [-30, 30]) {
        p.fill("#8BD450"); p.circle(sx, -36, 46);
        p.fill("#fff"); p.circle(sx, -38, 30);
        if (blink) {
          p.stroke(OUTLINE); p.strokeWeight(3);
          p.line(sx - 12, -38, sx + 12, -38);
        } else {
          p.noStroke(); p.fill(OUTLINE); p.circle(sx + 3, -36, 12);
          p.fill("#fff"); p.circle(sx + 6, -39, 4);
          p.stroke(OUTLINE); p.strokeWeight(3);
        }
      }
      // cheeks
      p.noStroke(); p.fill("#FF6B6B"); p.circle(-40, 8, 16); p.circle(40, 8, 16);
      // smile
      p.noFill(); p.stroke(OUTLINE); p.strokeWeight(3.5);
      p.arc(0, 6, 70, 50, 0.15, p.PI - 0.15);
      p.pop();
    }

    function drawEgg(x, y, t) {
      const squash = reduced ? 1 : 1 + Math.sin(t * 0.05 + 1) * 0.03;
      p.push(); p.translate(x, y); p.scale(1 / squash, squash);
      // white
      p.stroke(OUTLINE); p.strokeWeight(3.5); p.fill("#FFFDF4");
      p.beginShape();
      for (let a = 0; a < p.TWO_PI; a += p.TWO_PI / 14) {
        const rr = 60 * (0.9 + 0.18 * Math.sin(a * 2 + 1));
        p.curveVertex(Math.cos(a) * rr * 1.1, Math.sin(a) * rr * 0.7 + 18);
      }
      p.endShape(p.CLOSE);
      // yolk
      p.fill("#FFD93D"); p.circle(0, 4, 70);
      // lazy face
      p.noStroke(); p.fill(OUTLINE);
      p.ellipse(-14, 0, 6, 10); p.ellipse(14, 0, 6, 10);
      p.noFill(); p.stroke(OUTLINE); p.strokeWeight(2.5);
      p.arc(0, 14, 18, 8, 0, p.PI);
      p.pop();
    }

    function drawConfetti(kind, x, y, s, rot, col) {
      p.push(); p.translate(x, y); p.rotate(rot);
      p.stroke(OUTLINE); p.strokeWeight(2.5); p.fill(col);
      const r = s / 2;
      if (kind === "tri") p.triangle(-r, r, r, r, 0, -r);
      else if (kind === "dot") p.circle(0, 0, s * 0.7);
      else if (kind === "star") {
        p.beginShape();
        for (let i = 0; i < 10; i++) {
          const a = (p.PI / 5) * i;
          const rr = i % 2 === 0 ? r : r * 0.45;
          p.vertex(Math.cos(a) * rr, Math.sin(a) * rr);
        }
        p.endShape(p.CLOSE);
      } else { // zig
        p.noFill();
        p.beginShape();
        for (let i = -2; i <= 2; i++) p.vertex(i * (s / 4), (i % 2 === 0 ? -r : r) * 0.5);
        p.endShape();
      }
      p.pop();
    }

    function drawPreloader(t) {
      p.push();
      p.noStroke();
      p.fill(255, 253, 244, 255 * Math.min(1, intro));
      p.rect(0, 0, W, H);
      p.translate(W / 2, H / 2);
      // spinning loader ring of dots (Flash preloader nostalgia)
      const dots = 8;
      for (let i = 0; i < dots; i++) {
        const a = (p.TWO_PI / dots) * i + t * 0.08;
        const alpha = (i / dots);
        p.fill(78, 159, 61, 255 * intro * (0.4 + alpha * 0.6));
        p.circle(Math.cos(a) * 34, Math.sin(a) * 34, 12);
      }
      p.fill(59, 122, 46, 255 * intro);
      p.textAlign(p.CENTER, p.CENTER);
      p.textStyle(p.BOLD);
      p.textSize(16);
      p.text("loading the pond…", 0, 64);
      p.pop();
    }
  };

  new p5(sketch);
})();
