import './subframe-ui.css'

function DropdownMenuRoot({ children }) {
  return <div className="sf-dropdown-menu">{children}</div>
}

function DropdownItem({ children, icon }) {
  return (
    <div className="sf-dropdown-item" role="menuitem">
      {icon ? <span className="sf-dropdown-icon">{icon}</span> : null}
      <span>{children}</span>
    </div>
  )
}

export const DropdownMenu = Object.assign(DropdownMenuRoot, { DropdownItem })
