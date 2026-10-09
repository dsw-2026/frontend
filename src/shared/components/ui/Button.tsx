import type { ButtonHTMLAttributes } from 'react'

type Variant = 'primary' | 'secondary' | 'danger'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
}

const VARIANT_CLASSES: Record<Variant, string> = {
  primary:
    'bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white shadow-sm dark:bg-blue-600 dark:hover:bg-blue-500',
  secondary:
    'bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-700 border border-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200 dark:border-slate-700',
  danger:
    'bg-red-50 hover:bg-red-100 active:bg-red-200 text-red-600 dark:bg-red-950/40 dark:hover:bg-red-900/50 dark:text-red-400 border border-transparent dark:border-red-900/30',
}

export function Button({ variant = 'primary', className = '', type = 'button', ...rest }: ButtonProps) {
  const baseClasses =
    'inline-flex items-center justify-center font-medium text-sm px-4 py-2 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/40 disabled:opacity-50 disabled:pointer-events-none cursor-pointer'

  return (
    <button
      type={type}
      className={`${baseClasses} ${VARIANT_CLASSES[variant]} ${className}`.trim()}
      {...rest}
    />
  )
}