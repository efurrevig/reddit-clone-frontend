'use client'

import React from 'react'
import Link from 'next/link'
import Button from '../Button'
import SessionForm from '../session/SessionForm'
import NavDropdown from './NavDropdown'
import SearchBar from './SearchBar'
import { useSession, signOut } from 'next-auth/react'
import { Icons } from '../Icons'
import { useState } from 'react'
import ProfileDropdown from '../UserProfile/ProfileDropdown'


const Navbar = () => {
    const [showLogin, setShowLogin] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const {data: session} = useSession();


    const showLoginModal = () => {
        setShowLogin(true)
    }

    return (
        <header className="w-full h-12 min-h-max bg-gray-900 sticky top-0 inset-x-0 z-[10] flex items-center gap-4 px-3 max-w-screen border-b border-gray-700">

            {/* login modal */}
            {showLogin && <SessionForm setShowForm={setShowLogin} />}

            <div className="flex justify-start h-full items-center gap-5 ">
                <Link 
                    href="/" 
                    className="flex gap-2 items-center"
                    prefetch={false}
                >
                    <Icons.logo className="h-8 w-8 sm:h-6 sm:w-6"  />
                    <p className="hidden font-medium lg:block">Creddit</p>
                </ Link>
                {session?.user && <NavDropdown />}

                
            </div>


            <div className="flex h-12 w-full justify-between items-center">
                <div className='flex items-center justify-end md:justify-center w-full ml-10'>
                    <div className='md:w-5/6 md:min-w-search max-w-2xl'>
                        <SearchBar />
                    </div>
                </div>
                <div className='flex justify-end items-center'>
                    {session?.user && <Button customClass="m-1 text-white text-2xl" clearDefault={true}> <Icons.bell /> </Button>}
                    {session?.user && 
                        <Link
                            href={'/submit'}
                            className="m-1 text-white text-2xl mr-5"
                            title='Create Post'
                            data-tooltip-style='dark'
                        >
                            <Icons.plus />
                        </Link>      
                    }

                    {session?.user ? (
                      // <Button isLoading={isLoading} onClick={handleLogout} customClass="w-18 h-8 mx-1">
                      //   Logout
                      // </Button>
                      <div className='w-max h-12'>
                        <ProfileDropdown />
                      </div>
                    ) : (
                      <Button onClick={showLoginModal} customClass="w-18 h-8 mx-1">
                        Login
                      </Button>
                    )}
                </div>
            </div>

        </header>
    )
}

export default Navbar