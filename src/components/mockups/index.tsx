import type { ComponentType } from "react";
import type { ProjectId } from "@/data/projects";
import { TeleXMock } from "./TeleXMock";
import { MiriusMock } from "./MiriusMock";
import { NisaMock } from "./NisaMock";
import { BookFlixMock } from "./BookFlixMock";
import { GoLedgerMock } from "./GoLedgerMock";
import { OfflineRagMock } from "./OfflineRagMock";

export const MOCKUPS: Record<ProjectId, ComponentType> = {
  telex: TeleXMock,
  mirius: MiriusMock,
  nisa: NisaMock,
  bookflix: BookFlixMock,
  goledger: GoLedgerMock,
  "offline-rag": OfflineRagMock,
};
