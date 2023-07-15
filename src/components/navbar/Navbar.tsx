'use client'

import React from 'react'
import Link from 'next/link'
import Button from '../Button'
import SessionForm from '../session/SessionForm'
import NavDropdown from './NavDropdown'
import { useSession, signOut } from 'next-auth/react'
import { Icons } from '../Icons'
import { useState } from 'react'
import sessionService from '@/services/sessions'

const Navbar = () => {
    const [showLogin, setShowLogin] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const {data: session} = useSession();


    const showLoginModal = () => {
        setShowLogin(true)
    }

    const handleLogout = async () => {
        try {
          setIsLoading(true)
          await sessionService.logout(session?.user?.accessToken as string)
        } catch (error) {
          console.log(error)
          return
        }
        await signOut({redirect: false})
        setIsLoading(false)
        location.reload()
    }

    return (
        <header className="min-w-full h-12 bg-gray-900 sticky top-0 inset-x-0 z-[10] flex items-center justify-between px-3">

            {/* login modal */}
            {showLogin && <SessionForm setShowForm={setShowLogin} />}

            <div className="container flex max-w-7x1 h-full mx-auto items-center gap-5 ">
                <Link href="/" className="flex gap-2 items-center">
                    <Icons.logo className="h-8 w-8 sm:h-6 sm:w-6"  />
                    <p className="hidden font-medium md:block">Creddit</p>
                </ Link>
                {session?.user && <NavDropdown />}
            </div>

            <div className="container flex justify-end items-center ">
                {session?.user && <Button customClass="m-1 text-white text-2xl" clearDefault={true}> <Icons.bell /> </Button>}
                {session?.user && 
                    <Link
                        href={'/submit'}
                        className="m-1 text-white text-2xl"
                        title='Create Post'
                        data-tooltip-style='dark'
                    >
                        <Icons.plus />
                    </Link>      
                }
                {/* <div> new post </div> */}
                {session?.user ? (
                  <Button isLoading={isLoading} onClick={handleLogout} customClass="w-18 h-8 mx-1">
                    Logout
                  </Button>
                ) : (
                  <Button onClick={showLoginModal} customClass="w-18 h-8 mx-1">
                    Login
                  </Button>
                )}
            </div>

        </header>
    )
}

export default Navbar