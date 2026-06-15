import './subframe-ui.css'

function TextAreaRoot({ children, className = '', variant = 'filled' }) {
  return <label className={`sf-textarea sf-textarea-${variant} ${className}`}>{children}</label>
}

function TextAreaInput({ className = '', ...props }) {
  return <textarea className={`sf-textarea-input ${className}`} {...props} />
}

export const TextArea = Object.assign(TextAreaRoot, { Input: TextAreaInput })
