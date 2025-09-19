export interface ToggleSortingPicsProps {
  onToggle: (type: 'list' | 'grid') => void,
  view: 'list' | 'grid'
}

export const ToggleSortingPics = ({ onToggle, view }: ToggleSortingPicsProps) => {
  return (
    <div className="btn-group ms-3">
      <button
        className={`btn ${view === "grid" ? "btn-primary" : "btn-outline-primary"}`}
        onClick={() => onToggle("grid")}
        title="Карточки"
      >
        Сетка
      </button>
      <button
        className={`btn ${view === "list" ? "btn-primary" : "btn-outline-primary"}`}
        onClick={() => onToggle("list")}
        title="Список"
      >
        Список
      </button>
    </div>
  );
}