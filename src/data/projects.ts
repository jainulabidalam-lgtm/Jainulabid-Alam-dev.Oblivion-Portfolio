export type ProjectId = "telex" | "mirius" | "nisa" | "bookflix" | "goledger" | "offline-rag";

export interface Project {
  id: ProjectId;
  title: string;
  kicker: string;
  summary: string;
  tags: string[];
  status: "Built" | "In progress";
}

// Descriptions are intentionally limited to what is known about each project.
export const PROJECTS: Project[] = [
  {
    id: "telex",
    title: "TeleX",
    kicker: "Messaging",
    summary: "A real-time messaging interface.",
    tags: ["Messaging", "Real-time"],
    status: "Built",
  },
  {
    id: "mirius",
    title: "Mirius AI",
    kicker: "AI assistant",
    summary: "An AI assistant interface that retrieves from sources before it answers.",
    tags: ["AI assistant", "Retrieval"],
    status: "Built",
  },
  {
    id: "nisa",
    title: "NISA Boutique",
    kicker: "Commerce",
    summary: "A fashion e-commerce storefront with an editorial feel.",
    tags: ["E-commerce", "Fashion"],
    status: "Built",
  },
  {
    id: "bookflix",
    title: "BookFlix",
    kicker: "Digital library",
    summary: "A digital library and book discovery experience.",
    tags: ["Digital library", "Discovery"],
    status: "Built",
  },
  {
    id: "goledger",
    title: "GoLedger",
    kicker: "Ledger",
    summary: "A ledger application. Still in progress.",
    tags: ["Ledger", "In progress"],
    status: "In progress",
  },
  {
    id: "offline-rag",
    title: "Offline AI / RAG",
    kicker: "Local AI",
    summary: "Retrieval-augmented generation that runs locally, without a network connection.",
    tags: ["Local AI", "RAG", "Offline"],
    status: "Built",
  },
];
