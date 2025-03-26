import Link from 'next/link'
import React from 'react'

export default function GlobalLayout( {children} : {
    children: React.ReactNode
}) {
  return (
    <div>
        <header>
                <Link href={'/'} className=" text-xl" style={{ color:'rgb(229,9,20)'}}>ONEBITE CINEMA</Link>
        </header>
        <main>
            {children}
        </main>
        <footer>
            푸터입니다
        </footer>
    </div>
  )
}