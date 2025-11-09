export type DropdownItemType = {
  id: string,
  icon?: string,
  label: string,
  action: (...args: any) => void
}

export interface DropdownProps {
  id: number,
  label?: string,
  items: DropdownItemType[]
}

export const Dropdown = ({id, label, items}: DropdownProps) => {
  return (
    <div className="dropdown">
      <a
        href="#"
        className="btn btn-secondary btn-dropdown"
        role="button"
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
      </a>

      <ul
        className="dropdown-menu dropdown-menu-dark"
      >
        {items.map((i) => 
          <li key={i.id}>
            <a
              className="dropdown-item d-flex align-items-center"
              href="#"
              onClick={i.action}
            >
              {i.label}
            </a>
          </li>
        )}
      </ul>
    </div>
  )
}