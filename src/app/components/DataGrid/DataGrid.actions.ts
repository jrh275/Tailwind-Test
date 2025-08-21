import type { Action } from "./DataGrid.types";

export const defaultActions: Action[] = [
  { label: "EXPORT", onClick: () => console.log("Export clicked") },
  { label: "ADD", onClick: () => console.log("Add clicked"), primary: true },
];
