// Edit this file with your real details. Nothing here is invented on your behalf:
// anything marked PLACEHOLDER must be replaced before you publish.

export const PROFILE = {
  name: "Your Name", // PLACEHOLDER
  role: "Software engineer",
  email: "hello@example.com", // PLACEHOLDER
  // Add real links only; empty list renders nothing.
  links: [] as { label: string; href: string }[],
  headline: "I build software across the stack, from real-time chat to local AI.",
  intro:
    "Six projects spanning messaging, AI assistants, commerce, a digital library, a ledger, and offline retrieval. Each one below, in the order I'd show you in person.",
  about: [
    "I'm a software engineer who likes taking a product idea all the way to a working interface. The projects here cover very different problems, but they share a habit: start from what the person using it needs, then build the simplest system that delivers it.",
    "Some of them are finished, one is still in progress and labelled as such. I'd rather show honest work than inflated claims.",
  ],
};

export const SKILL_GROUPS: { title: string; items: string[] }[] = [
  { title: "Front end", items: ["React", "TypeScript", "Vite", "HTML & CSS", "CSS 3D & SVG"] },
  {
    title: "Product areas",
    items: ["Real-time messaging", "AI assistants", "E-commerce", "Digital libraries", "Ledgers"],
  },
  { title: "AI systems", items: ["Retrieval-augmented generation", "Local / offline AI"] },
];
