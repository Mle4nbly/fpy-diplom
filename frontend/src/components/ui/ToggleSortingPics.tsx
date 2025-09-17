export interface ToggleSortingPicsProps {
  onToggle: (type: 'list' | 'grid') => void,
  view: 'list' | 'grid'
}

export const ToggleSortingPics = ({ onToggle, view }: ToggleSortingPicsProps) => {
  return (
    <div>
      <button
        className={`btn me-2 ${view === "grid" ? "btn-primary" : "btn-outline-primary"}`}
        onClick={() => onToggle("grid")}
      >
        Карточки
      </button>
      <button
        className={`btn ${view === "list" ? "btn-primary" : "btn-outline-primary"}`}
        onClick={() => onToggle("list")}
      >
        Список
      </button>
    </div>
  );
}