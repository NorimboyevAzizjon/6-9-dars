import React from 'react'

export const Input = ({ className = '', ...props }) => {
	const cls = `w-full rounded-md border px-3 py-2 text-sm ${className}`.trim()
	return <input className={cls} {...props} />
}

export const Textarea = ({ className = '', ...props }) => {
	const cls = `w-full rounded-md border px-3 py-2 text-sm ${className}`.trim()
	return <textarea className={cls} {...props} />
}

export default Input
