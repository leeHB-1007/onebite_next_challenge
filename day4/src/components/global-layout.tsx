import Link from 'next/link'
import React from 'react'
import style from"./global-layout.module.css"

export default function GlobalLayout( {children} : {
    children: React.ReactNode
}) {
  return (
    <div className={style.container}>
        <header>
                <Link href={'/'} className=" text-xl font-bold" style={{ color:'rgb(229,9,20)'}}>ONEBITE CINEMA</Link>
        </header>
        <main>
            {children}
        </main>
        <footer>
        
        </footer>
    </div>
  )
}