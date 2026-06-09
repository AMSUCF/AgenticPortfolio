/* =====================================================================
   decor.js — reusable ambient P5 sketch (90s / Memphis shapes).
   One factory, reused for every section background canvas.
   Exposes: window.makeDecorSketch(hostId, palette)
   ===================================================================== */

const REDUCED_MOTION =
  window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Shared palette pulled from CSS tokens (fallbacks if CSS not ready)
function cssVar(name, fallback) {
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return v || fallback;
}

window.makeDecorSketch = function makeDecorSketch(hostId, paletteOverride) {
  const host = document.getElementById(hostId);
  if (!host) return null;

  const sketch = (p) => {
    let shapes = [];
    let palette;

    function buildPalette() {
      palette = paletteOverride || [
        cssVar("--leaf", "#8BD450"),
        cssVar("--yolk", "#FFD93D"),
        cssVar("--sky", "#A2D2FF"),
        cssVar("--berry", "#FF6B6B"),
        cssVar("--pond", "#4E9F3D"),
      ];
    }

    function seedShapes() {
      const w = host.clientWidth || window.innerWidth;
      const h = host.clientHeight || 400;
      const count = Math.max(6, Math.round((w * h) / 90000)); // density scales with area
      const kinds = ["squiggle", "zigzag", "triangle", "dot", "starburst", "blob"];
      shapes = [];
      for (let i = 0; i < count; i++) {
        shapes.push({
          x: p.random(w), y: p.random(h),
          size: p.random(18, 52),
          kind: kinds[Math.floor(p.random(kinds.length))],
          col: palette[Math.floor(p.random(palette.length))],
          rot: p.random(p.TWO_PI),
          spin: p.random(-0.01, 0.01),
          drift: p.random(0.1, 0.5),
          phase: p.random(p.TWO_PI),
        });
      }
    }

    p.setup = function () {
      const w = host.clientWidth || window.innerWidth;
      const h = host.clientHeight || 400;
      const c = p.createCanvas(w, h);
      c.parent(host);
      p.strokeJoin(p.ROUND);
      p.strokeCap(p.ROUND);
      buildPalette();
      seedShapes();
      if (REDUCED_MOTION) { p.redraw(); p.noLoop(); }
    };

    p.windowResized = function () {
      const w = host.clientWidth || window.innerWidth;
      const h = host.clientHeight || 400;
      p.resizeCanvas(w, h);
      seedShapes();
      if (REDUCED_MOTION) p.redraw();
    };

    p.draw = function () {
      p.clear();
      const t = REDUCED_MOTION ? 0 : p.frameCount;
      for (const s of shapes) {
        const yy = REDUCED_MOTION ? s.y : s.y + Math.sin((t * 0.01) + s.phase) * 8;
        const rot = REDUCED_MOTION ? s.rot : s.rot + s.spin * t;
        drawShape(s.kind, s.x, yy, s.size, rot, s.col);
      }
    };

    function drawShape(kind, x, y, size, rot, col) {
      p.push();
      p.translate(x, y);
      p.rotate(rot);
      p.stroke("#3b7a2e");
      p.strokeWeight(2.5);
      p.fill(col);
      const r = size / 2;
      switch (kind) {
        case "triangle":
          p.triangle(-r, r, r, r, 0, -r);
          break;
        case "dot":
          p.circle(0, 0, size * 0.6);
          break;
        case "blob":
          p.beginShape();
          for (let a = 0; a < p.TWO_PI; a += p.TWO_PI / 8) {
            const rr = r * (0.7 + 0.3 * Math.sin(a * 3));
            p.curveVertex(Math.cos(a) * rr, Math.sin(a) * rr);
          }
          p.endShape(p.CLOSE);
          break;
        case "starburst":
          p.beginShape();
          for (let i = 0; i < 10; i++) {
            const a = (p.PI / 5) * i;
            const rr = i % 2 === 0 ? r : r * 0.45;
            p.vertex(Math.cos(a) * rr, Math.sin(a) * rr);
          }
          p.endShape(p.CLOSE);
          break;
        case "zigzag":
          p.noFill();
          p.beginShape();
          for (let i = -2; i <= 2; i++) {
            p.vertex(i * (size / 4), (i % 2 === 0 ? -r : r) * 0.5);
          }
          p.endShape();
          break;
        case "squiggle":
        default:
          p.noFill();
          p.beginShape();
          for (let i = 0; i <= 12; i++) {
            const xx = -r + (size / 12) * i;
            p.curveVertex(xx, Math.sin(i * 0.9) * (r * 0.4));
          }
          p.endShape();
          break;
      }
      p.pop();
    }
  };

  return new p5(sketch);
};
