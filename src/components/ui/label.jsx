import React from 'react'

export const Label = ({ children, htmlFor, className = '', ...props }) => {
	const cls = `block text-sm font-medium ${className}`.trim()
	return (
		<label htmlFor={htmlFor} className={cls} {...props}>
			{children}
		</label>
	)
}

export default Label
