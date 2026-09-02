/**
 * data.js
 * All data below is INVENTED but directionally realistic — grounded in patterns
 * reported in real clinical trial enrollment / health equity research.
 * Nothing here is sourced from a specific study or institution.
 */

const TRIAL_DATA = {

  // ---------------------------------------------------------------------
  // Chapter 0 / 2 — Enrollment funnel
  // ---------------------------------------------------------------------
  funnel: [
    {
      stage: "Aware of trial",
      count: 10000,
      percent: 100,
      barrier: null,
      reason: "The starting pool — everyone who saw a flyer, heard from a doctor, or found the trial online.",
    },
    {
      stage: "Meets eligibility criteria",
      count: 4200,
      percent: 42,
      barrier: "Clinical eligibility",
      reason: "Nearly 6 in 10 are screened out by age, comorbidities, prior treatments, or lab values.",
    },
    {
      stage: "Can reach trial site",
      count: 2100,
      percent: 21,
      barrier: "Geography / distance",
      reason: "Half of eligible patients live too far from the nearest site to attend routine visits.",
    },
    {
      stage: "Has reliable transportation",
      count: 1400,
      percent: 14,
      barrier: "Transportation",
      reason: "No car, no rideshare access, or unreliable transit make repeat visits unworkable.",
    },
    {
      stage: "Can take time off work",
      count: 900,
      percent: 9,
      barrier: "Work schedule / lost wages",
      reason: "Hourly and shift workers can't afford unpaid time for daytime study visits.",
    },
    {
      stage: "Has internet/device for digital steps",
      count: 620,
      percent: 6.2,
      barrier: "Digital access",
      reason: "E-consent, portals, and remote monitoring assume broadband and a personal device.",
    },
    {
      stage: "Speaks primary language of trial materials",
      count: 480,
      percent: 4.8,
      barrier: "Language",
      reason: "Consent forms and instructions are rarely translated beyond English and Spanish.",
    },
    {
      stage: "Enrolled",
      count: 312,
      percent: 3.1,
      barrier: "Insurance / cost",
      reason: "Copays, travel costs, and lost wages push out those who made it this far.",
    },
  ],

  // ---------------------------------------------------------------------
  // Chapter 4 — Barrier breakdown (% of total drop-off attributable to each)
  // ---------------------------------------------------------------------
  barriers: [
    { id: "geography", label: "Geography / distance", percent: 28, color: "#E07A5F" },
    { id: "transportation", label: "Transportation", percent: 18, color: "#E8956F" },
    { id: "work", label: "Work schedule / lost wages", percent: 16, color: "#EFAA7B" },
    { id: "digital", label: "Digital access", percent: 14, color: "#8DA9C4" },
    { id: "language", label: "Language", percent: 13, color: "#6F93B5" },
    { id: "insurance", label: "Insurance / cost", percent: 11, color: "#597CA0" },
  ],

  // Barrier impact broken down by demographic cut, for Chapter 4 filter/toggle.
  // Values = % of that group's drop-off attributed to the barrier (rows sum to 100).
  barriersByDemographic: {
    age: {
      "18-34": { geography: 22, transportation: 14, work: 26, digital: 8, language: 12, insurance: 18 },
      "35-49": { geography: 24, transportation: 16, work: 24, digital: 10, language: 12, insurance: 14 },
      "50-64": { geography: 29, transportation: 19, work: 13, digital: 15, language: 12, insurance: 12 },
      "65+":   { geography: 34, transportation: 24, work: 4,  digital: 22, language: 9,  insurance: 7 },
    },
    income: {
      "under_40k":   { geography: 27, transportation: 25, work: 22, digital: 16, language: 15, insurance: 20 },
      "40k_80k":     { geography: 26, transportation: 17, work: 18, digital: 13, language: 12, insurance: 12 },
      "80k_120k":    { geography: 29, transportation: 12, work: 11, digital: 9,  language: 8,  insurance: 6 },
      "over_120k":   { geography: 31, transportation: 8,  work: 7,  digital: 6,  language: 4,  insurance: 3 },
    },
    geography: {
      rural: { geography: 41, transportation: 27, work: 15, digital: 21, language: 6, insurance: 12 },
      urban: { geography: 17, transportation: 12, work: 17, digital: 8,  language: 19, insurance: 10 },
    },
  },

  // ---------------------------------------------------------------------
  // Chapter 5 — Representation gap: enrolled vs. affected in population
  // ---------------------------------------------------------------------
  representationGap: [
    { group: "Black patients", enrolledPercent: 5, affectedPercent: 15, gapMultiplier: 3.0 },
    { group: "Hispanic / Latino patients", enrolledPercent: 4, affectedPercent: 12, gapMultiplier: 3.0 },
    { group: "Rural patients", enrolledPercent: 8, affectedPercent: 20, gapMultiplier: 2.5 },
    { group: "Patients over 65", enrolledPercent: 12, affectedPercent: 31, gapMultiplier: 2.6 },
    { group: "Patients under $40K income", enrolledPercent: 9, affectedPercent: 24, gapMultiplier: 2.7 },
    { group: "Native American patients", enrolledPercent: 1, affectedPercent: 3, gapMultiplier: 3.0 },
    { group: "Non-English primary speakers", enrolledPercent: 3, affectedPercent: 11, gapMultiplier: 3.7 },
  ],

  // ---------------------------------------------------------------------
  // Chapter 6 — "What If" comparison model
  // ---------------------------------------------------------------------
  whatIf: {
    current: {
      label: "Current model",
      enrolled: 312,
      funnel: [10000, 4200, 2100, 1400, 900, 620, 480, 312],
    },
    designed: {
      label: "Designed for access",
      enrolled: 847,
      funnel: [10000, 4200, 3400, 2650, 2200, 1850, 1120, 847],
      interventions: [
        { name: "Decentralized / mobile visits", liftPercent: 38 },
        { name: "Telehealth intake & monitoring", liftPercent: 24 },
        { name: "Translated materials (6 languages)", liftPercent: 19 },
        { name: "Transportation stipends", liftPercent: 22 },
        { name: "Evening & weekend visit windows", liftPercent: 17 },
      ],
    },
  },

  // ---------------------------------------------------------------------
  // Chapter 3 — Map: trial sites vs. patient population centers (fictional, MN-based)
  // ---------------------------------------------------------------------
  trialSites: [
    { id: "site1", name: "Twin Cities Metro Research Center", lat: 44.9778, lng: -93.2650, city: "Minneapolis, MN" },
    { id: "site2", name: "St. Paul Clinical Partners", lat: 44.9537, lng: -93.0900, city: "St. Paul, MN" },
    { id: "site3", name: "Rochester Regional Trial Site", lat: 44.0121, lng: -92.4802, city: "Rochester, MN" },
  ],

  // Fictional patient population centers with distance to nearest trial site.
  patientPopulationCenters: [
    { name: "Minneapolis, MN", lat: 44.9778, lng: -93.2650, patients: 2400, driveMinutes: 12 },
    { name: "St. Paul, MN", lat: 44.9537, lng: -93.0900, patients: 1800, driveMinutes: 15 },
    { name: "Duluth, MN", lat: 46.7867, lng: -92.1005, patients: 620, driveMinutes: 145 },
    { name: "Rochester, MN", lat: 44.0121, lng: -92.4802, patients: 540, driveMinutes: 8 },
    { name: "Mankato, MN", lat: 44.1636, lng: -93.9994, patients: 410, driveMinutes: 78 },
    { name: "Fergus Falls, MN", lat: 46.2830, lng: -96.0776, patients: 210, driveMinutes: 165 },
    { name: "Worthington, MN", lat: 43.6191, lng: -95.5964, patients: 180, driveMinutes: 132 },
    { name: "International Falls, MN", lat: 48.6011, lng: -93.4108, patients: 95, driveMinutes: 230 },
    { name: "Willmar, MN", lat: 45.1219, lng: -95.0433, patients: 260, driveMinutes: 68 },
    { name: "Winona, MN", lat: 44.0499, lng: -91.6393, patients: 230, driveMinutes: 52 },
  ],

  // ---------------------------------------------------------------------
  // Key headline metrics — used as callouts throughout the story
  // ---------------------------------------------------------------------
  keyMetrics: [
    { id: "never-enroll", value: "~97%", label: "Eligible patients who never enroll" },
    { id: "drive-distance", value: "49 mi", label: "Average drive distance to nearest trial site" },
    { id: "underenrolled-failure", value: "~80%", label: "Trials that fail due to under-enrollment" },
    { id: "transportation-barrier", value: "~35%", label: "Patients citing transportation as a barrier" },
    { id: "single-language", value: "~72%", label: "Trials with materials in only one language" },
    { id: "decentralized-lift", value: "+38%", label: "Enrollment increase with decentralized model" },
    { id: "black-gap", value: "3x", label: "Black patients: enrolled vs. affected gap" },
    { id: "rural-gap", value: "2.5x", label: "Rural patients: enrolled vs. affected gap" },
  ],

  // ---------------------------------------------------------------------
  // Fictional patient personas — used in funnel hover states + pull quotes
  // ---------------------------------------------------------------------
  personas: [
    {
      id: "maria",
      name: "Maria Delgado",
      age: 54,
      location: "Rural southern Minnesota",
      condition: "Type 2 Diabetes",
      quote: "My doctor mentioned the study, but the paperwork was all in English. My daughter helped me fill it out, but she works two jobs. By the time we got it done, the enrollment window had closed.",
      barriers: ["Language", "Transportation", "Distance (67 miles one way)", "Visit frequency"],
      wouldHaveHelped: ["Translated materials", "Telehealth intake option", "Transportation stipend", "Local satellite site"],
      linkedStage: "Speaks primary language of trial materials",
    },
    {
      id: "darnell",
      name: "Darnell Washington",
      age: 41,
      location: "North Minneapolis, MN",
      condition: "Hypertension",
      quote: "I looked it up online and I qualified for everything. But when I called, they said I needed to come in three times in the first month. I can't miss three days of work. I don't get paid if I don't show up.",
      barriers: ["Work schedule", "Lost wages", "Transit access (45 min / 2 bus transfers)", "Historical distrust of medical research"],
      wouldHaveHelped: ["Evening/weekend appointments", "Compensation for time and travel", "Accessible site location", "Community outreach through trusted local organizations"],
      linkedStage: "Can take time off work",
    },
    {
      id: "ruth",
      name: "Ruth Halverson",
      age: 71,
      location: "Duluth, MN",
      condition: "Early-stage Alzheimer's",
      quote: "My son set up the computer tablet for me, but I couldn't figure out the portal. I called the number on the letter and it just rang. I didn't know what to do next, so I gave up.",
      barriers: ["Digital literacy", "No nearby support person", "Complex multi-step digital enrollment", "Condition-specific navigation challenges"],
      wouldHaveHelped: ["Paper enrollment option", "Dedicated patient navigator", "Caregiver-inclusive onboarding path"],
      linkedStage: "Has internet/device for digital steps",
    },
  ],
};
