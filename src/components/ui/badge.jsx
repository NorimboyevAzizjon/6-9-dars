import React from 'react'

export const Badge = ({ variant = 'default', className = '', children, ...props }) => {
	const base = 'inline-flex items-center rounded-full text-xs font-medium'

	const variants = {
		default: 'bg-gray-100 text-gray-800 border border-transparent',
		destructive: 'bg-red-100 text-red-800 border border-red-200',
		secondary: 'bg-blue-100 text-blue-800 border border-blue-200',
	}

	const cls = `${base} ${variants[variant] || variants.default} ${className}`.trim()

	return (
		<span className={cls} {...props}>
			{children}
		</span>
	)
}

export default Badge
