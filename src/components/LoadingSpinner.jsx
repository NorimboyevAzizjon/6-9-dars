import React from 'react'

export const LoadingSpinner = ({ className = '' }) => {
  return (
    <div className={`flex justify-center items-center py-8 ${className}`.trim()}>
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>
  )
}

export default LoadingSpinner
