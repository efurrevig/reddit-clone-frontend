import React from 'react'
import Link from 'next/link'
import { Icons } from '../Icons'

const Navbar = () => {
  return (
    <header className="bg-zinc-800 sticky top-0 inset-x-0 h-fit z-[10] py-2 flex justify-between">
        <div className="container flex max-w-7x1 h-full mx-auto items-center gap-5">
            <Link href="/" className="flex gap-2 items-center">
                <Icons.logo className="h-8 w-8 sm:h-6 sm:w-6"  />
                <p className="hidden font-medium md:block">Creddit</p>
            </ Link>
            <div> drop down </div>
            <div> SearchBar </div>
        </div>
        <div className="container flex justify-end">
            <div> notifications </div>
            <div> new post </div>
            <div> profile dropdown </div>
        </div>
    </header>
  )
}

export default Navbar