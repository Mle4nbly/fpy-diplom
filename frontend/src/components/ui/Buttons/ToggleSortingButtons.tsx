export interface ToggleSortingButtonsProps {
  viewType: "GRID" | "LIST",
  setViewType: (view: "GRID" | "LIST") => void
}

export const ToggleSortingButtons = ({viewType, setViewType}: ToggleSortingButtonsProps) => {
  return (
    <div className="btn-group ms-3">
      <button
        className={`btn ${viewType === "GRID" ? "btn-secondary" : "btn-outline-secondary"}`}
        onClick={() => setViewType("GRID")}
        title="Карточки"
      >
        Сетка
      </button>
      <button
        className={`btn ${viewType === "LIST" ? "btn-secondary" : "btn-outline-secondary"}`}
        onClick={() => setViewType("LIST")}
        title="Список"
      >
        Список
      </button>
    </div>
  );
}