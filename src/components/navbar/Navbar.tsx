'use client'

import React from 'react'
import Link from 'next/link'
import Button from '../Button'
import LoginForm from '../LoginForm'
import { Icons } from '../Icons'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'

const Navbar = () => {
  const [showLogin, setShowLogin] = useState(false)
  const user = useSelector((state: any) => state.user)
  const dispatch = useDispatch()

  const handleLoginClick = () => {
    setShowLogin(true)
    console.log('login')
    console.log(showLogin)
  }

  return (
    <header className="bg-zinc-800 sticky top-0 inset-x-0 h-fit z-[10] py-2 flex justify-between">
        {showLogin && <LoginForm setShowForm={setShowLogin} />}
        <div className="container flex max-w-7x1 h-full mx-auto items-center gap-5">
            <Link href="/" className="flex gap-2 items-center">
                <Icons.logo className="h-8 w-8 sm:h-6 sm:w-6"  />
                <p className="hidden font-medium md:block">Creddit</p>
            </ Link>
            <div> drop down </div>
            <div> SearchBar </div>
        </div>
        <div className="container flex justify-end">
            {/* <div> notifications </div> */}
            {/* <div> new post </div> */}
            
            <Button onClick={handleLoginClick}>Login</Button>
        </div>
    </header>
  )
}

export default Navbar