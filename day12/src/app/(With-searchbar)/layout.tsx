import React from 'react'
import Searchbar from './_components/searchbar'

export default function layout( {children} : {children: React.ReactNode}) {
  return (
    <div>
        <Searchbar />
        {children}
    </div>
  )
}
