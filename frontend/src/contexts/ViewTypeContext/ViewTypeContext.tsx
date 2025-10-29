import { createContext } from "react";

export type ViewTypeContextType = {
  viewType: "GRID" | "LIST",
  setViewType: (view: "GRID" | "LIST") => void
}

export const ViewTypeContext = createContext<ViewTypeContextType>({
  viewType: "LIST",
  setViewType: () => {},
})