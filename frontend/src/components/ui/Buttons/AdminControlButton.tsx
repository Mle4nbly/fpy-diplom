export interface AdminControlButtonProps {
  isAdmin: boolean,
  onClick: () => void
}

export const AdminControlButton = ({isAdmin, onClick}: AdminControlButtonProps) => {
  return (
    <button className={`btn btn-outline-danger ${isAdmin ? 'active' : ''}`} onClick={onClick}>
      Админ
    </button>
  )
}