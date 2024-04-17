import React from 'react'

export default function page({params}) {
  const fullUrl = `${params.username}/${params.title}`
  return (
    <div className='min-h-screen'>
      <a href={`https://dev.to/${fullUrl}`} target='_blank'>{fullUrl}</a>
    </div>
  )
}
