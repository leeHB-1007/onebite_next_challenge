import React from 'react'

export default function layout( {children} : {children: React.ReactNode}) {
  return (
    <div>Searchbar Layout
        {children}
    </div>
  )
}
