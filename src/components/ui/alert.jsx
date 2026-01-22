import React from 'react'

export const Alert = ({ children, variant = 'default', className = '', ...props }) => {
	const base = 'rounded-md p-3 text-sm border'
	const variants = {
		default: 'bg-gray-50 text-gray-800 border-gray-200',
		destructive: 'bg-red-50 text-red-800 border-red-200'
	}
	const cls = `${base} ${variants[variant] || variants.default} ${className}`.trim()
	return (
		<div className={cls} role="alert" {...props}>
			{children}
		</div>
	)
}

export const AlertDescription = ({ children, className = '', ...props }) => (
	<div className={`text-sm ${className}`.trim()} {...props}>{children}</div>
)

export default Alert
