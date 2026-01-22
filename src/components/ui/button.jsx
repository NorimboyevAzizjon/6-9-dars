import React from 'react'

export const Button = ({ children, variant = 'default', size = 'md', className = '', ...props }) => {
	const base = 'inline-flex items-center justify-center rounded-md font-medium transition-colors'

	const variants = {
		default: 'bg-primary text-white hover:opacity-95',
		ghost: 'bg-transparent hover:bg-gray-100',
		outline: 'bg-transparent border rounded-md',
	}

	const sizes = {
		icon: 'p-2',
		sm: 'px-3 py-1.5 text-sm',
		md: 'px-4 py-2',
	}

	const cls = `${base} ${variants[variant] || variants.default} ${sizes[size] || sizes.md} ${className}`.trim()

	return (
		<button className={cls} {...props}>
			{children}
		</button>
	)
}

export default Button
