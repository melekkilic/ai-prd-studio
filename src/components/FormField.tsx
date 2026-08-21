import type { ReactNode } from 'react'

type FormFieldProps = {
  label: string
  htmlFor: string
  error?: string
  children: ReactNode
}

function FormField({
  label,
  htmlFor,
  error,
  children,
}: FormFieldProps) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={htmlFor}
        className="text-sm font-medium"
      >
        {label}
      </label>

      {children}

      {error && (
        <p className="text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  )
}

export default FormField