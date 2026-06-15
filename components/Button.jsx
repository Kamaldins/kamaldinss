import './subframe-ui.css'

export function Button({ children, className = '', size = 'small', variant = 'brand-tertiary', ...props }) {
  return (
    <button className={`sf-button sf-button-${size} sf-button-${variant} ${className}`} {...props}>
      {children}
    </button>
  )
}
