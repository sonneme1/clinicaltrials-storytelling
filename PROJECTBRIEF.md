## 📋 Project Brief

### What We're Building

A single-page, vertical scroll interactive data story built with plain HTML, CSS, and
JavaScript. There is no framework, no build tools, and no configuration overhead. The
goal is a polished, editorial-quality web experience that uses invented but realistic
data to tell a compelling story about who gets excluded from clinical trials — and why
that is a design problem, not a patient problem.

This is a **vibe coding project** — the emphasis is on the story, the visual design, and
the interactive moments. Build one chapter at a time. Start in Figma to nail the visual
language, then scaffold the HTML/CSS structure and wire in D3 for the funnel.

---

### Summary of Site

The site follows a fictional clinical trial's enrollment journey. At each stage of the
funnel, a new barrier is introduced — geography, transportation, digital access, work
schedule, language — and the pool of eligible patients shrinks. By the end, only 3% of
the people who were eligible ever enrolled. The final chapter reframes the story: what
if access had been designed in from the start?

**The story is the thing. Interaction is the icing.**

---

### Chapters / Layout

The site is a single-page, vertical scroll experience with 7 distinct chapters. Each
chapter has a headline, a human moment (a short vignette or pull quote from a fictional
patient), and a data visualization.

#### Chapter 0 — Hook / Title Screen
- Full-bleed opening
- Animated counter counts down from 10,000 to 312 on load
- A single provocative stat fades in:
  *"Only 3% of eligible patients ever enroll in a clinical trial."*
- Scroll prompt to begin

#### Chapter 1 — The Promise
- Brief framing of what clinical trials are and why they matter
- Simple, warm, editorial tone
- Sets up the stakes — no data visualization, just context

#### Chapter 2 — The Funnel ⭐ Centerpiece
- The enrollment funnel visualization
- Watch 10,000 people shrink to 312 as each barrier is applied
- Each step has a label, a number, and a one-line human reason
- Hover over each stage to reveal barrier detail and a fictional patient vignette

#### Chapter 3 — Where Are the Sites?
- Map visualization (Leaflet.js)
- Trial sites plotted against where patients actually live
- Drive-time rings (30 / 60 / 90 min) reveal the access gap visually
- Toggle between drive-time ring distances

#### Chapter 4 — Who Gets Filtered Out?
- Bar or dot matrix chart showing dropout by barrier type
- Toggle between barrier types
- Filter by demographic group: age, income bracket, rural vs. urban

#### Chapter 5 — The Representation Gap
- Side-by-side comparison chart
- Who enrolled vs. who the disease actually affects in the general population
- Broken down by race, age, income, and geography
- The gap is the story

#### Chapter 6 — What If?
- The reframe chapter
- "What If" slider: drag between current model and designed-for-access model
- Enrollment climbs when decentralized trials, telehealth, translated materials,
  and transportation stipends are introduced
- Makes the point clearly: **this is a design problem, not a patient problem**

#### Chapter 7 — Call to Reflection
- No data — just a closing thought
- Pull quote: *"The next breakthrough might depend on who we remember to include."*
- Small "About the Data" note explaining data is simplified and illustrative

---

### Data

All data is **invented but grounded in real patterns**. Use the values below as your
dataset. These live in `data/data.js`.

#### Enrollment Funnel

| Stage | # of People | % Remaining |
|---|---|---|
| Aware of trial | 10,000 | 100% |
| Meets eligibility criteria | 4,200 | 42% |
| Can reach trial site | 2,100 | 21% |
| Has reliable transportation | 1,400 | 14% |
| Can take time off work | 900 | 9% |
| Has internet/device for digital steps | 620 | 6.2% |
| Speaks primary language of trial materials | 480 | 4.8% |
| Enrolled | 312 | 3.1% |

#### Barrier Breakdown (% of drop-off by category)

| Barrier | % of Drop-off |
|---|---|
| Geography / distance | 28% |
| Transportation | 18% |
| Work schedule / lost wages | 16% |
| Digital access | 14% |
| Language | 13% |
| Insurance / cost | 11% |

#### Demographic Representation Gap

| Group | Enrolled (%) | Affected in Population (%) |
|---|---|---|
| Black patients | 5% | 15% |
| Hispanic / Latino patients | 4% | 12% |
| Rural patients | 8% | 20% |
| Patients over 65 | 12% | 31% |
| Patients under $40K income | 9% | 24% |

#### "What If" Comparison

| Model | Enrolled |
|---|---|
| Current (traditional) | 312 |
| Designed for access | 847 |

#### Key Metrics (use as headline callouts throughout)

