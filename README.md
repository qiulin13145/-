# Qiulin Shang — Personal Homepage

Personal academic homepage for **Qiulin Shang**, hosted with GitHub Pages at `https://qiulin13145.github.io/`.

The site is intentionally lightweight: plain HTML, CSS, and JavaScript with no build step.

## Current content

- Personal introduction and contact information
- Research interests: Learning to Optimize, LLM Efficient Pretraining, and AI4AI
- Selected paper and project links
- Education timeline at Peking University
- Personal portrait and branded visual direction

## Interaction design

The homepage uses subtle, dependency-free motion including scroll reveals, parallax background elements, card tilt and spotlight effects, magnetic buttons, animated timeline markers, and a scroll progress indicator. `prefers-reduced-motion` is respected.

## Local preview

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## GitHub Pages

This repository is already named `qiulin13145.github.io`. To publish from the repository root, use:

**Settings → Pages → Deploy from a branch → main / (root)**

## Structure

- `index.html` — content and semantic structure
- `styles.css` — responsive visual system and motion
- `script.js` — navigation, reveal, tilt, parallax, and magnetic interactions
- `assets/qiulin-shang.jpg` — portrait used in the hero
- `assets/hero-art.svg` — lightweight decorative mountain artwork retained for future use
