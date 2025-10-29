export interface FileDropdownProps {
  id: number,
  onDelete: () => void,
  onEdit: () => void,
  onRename: () => void,
  onDownload: () => void,
}

export const FileDropdown = ({ id, onDelete, onEdit, onRename, onDownload }: FileDropdownProps) => {
  return (
    <div className="dropdown">
      <button
        className="btn btn-secondary btn-dropdown btn-secondary fw-bold"
        type="button"
        id={`dropdownMenuButton-${id}`}
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-three-dots"
          viewBox="0 0 16 16"
        >
          <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3" />
        </svg>
      </button>

      <ul
        className="dropdown-menu dropdown-menu-dark"
        aria-labelledby={`dropdownMenuButton-${id}`}
        data-popper-config='{"strategy":"fixed"}'
      >
        <li>
          <a
            onClick={onDownload}
            className="dropdown-item d-flex align-items-center"
            href="#"
          >
            Скачать
          </a>
        </li>
        <li>
          <a
            onClick={onRename}
            className="dropdown-item d-flex align-items-center"
            href="#"
          >
            Переименовать
          </a>
        </li>
        <li>
          <a
            onClick={onEdit}
            className="dropdown-item d-flex align-items-center"
            href="#"
          >
            Редактировать
          </a>
        </li>
        <li>
          <a
            onClick={onDelete}
            className="dropdown-item d-flex align-items-center"
            href="#"
          >
            Удалить
          </a>
        </li>
      </ul>
    </div>
  )
}