| Metric | Value |
|---|---|
| Eligible patients who never enroll | ~97% |
| Average drive distance to nearest trial site | 49 miles |
| Trials that fail due to under-enrollment | ~80% |
| Patients citing transportation as a barrier | ~35% |
| Trials with materials in only one language | ~72% |
| Enrollment increase with decentralized model | +38% |
| Black patients: enrolled vs. affected gap | 3x underrepresented |
| Rural patients: enrolled vs. affected gap | 2.5x underrepresented |

---

### Fictional Patient Personas

These three personas appear as pull quotes and vignettes throughout the story,
particularly in the funnel hover states (Chapter 2). They make the data human.

---

#### Persona 1 — Maria Delgado
**Age:** 54 | **Location:** Rural southern Minnesota | **Condition:** Type 2 Diabetes

> *"My doctor mentioned the study, but the paperwork was all in English. My daughter
> helped me fill it out, but she works two jobs. By the time we got it done, the
> enrollment window had closed."*

**Barriers:** Language, transportation, distance (67 miles one way), visit frequency

**What would have helped:** Translated materials, telehealth intake option,
transportation stipend, local satellite site

---

#### Persona 2 — Darnell Washington
**Age:** 41 | **Location:** North Minneapolis, MN | **Condition:** Hypertension

> *"I looked it up online and I qualified for everything. But when I called, they said
> I needed to come in three times in the first month. I can't miss three days of work.
> I don't get paid if I don't show up."*

**Barriers:** Work schedule, lost wages, transit access (45 min / 2 bus transfers),
historical distrust of medical research

**What would have helped:** Evening/weekend appointments, compensation for time and
travel, accessible site location, community outreach through trusted local organizations

---

#### Persona 3 — Ruth Halverson
**Age:** 71 | **Location:** Duluth, MN | **Condition:** Early-stage Alzheimer's

> *"My son set up the computer tablet for me, but I couldn't figure out the portal.
> I called the number on the letter and it just rang. I didn't know what to do next,
> so I gave up."*

**Barriers:** Digital literacy, no nearby support person, complex multi-step digital
enrollment, condition-specific navigation challenges

**What would have helped:** Paper enrollment option, dedicated patient navigator,
caregiver-inclusive onboarding path

---

### Interactions

Every interaction should deepen understanding — not just add novelty.

| Interaction | Chapter | Purpose |
|---|---|---|
| Animated counter (10,000 → 312) | 0 — Hook | Immediate emotional impact on load |
| Scroll-triggered animations | All chapters | Reveal data progressively, build tension |
| Funnel step hover | 2 — The Funnel | Reveal barrier detail + patient vignette |
| Map drive-time toggle (30/60/90 min) | 3 — Where Are the Sites? | Show realistic reach visually |
| Barrier type toggle | 4 — Who Gets Filtered Out? | See which demographic is most affected |
| Demographic filter | 4 & 5 | Filter by age, income, rural/urban |
| "What If" slider | 6 — What If? | Drag between current and access-designed model |
| Shareable stat callouts | Key data moments | Small share icon on headline stats |

---

### Style

#### Example of Visual Storytelling
https://features.csis.org/hiddenreach/china-shipyard-tiers/


#### Color Palette

| Role | Color | Hex |
|---|---|---|
| Background | Deep navy | `#0D1B2A` |
| Primary accent | Warm teal | `#2EC4B6` |
| Barrier / loss | Muted amber/rust | `#E07A5F` |
| Body text | Off-white | `#F4F1DE` |
| Supporting data | Soft slate | `#8DA9C4` |

#### Typography

| Role | Font | Why |
|---|---|---|
| Headlines | Playfair Display or Lora | Humanist serif — editorial weight and warmth |
| Body / labels | Inter or DM Sans | Clean, readable at small sizes |
| Data callouts | Monospace / tabular figures | Reinforces data credibility |

#### Visual Style Guidelines

- Generous white space — let the data breathe
- Thin, elegant chart lines and shapes — not chunky or dashboard-like
- Subtle grain or texture on backgrounds — adds warmth, avoids sterile feel
- Patient vignettes styled as pull quotes with a thin left-border rule
- Funnel visualization should feel like people *disappearing* — use dot/person
  iconography rather than just shrinking bars

---

### Accessibility

Given the subject matter (healthcare equity), accessibility is non-negotiable:

- Maintain sufficient color contrast on all text and chart elements
- Provide text alternatives for all charts and visualizations
- Ensure keyboard navigation works throughout
- Do not rely on color alone to convey meaning in charts

---

### About the Data

> All data in this project is **simplified and illustrative**. It is not sourced from
> a specific study or institution. Values are invented to be directionally realistic
> and to serve the narrative. This project is a design exercise, not a research report.