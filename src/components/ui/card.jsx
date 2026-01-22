import React from 'react'

export const Card = ({ children, className = '', ...props }) => (
	<div className={`bg-card rounded-lg shadow-sm ${className}`.trim()} {...props}>
		{children}
	</div>
)

export const CardHeader = ({ children, className = '', ...props }) => (
	<div className={`px-4 py-3 border-b ${className}`.trim()} {...props}>{children}</div>
)

export const CardContent = ({ children, className = '', ...props }) => (
	<div className={`p-4 ${className}`.trim()} {...props}>{children}</div>
)

export const CardTitle = ({ children, className = '', ...props }) => (
	<h3 className={`text-lg font-semibold ${className}`.trim()} {...props}>{children}</h3>
)

export const CardDescription = ({ children, className = '', ...props }) => (
	<p className={`text-sm text-muted-foreground ${className}`.trim()} {...props}>{children}</p>
)

export const CardFooter = ({ children, className = '', ...props }) => (
	<div className={`px-4 py-3 border-t ${className}`.trim()} {...props}>{children}</div>
)

export default Card
