import './subframe-ui.css'

export function IconButton({ icon, className = '', size = 'small', ...props }) {
  return (
    <button type="button" className={`sf-icon-button sf-icon-button-${size} ${className}`} {...props}>
      {icon ? icon : <span className="sf-icon-button-dot" aria-hidden="true" />}
    </button>
  )
}
