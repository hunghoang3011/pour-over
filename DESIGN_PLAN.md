# DESIGN_PLAN — Pour Over Visual Redesign

Repo: https://github.com/hunghoang3011/pour-over
File: `index.html` (single-file vanilla HTML/CSS/JS)

---

## Phase 1 — Audit (existing interface)

### What exists (preserved verbatim in redesign)

**Data model** — 4 coffees × 6 brewing methods = 24 recipes, unchanged:

| Coffee | Roast | Origin |
|--------|-------|--------|
| Karina | Light | Colombia Tolima Villa Karina – Geisha Washed |
| Sidra | Extremely Light | Colombia Café Granja La Esperanza – Sidra Washed |
| Kenya | Natural | Kenya Geisha — Kirinyaga County |
| HACHI | Light | HACHI LOT 41 – SŌNGLÁN (松岚), Vân Nam, Trung Quốc |

| Method | Type | Ice? |
|--------|------|------|
| Switch Nóng | Valve hybrid | No |
| V60 Nóng | Percolation | No |
| Flat-bottom Nóng | Percolation | No |
| Switch Đá | Valve hybrid | Yes (70 g) |
| V60 Đá | Percolation | Yes (70 g) |
| Flat-bottom Đá | Percolation | Yes (70 g) |

**Per-recipe fields** (kept exactly): C40 thường, C40 Red Clix, hotWater, ice, temp, time, flow, steps (time / cumulative water / note / valve state), notes, goal, tasting, beanNote, pick (preferred method), why, adjust.

**Interactions** (kept): coffee chip selection, method chip selection, matrix row click to switch method, `localStorage` persistence of `{coffee, dripper}`, state restore on load.

### Current design problems (slop)

1. **Yellow/orange accent** (`#c9a25a` / `#e8a04c`) — too saturated, reads as generic SaaS, visually loud.
2. **Glassmorphism sticky header** — `backdrop-filter` + `color-mix` mix, cliché and heavy.
3. **Pill chips** (`border-radius: 999px`) — overused, arbitrary.
4. **Inset box-shadow on selected matrix row** — decorative, no editorial purpose.
5. **6 identical stat boxes** — repetitive card grid, template aesthetic.
6. **Emoji stars (`★`, `❋`)** as decoration — arbitrary icons.
7. **Dashed borders on steps** — noisy, low-precision.
8. **Centered, "equal" layout** — no visual hierarchy, no asymmetric editorial composition.
9. **Default system font stack** — no typographic personality, no serif/display contrast.
10. **Too many borders** — card-on-card, every section boxed.

---

## Phase 2 — Design specification

### Creative direction

**Editorial coffee journal** — Japanese editorial design + Scandinavian minimalism + Swiss International Typographic Style. Feels like a premium brewing instrument, not a dashboard.

### Color palette (design tokens)

| Token | Value | Role |
|-------|-------|------|
| `--paper` | `#f5f1e8` | Background — warm off-white / natural paper |
| `--paper-2` | `#faf7f0` | Slight lift for active/pressed states |
| `--ink` | `#1a1610` | Primary text — deep charcoal |
| `--ink-2` | `#5c5143` | Secondary text |
| `--mut` | `#8c7f6c` | Muted captions / meta |
| `--hair` | `#d9ceb8` | Hairline separators |
| `--acc` | `#4c6b52` | Muted forest green — primary accent (active states, selected indicators) |
| `--acc-ink` | `#3a523e` | Darker green for text on light bg |
| `--olive` | `#8a6d3b` | Secondary accent (bloom / warm notes) |
| `--terracotta` | `#a14228` | Restrained terracotta — valve closed / warnings |

Only **one** accent (`--acc`) is used for selection/state. `--olive` and `--terracotta` appear only in functional labels (bloom, valve closed). No gradients, no glows.

### Typography system

| Role | Font | Use |
|------|------|-----|
| Display / headings | `Fraunces` (serif, editorial) | Masthead title, recipe names, section kickers |
| UI / body | `Inter` (sans-serif) | Body text, controls, measurements |
| Mono | `IBM Plex Mono` | Times, ratios, click numbers, technical data |

Type scale:
- Masthead: `clamp(40px, 10vw, 56px)`, serif, tight letter-spacing
- Recipe name: `clamp(24px, 5vw, 30px)`, serif
- Section kicker: `10px`, mono, uppercase, wide letter-spacing
- Body: `14.5px`, sans-serif, `1.62` line-height
- Measurements (time, water, temp): serif, larger, tabular-nums
- Meta/caption: `10-11px`, mono, muted

### Spacing & layout system

- Base unit: `8px`. Gaps and padding use multiples of 4/8.
- Max content width: `700px`, centered, `20px` side padding.
- iOS safe areas respected (`env(safe-area-inset-*)`).
- Hairline rules (`1px var(--hair)`) replace cards and boxes.
- Generous whitespace between sections; no cramped grids.

### Component redesign strategy

| Component | Before | After |
|-----------|--------|-------|
| Masthead | Default `h1` + paragraph | Editorial masthead: large serif title, kicker, premise line, hairline rule |
| Coffee selector | Pill chips | Horizontal list, numbered (`01`, `02`, `03`), selected = ink background, mono number |
| Method selector | Pill chips + star emoji | Horizontal scrollable, ice dot indicator, `★` only as text marker for pick |
| Recipe container | Card with border-radius + shadow | `sheet` with hairline border, no shadow, no rounded excess |
| Stats strip | 6 identical stat boxes | Single horizontal spec line (C40 · Red Clix · Water · Temp · Finish), hairline top/bottom |
| Steps timeline | Dashed borders + circle pills | Left-aligned dot timeline, hairline vertical line, time on left, cumulative water on right, valve state as small text pill |
| Matrix table | Accent header bg, inset shadow on selected | Clean table, hairline rules, selected row = subtle tint + left accent border |
| Tables | Card background + borders | Hairline rules only, mono numbers, muted headers |
| Details/accordions | Card + chevron emoji | Top/bottom hairline, `+` / `−` mono toggle, no card bg |

### Mobile interaction strategy

- Sticky selector respects `safe-area-inset-top`.
- Touch targets ≥ 44px.
- Horizontal scroll for method tabs and tables, with visual fade/scroll indicator.
- No horizontal overflow on any viewport.
- Focus-visible ring for keyboard accessibility.
- `scroll-margin-top` on recipe sheet so sticky header doesn't cover it.

### Functional preservation checklist (must not change)

- [ ] All 18 recipe parameters identical (k7, m40, hotWater, ice, temp, time, flow)
- [ ] All step arrays identical (time, cumulative water, note, valve)
- [ ] Valve open/closed logic unchanged
- [ ] Coffee/method filtering via chips unchanged
- [ ] Matrix row click switches method
- [ ] `localStorage` key `pourover` unchanged
- [ ] Dial-in table content unchanged
- [ ] Common notes / bean notes content unchanged
- [ ] All copy (Vietnamese) unchanged

---

## Phase 3 — Implementation

Implement in `index.html` only (no frameworks, no build step). Single CSS variables block, semantic HTML, vanilla JS.

---

## Phase 4 — Verification

- [ ] All 4 coffees × 6 methods render correct parameters
- [ ] Valve states (open/closed/bloom) correct per step
- [ ] Cumulative water math correct
- [ ] Matrix row click switches method
- [ ] localStorage persists selection
- [ ] Mobile layout: no overflow, touch targets ≥ 44px, safe areas
- [ ] No console errors
- [ ] Print styles acceptable

---

## Phase 5 — Final report

Summarize visual changes, UX improvements, preserved functionality, remaining issues.